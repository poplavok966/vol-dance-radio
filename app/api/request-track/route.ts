import { NextResponse } from 'next/server'

// Server-side rolling history of tracks played on the Icecast stream.
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

// Конвертація будь-якого timestamp у Date-об'єкт за часовим поясом Києва
function getKyivDate(timestamp: number = Date.now()) {
  const kyivString = new Date(timestamp).toLocaleString('en-US', {
    timeZone: 'Europe/Kyiv',
  })
  return new Date(kyivString)
}

function dateKey(d: Date) {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}.${mm}.${yyyy}`
}

function timeLabel(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export async function GET() {
  await poll()

  // Поточна дата/час за Києвом
  const kyivNow = getKyivDate()

  // Формуємо останні 3 дні за київським календарем
  const days = [0, 1, 2].map((offset) => {
    const d = new Date(kyivNow)
    d.setDate(kyivNow.getDate() - offset)
    return dateKey(d)
  })

  const grouped = days.map((date) => ({
    date,
    tracks: g
      .__voldanceHistory!.filter((e) => {
        const entryKyivDate = getKyivDate(e.at)
        return dateKey(entryKyivDate) === date
      })
      .map((e) => ({ title: e.title, time: timeLabel(e.at) })),
  }))

  return NextResponse.json({ days: grouped })
}
