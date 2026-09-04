import { NextResponse } from 'next/server'

// In-memory reaction tally keyed by track title. This keeps the counts on the
// server so every listener sees the same numbers, instead of a fake random
// value generated in each browser. Values reset when the server cold-starts.
type Counts = { fire: number; love: number }
const store = new Map<string, Counts>()

function keyFor(track: string) {
  return track.trim() || 'unknown'
}

function get(track: string): Counts {
  const key = keyFor(track)
  if (!store.has(key)) store.set(key, { fire: 0, love: 0 })
  return store.get(key)!
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const track = searchParams.get('track') ?? ''
  return NextResponse.json(get(track))
}

export async function POST(request: Request) {
  try {
    const { track, kind, action } = (await request.json()) as {
      track?: string
      kind?: 'fire' | 'love'
      action?: 'add' | 'remove'
    }

    if (!track || (kind !== 'fire' && kind !== 'love')) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const counts = get(track)
    if (action === 'remove') {
      counts[kind] = Math.max(0, counts[kind] - 1)
    } else {
      counts[kind] = counts[kind] + 1
    }

    return NextResponse.json(counts)
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
