import { NextResponse } from 'next/server'

// Server-side rolling history of tracks played on the Icecast stream. Because
// Icecast only exposes the *current* title, we poll it here and accumulate the
// timeline on the server so every listener shares the same history (instead of
// each browser keeping its own local list). Entries older than 3 days are
// pruned. Note: this lives in memory and resets on a cold start; swap for a DB
// or a persisted history.json if you need long-term durability.

const STATUS_URL = 'https://globalic.stream:1185/status-json.xsl'
const DEFAULT_TITLE = 'VOL DANCE — On Air'
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000

type Entry = { title: string; at: number }

// Persist across hot-reloads in dev by stashing on globalThis.
const g = globalThis as unknown as {
  __voldanceHistory?: Entry[]
  __voldanceLastTitle?: string
  __voldanceLastPoll?: number
}
g.__voldanceHistory ??= []
g.__voldanceLastTitle ??= ''
g.__voldanceLastPoll ??= 0

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
  // Throttle to at most one upstream poll every 8s regardless of client count.
  const now = Date.now()
  if (now - (g.__voldanceLastPoll ?? 0) < 8000) return
  g.__voldanceLastPoll = now

  const title = await currentTitle()
  if (title && title !== g.__voldanceLastTitle) {
    g.__voldanceLastTitle = title
    g.__voldanceHistory!.unshift({ title, at: now })
  }

  // Prune anything older than 3 days.
  const cutoff = now - THREE_DAYS_MS
  g.__voldanceHistory = g.__voldanceHistory!.filter((e) => e.at >= cutoff)
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

  const grouped = days.map((date) => ({
    date,
    tracks: g
      .__voldanceHistory!.filter((e) => dateKey(new Date(e.at)) === date)
      .map((e) => ({ title: e.title, time: timeLabel(new Date(e.at)) })),
  }))

  return NextResponse.json({ days: grouped })
}