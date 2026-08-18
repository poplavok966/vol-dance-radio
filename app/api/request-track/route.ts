import { NextResponse } from 'next/server'

// Токен бота з BotFather
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8873088730:AAH3Ea5UqHBy3xfU3DSSXJ_mwwS_m0c29pc'

// Твій особистий Telegram ID для отримання замовлень
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8567720152'

export async function POST(req: Request) {
  try {
    const { name, track } = await req.json()

    if (!track || !track.trim()) {
      return NextResponse.json({ error: 'Track is required' }, { status: 400 })
    }

    // Форматування точно як на твоєму робочому скріншоті
    const message = `🎧 Нове замовлення в ефір!\n\n👤 Від кого: ${name || 'Анонім'}\n🎵 Трек: ${track}`

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Telegram API error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
