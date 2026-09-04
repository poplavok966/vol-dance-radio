import { n as DEFAULT_TITLE } from "./constants-CieyzSWs.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/radio-fn-DI5-WTR0.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var reactions = /* @__PURE__ */ new Map();
var lastRequestAt = 0;
function countsFor(track) {
	const key = track.trim() || "unknown";
	const existing = reactions.get(key);
	if (existing) return existing;
	const fresh = {
		fire: 0,
		love: 0
	};
	reactions.set(key, fresh);
	return fresh;
}
var getStreamStats_createServerFn_handler = createServerRpc({
	id: "bf96ac8e67814a40154603ed74d2677ef6314ce64884c74720583ba5681aacc0",
	name: "getStreamStats",
	filename: "src/lib/radio-fn.ts"
}, (opts) => getStreamStats.__executeServer(opts));
var getStreamStats = createServerFn({ method: "GET" }).handler(getStreamStats_createServerFn_handler, async () => {
	try {
		const res = await fetch(`https://globalic.stream:1185/status-json.xsl?_=${Date.now()}`, { cache: "no-store" });
		if (!res.ok) return {
			title: DEFAULT_TITLE,
			listeners: 0,
			peak: 0
		};
		let source = (await res.json())?.icestats?.source;
		if (Array.isArray(source)) source = source.find((s) => s.listenurl && s.listenurl.includes("/stream")) ?? source[0];
		return {
			title: source?.title || "VOL DANCE — On Air",
			listeners: Number(source?.listeners ?? 0),
			peak: Number(source?.listener_peak ?? 0)
		};
	} catch {
		return {
			title: DEFAULT_TITLE,
			listeners: 0,
			peak: 0
		};
	}
});
var getReactions_createServerFn_handler = createServerRpc({
	id: "e67de05bd3c0adade3a323e8ea8f39a0fb86750c0c14dd14ccacee3cb7425c19",
	name: "getReactions",
	filename: "src/lib/radio-fn.ts"
}, (opts) => getReactions.__executeServer(opts));
var getReactions = createServerFn({ method: "GET" }).validator((input) => ({ track: String(input?.track ?? "") })).handler(getReactions_createServerFn_handler, async ({ data }) => countsFor(data.track));
var voteReaction_createServerFn_handler = createServerRpc({
	id: "58333d92f983e6ca3c212c3a03fe714d429da3c8c9f57f3c2a839ce91a4721b4",
	name: "voteReaction",
	filename: "src/lib/radio-fn.ts"
}, (opts) => voteReaction.__executeServer(opts));
var voteReaction = createServerFn({ method: "POST" }).validator((input) => {
	const kind = input?.kind === "love" ? "love" : "fire";
	const action = input?.action === "remove" ? "remove" : "add";
	return {
		track: String(input?.track ?? ""),
		kind,
		action
	};
}).handler(voteReaction_createServerFn_handler, async ({ data }) => {
	const counts = countsFor(data.track);
	if (data.action === "remove") counts[data.kind] = Math.max(0, counts[data.kind] - 1);
	else counts[data.kind] += 1;
	return { ...counts };
});
var sendTrackRequest_createServerFn_handler = createServerRpc({
	id: "10ad411d33e64a585d2cede8d6854d740cc69d8ce5a44129943eb87d1d1b4be9",
	name: "sendTrackRequest",
	filename: "src/lib/radio-fn.ts"
}, (opts) => sendTrackRequest.__executeServer(opts));
var sendTrackRequest = createServerFn({ method: "POST" }).validator((input) => {
	const track = String(input?.track ?? "").trim().slice(0, 200);
	if (track.length < 2) throw new Error("TRACK_REQUIRED");
	return {
		name: String(input?.name ?? "").trim().slice(0, 80),
		track,
		message: String(input?.message ?? "").trim().slice(0, 280)
	};
}).handler(sendTrackRequest_createServerFn_handler, async ({ data }) => {
	const now = Date.now();
	if (now - lastRequestAt < 4e3) throw new Error("RATE_LIMIT");
	lastRequestAt = now;
	const { sendTelegramMessage } = await import("./telegram.server-CzdJo88u.mjs");
	const lines = [
		"Нове замовлення в ефір VOL DANCE",
		`Від кого: ${data.name || "Анонім"}`,
		`Трек: ${data.track}`
	];
	if (data.message) lines.push(`Повідомлення: ${data.message}`);
	await sendTelegramMessage(lines.join("\n"));
	return { ok: true };
});
//#endregion
export { getReactions_createServerFn_handler, getStreamStats_createServerFn_handler, sendTrackRequest_createServerFn_handler, voteReaction_createServerFn_handler };
