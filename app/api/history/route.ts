import { NextResponse } from 'next/server'
import { getSql, hasDatabase } from '@/lib/db'

// Server-side rolling history of tracks played on the Icecast stream. Because
// Icecast only exposes the *current* title, we poll it here and accumulate the
// timeline in Neon Postgres so every listener shares the same history and it
// survives serverless cold starts / multiple instances. Entries older than
// 7 days are pruned on each poll.
//
// If DATABASE_URL is not configured (e.g. during `pnpm run build` or a local
// run without Neon), we gracefully fall back to an in-memory store so nothing
// throws. In-memory data is per-instance and not durable — Neon is required
// for shared, persistent history.

export const dynamic = 'force-dynamic'

const STATUS_URL = 'https://globalic.stream:1185/status-json.xsl'
const DEFAULT_TITLE = 'VOL DANCE — On Air'
const HISTORY_DAYS = 7
const SEVEN_DAYS_MS = HISTORY_DAYS * 24 * 60 * 60 * 1000

// ---------------------------------------------------------------------------
// In-memory fallback store (used only when DATABASE_URL is missing)
// ---------------------------------------------------------------------------
type MemTrack = { title: string; played_at: number }
const memHistory: MemTrack[] = []
const memState = { last_title: '', last_poll: 0 }

// ---------------------------------------------------------------------------
// Schema bootstrap (DB only) — idempotent and cheap. Prevents history from
// silently breaking if the schema was never provisioned.
// ---------------------------------------------------------------------------
let schemaReady = false
async function ensureSchema() {
  const sql = getSql()
  if (!sql || schemaReady) return
  await sql`
    CREATE TABLE IF NOT EXISTS track_history (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      played_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_track_history_played_at
    ON track_history (played_at DESC)
  `
  await sql`
    CREATE TABLE IF NOT EXISTS poll_state (
      id INT PRIMARY KEY,
      last_title TEXT NOT NULL DEFAULT '',
      last_poll BIGINT NOT NULL DEFAULT 0
    )
  `
  await sql`
    INSERT INTO poll_state (id, last_title, last_poll)
    VALUES (1, '', 0)
    ON CONFLICT (id) DO NOTHING
  `
  schemaReady = true
}

async function currentTitle(): Promise<string | null> {
  try {
    const res = await fetch(`${STATUS_URL}?_=${Date.now()}`, {
      cache: 'no-store',
    })
    const data = await res.json()
    let source = data?.icestats?.source
    if (Array.isArray(source)) {
      source =
        source.find(
          (s: { listenurl?: string }) =>
            s.listenurl && s.listenurl.includes('/stream'),
        ) ?? source[0]
    }
    const title: string = source?.title || ''
    return title && title !== DEFAULT_TITLE ? title : null
  } catch {
    return null
  }
}

async function poll() {
  const now = Date.now()
  const sql = getSql()

  if (!sql) {
    // In-memory fallback
    if (now - memState.last_poll < 8000) return
    memState.last_poll = now
    const title = await currentTitle()
    if (title && title !== memState.last_title) {
      memState.last_title = title
      memHistory.push({ title, played_at: now })
    }
    const cutoff = now - SEVEN_DAYS_MS
    for (let i = memHistory.length - 1; i >= 0; i--) {
      if (memHistory[i].played_at < cutoff) memHistory.splice(i, 1)
    }
    return
  }

  // Read persisted poll state (throttle + last title) so it survives cold starts.
  const stateRows = (await sql`
    SELECT last_title, last_poll FROM poll_state WHERE id = 1
  `) as { last_title: string; last_poll: string | number }[]

  const lastTitle = stateRows[0]?.last_title ?? ''
  const lastPoll = Number(stateRows[0]?.last_poll ?? 0)

  // Throttle to at most one upstream poll every 8s regardless of client count.
  if (now - lastPoll < 8000) return
  await sql`UPDATE poll_state SET last_poll = ${now} WHERE id = 1`

  const title = await currentTitle()
  if (title && title !== lastTitle) {
    await sql`UPDATE poll_state SET last_title = ${title} WHERE id = 1`
    await sql`
      INSERT INTO track_history (title, played_at)
      VALUES (${title}, to_timestamp(${now} / 1000.0))
    `
  }

  // Prune anything older than 7 days.
  const cutoff = new Date(now - SEVEN_DAYS_MS).toISOString()
  await sql`DELETE FROM track_history WHERE played_at < ${cutoff}`
}

// Повертає треки за останні 7 днів (найновіші першими) з БД або пам'яті.
async function fetchRecent(now: number): Promise<{ title: string; played_at: string }[]> {
  const sql = getSql()
  if (!sql) {
    const cutoff = now - SEVEN_DAYS_MS
    return memHistory
      .filter((t) => t.played_at >= cutoff)
      .sort((a, b) => b.played_at - a.played_at)
      .map((t) => ({ title: t.title, played_at: new Date(t.played_at).toISOString() }))
  }

  const cutoff = new Date(now - SEVEN_DAYS_MS).toISOString()
  return (await sql`
    SELECT title, played_at
    FROM track_history
    WHERE played_at >= ${cutoff}
    ORDER BY played_at DESC
  `) as { title: string; played_at: string }[]
}

// Форматування дати ДД.ММ.РРРР за часовим поясом Europe/Kyiv
function dateKey(d: Date) {
  const parts = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).formatToParts(d)

  const day = parts.find((p) => p.type === 'day')?.value
  const month = parts.find((p) => p.type === 'month')?.value
  const year = parts.find((p) => p.type === 'year')?.value

  return `${day}.${month}.${year}`
}

// Форматування часу ГГ:ХХ за часовим поясом Europe/Kyiv
function timeLabel(d: Date) {
  return d.toLocaleTimeString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export async function GET() {
  await ensureSchema()
  await poll()

  const now = new Date()
  // Build the exact last 7 dates (today → 6 days ago), newest first.
  const days = Array.from({ length: HISTORY_DAYS }, (_, offset) => {
    const d = new Date(now)
    d.setDate(now.getDate() - offset)
    return dateKey(d)
  })

  // Fetch the full 7-day window once, newest first, then group by local date.
  const rows = await fetchRecent(now.getTime())

  const entries = rows.map((r) => {
    const at = new Date(r.played_at)
    return { title: r.title, date: dateKey(at), time: timeLabel(at) }
  })

  const grouped = days.map((date) => ({
    date,
    tracks: entries
      .filter((e) => e.date === date)
      .map((e) => ({ title: e.title, time: e.time })),
  }))

  return NextResponse.json({ days: grouped, persistent: hasDatabase })
}
