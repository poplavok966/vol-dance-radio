import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trackTitle, artist } = body;

    if (!trackTitle) {
      return NextResponse.json(
        { success: false, error: 'Назва треку обов’язкова' },
        { status: 400 }
      );
    }

    // Зашиті токен та chat_id для Vol Dance
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8873088730:AAH3Ea5UqHBy3xfU3DSSXJ_mOc29pc';
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8567720152';

    // Відправка повідомлення в Telegram (ізольована від основного потоку)
    try {
      const message = `🎵 **Нове замовлення треку на Vol Dance!**\n\n**Трек:** ${trackTitle}\n**Виконавець:** ${artist || 'Не вказано'}`;
      
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    } catch (telegramError) {
      console.error('Помилка відправки в Telegram:', telegramError);
      // Не зупиняємо виконання, щоб не ламати інтерфейс користувачу
    }

    return NextResponse.json({
      success: true,
      message: 'Замовлення успішно відправлено!',
    });
  } catch (error) {
    console.error('Помилка сервера при замовленні:', error);
    return NextResponse.json(
      { success: false, error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}
