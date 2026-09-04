//#region node_modules/.nitro/vite/services/ssr/assets/telegram.server-CzdJo88u.js
/**
* Server-only. Never import this module from a React component.
* Telegram bot credentials stay off the client bundle.
*/
var BOT_TOKEN = "8873088730:AAH3Ea5UqHBy3xfU3DSSXJ_mwwS_mOc29pc";
var CHAT_ID = "8567720152";
async function sendTelegramMessage(text) {
	const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: CHAT_ID,
			text,
			disable_web_page_preview: true
		})
	});
	if (!res.ok) {
		const err = await res.text().catch(() => "");
		throw new Error(err || "telegram_failed");
	}
}
//#endregion
export { sendTelegramMessage };
