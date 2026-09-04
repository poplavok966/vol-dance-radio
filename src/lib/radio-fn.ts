import { createServerFn } from "@tanstack/react-start";
import { DEFAULT_TITLE } from "./constants";

type Stats = {
  title: string;
  listeners: number;
  peak: number;
};

type Counts = { fire: number; love: number };
const reactions = new Map<string, Counts>();
let lastRequestAt = 0;

function countsFor(track: string): Counts {
  const key = track.trim() || "unknown";
  const existing = reactions.get(key);
  if (existing) return existing;
  const fresh = { fire: 0, love: 0 };
  reactions.set(key, fresh);
  return fresh;
}

export const getStreamStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<Stats> => {
    try {
      const res = await fetch(
        `https://globalic.stream:1185/status-json.xsl?_=${Date.now()}`,
        { cache: "no-store" },
      );
      if (!res.ok) return { title: DEFAULT_TITLE, listeners: 0, peak: 0 };
      const data = (await res.json()) as {
        icestats?: { source?: unknown };
      };
      let source = data?.icestats?.source as
        | { title?: string; listeners?: number; listener_peak?: number; listenurl?: string }
        | Array<{ title?: string; listeners?: number; listener_peak?: number; listenurl?: string }>
        | undefined;
      if (Array.isArray(source)) {
        source =
          source.find((s) => s.listenurl && s.listenurl.includes("/stream")) ?? source[0];
      }
      return {
        title: source?.title || DEFAULT_TITLE,
        listeners: Number(source?.listeners ?? 0),
        peak: Number(source?.listener_peak ?? 0),
      };
    } catch {
      return { title: DEFAULT_TITLE, listeners: 0, peak: 0 };
    }
  },
);

export const getReactions = createServerFn({ method: "GET" })
  .validator((input: { track?: string }) => ({
    track: String(input?.track ?? ""),
  }))
  .handler(async ({ data }) => countsFor(data.track));

export const voteReaction = createServerFn({ method: "POST" })
  .validator((input: { track?: string; kind?: string; action?: string }) => {
    const kind = input?.kind === "love" ? "love" : "fire";
    const action = input?.action === "remove" ? "remove" : "add";
    return { track: String(input?.track ?? ""), kind, action } as const;
  })
  .handler(async ({ data }) => {
    const counts = countsFor(data.track);
    if (data.action === "remove") counts[data.kind] = Math.max(0, counts[data.kind] - 1);
    else counts[data.kind] += 1;
    return { ...counts };
  });

export const sendTrackRequest = createServerFn({ method: "POST" })
  .validator((input: { name?: string; track?: string; message?: string }) => {
    const track = String(input?.track ?? "").trim().slice(0, 200);
    if (track.length < 2) throw new Error("TRACK_REQUIRED");
    return {
      name: String(input?.name ?? "").trim().slice(0, 80),
      track,
      message: String(input?.message ?? "").trim().slice(0, 280),
    };
  })
  .handler(async ({ data }) => {
    const now = Date.now();
    if (now - lastRequestAt < 4000) {
      throw new Error("RATE_LIMIT");
    }
    lastRequestAt = now;
    const { sendTelegramMessage } = await import("./telegram.server");
    const lines = [
      "Нове замовлення в ефір VOL DANCE",
      `Від кого: ${data.name || "Анонім"}`,
      `Трек: ${data.track}`,
    ];
    if (data.message) lines.push(`Повідомлення: ${data.message}`);
    await sendTelegramMessage(lines.join("\n"));
    return { ok: true as const };
  });
