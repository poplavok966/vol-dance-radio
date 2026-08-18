import { NextResponse } from 'next/server'

// Keep the credentials server-side. Falls back to the original values so the
// feature works out of the box, but you can override them with env vars.
const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ?? '8873088730:AAH3Ea5UqHBy3xfU3DSSXJ_mwwS_mOc29pc'
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? '8567720152'

export async function POST(request: Request) {
  try {
    const { name, track } = (await request.json()) as {
      name?: string
      track?: string
    }

    const trimmedTrack = (track ?? '').trim()
    if (!trimmedTrack) {
      return NextResponse.json({ error: 'Track is required' }, { status: 400 })
    }

    const trimmedName = (name ?? '').trim() || 'Анонім'
    const msg = `🎧 Нове замовлення в ефір!\n\n👤 Від кого: ${trimmedName}\n🎵 Трек: ${trimmedTrack}`

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg }),
      },
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to deliver request' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
