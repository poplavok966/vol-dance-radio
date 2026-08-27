import { NextResponse } from 'next/server'
import {
  addTrack,
  getHistory,
  getPollState,
  pruneHistory,
  setPollState,
} from '@/lib/db'

// Server-side rolling history of tracks played on the Icecast stream. Because
// Icecast only exposes the *current* title, we poll it here and accumulate the
// timeline in Upstash Redis (Vercel KV) so every listener shares the same
// history and it survives serverless cold starts / multiple instances. A
// missing/broken Redis transparently falls back to an in-memory store (see
// lib/db.ts). Entries older than 3 days are pruned on each poll.

export const dynamic = 'force-dynamic'

const STATUS_URL = 'https://globalic.stream:1185/status-json.xsl'
const DEFAULT_TITLE = 'VOL DANCE — On Air'

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

  // Read persisted poll state (throttle + last title) so it survives cold starts.
  const { lastTitle, lastPoll } = await getPollState()

  // Throttle to at most one upstream poll every 8s regardless of client count.
  if (now - lastPoll < 8000) return
  await setPollState({ lastPoll: now })

  const title = await currentTitle()
  if (title && title !== lastTitle) {
    await setPollState({ lastTitle: title })
    await addTrack(title, now)
  }

  // Prune anything older than 3 days.
  await pruneHistory(now)
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
  await poll()

  const now = new Date()
  // Build the exact last 3 dates (today, yesterday, day before), newest first.
  const days = [0, 1, 2].map((offset) => {
    const d = new Date(now)
    d.setDate(now.getDate() - offset)
    return dateKey(d)
  })

  // Fetch the full 3-day window once (newest first), then group by local date.
  const rows = await getHistory(now.getTime())

  const entries = rows.map((r) => {
    const at = new Date(r.playedAt)
    return { title: r.title, date: dateKey(at), time: timeLabel(at) }
  })

  const grouped = days.map((date) => ({
    date,
    tracks: entries
      .filter((e) => e.date === date)
      .map((e) => ({ title: e.title, time: e.time })),
  }))

  return NextResponse.json({ days: grouped })
}
