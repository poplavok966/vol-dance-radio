import { Redis } from '@upstash/redis'

// Track-history storage backed by Upstash Redis (Vercel KV). Icecast only
// exposes the *current* title, so the /api/history route polls the stream and
// appends changes here. Using Redis means every listener shares one timeline
// and it survives serverless cold starts / multiple instances.
//
// If Redis is unavailable (missing env vars or a transient outage) we fall back
// to an in-memory store so the history panel keeps working within a single
// instance and never leaves the screen empty.

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000

// Redis keys
const HISTORY_KEY = 'vol:track_history' // sorted set: member = entry json, score = timestamp(ms)
const STATE_KEY = 'vol:poll_state' // hash: { last_title, last_poll }

export type TrackEntry = { title: string; playedAt: number }
export type PollState = { lastTitle: string; lastPoll: number }

// Lazily create the Redis client. Returns null when credentials are absent so
// callers transparently switch to the in-memory fallback.
let _redis: Redis | null | undefined
function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    _redis = null
    return null
  }
  try {
    _redis = new Redis({ url, token })
  } catch {
    _redis = null
  }
  return _redis
}

/* ------------------------------- Fallback -------------------------------- */
// Module-scoped in-memory mirror. Not shared across instances, but guarantees
// the panel is never empty if Redis calls throw.
const memHistory: TrackEntry[] = []
const memState: PollState = { lastTitle: '', lastPoll: 0 }

/* --------------------------------- API ----------------------------------- */

export async function getPollState(): Promise<PollState> {
  const redis = getRedis()
  if (redis) {
    try {
      const raw = await redis.hgetall<Record<string, string | number>>(STATE_KEY)
      return {
        lastTitle: (raw?.last_title as string) ?? '',
        lastPoll: Number(raw?.last_poll ?? 0),
      }
    } catch (err) {
      console.log('[v0] getPollState redis error, using memory:', err)
    }
  }
  return { ...memState }
}

export async function setPollState(state: Partial<PollState>): Promise<void> {
  if (state.lastTitle !== undefined) memState.lastTitle = state.lastTitle
  if (state.lastPoll !== undefined) memState.lastPoll = state.lastPoll

  const redis = getRedis()
  if (redis) {
    try {
      const payload: Record<string, string | number> = {}
      if (state.lastTitle !== undefined) payload.last_title = state.lastTitle
      if (state.lastPoll !== undefined) payload.last_poll = state.lastPoll
      if (Object.keys(payload).length > 0) await redis.hset(STATE_KEY, payload)
    } catch (err) {
      console.log('[v0] setPollState redis error, using memory:', err)
    }
  }
}

export async function addTrack(title: string, playedAt: number): Promise<void> {
  // Always mirror to memory so a single instance is self-consistent.
  memHistory.push({ title, playedAt })
  pruneMemory(playedAt)

  const redis = getRedis()
  if (redis) {
    try {
      const member = JSON.stringify({ title, playedAt })
      await redis.zadd(HISTORY_KEY, { score: playedAt, member })
    } catch (err) {
      console.log('[v0] addTrack redis error, kept in memory only:', err)
    }
  }
}

export async function pruneHistory(now: number): Promise<void> {
  const cutoff = now - THREE_DAYS_MS
  pruneMemory(now)

  const redis = getRedis()
  if (redis) {
    try {
      // Remove everything with score older than the 3-day cutoff.
      await redis.zremrangebyscore(HISTORY_KEY, 0, cutoff)
    } catch (err) {
      console.log('[v0] pruneHistory redis error:', err)
    }
  }
}

export async function getHistory(now: number): Promise<TrackEntry[]> {
  const cutoff = now - THREE_DAYS_MS
  const redis = getRedis()
  if (redis) {
    try {
      // Newest first, within the 3-day window.
      const raw = await redis.zrange<(string | TrackEntry)[]>(
        HISTORY_KEY,
        now,
        cutoff,
        { byScore: true, rev: true },
      )
      const entries = raw
        .map(parseEntry)
        .filter((e): e is TrackEntry => e !== null && e.playedAt >= cutoff)
      if (entries.length > 0 || memHistory.length === 0) return entries
    } catch (err) {
      console.log('[v0] getHistory redis error, using memory:', err)
    }
  }

  // Fallback: memory, newest first.
  return memHistory
    .filter((e) => e.playedAt >= cutoff)
    .sort((a, b) => b.playedAt - a.playedAt)
}

/* ------------------------------- helpers --------------------------------- */

function pruneMemory(now: number) {
  const cutoff = now - THREE_DAYS_MS
  for (let i = memHistory.length - 1; i >= 0; i--) {
    if (memHistory[i].playedAt < cutoff) memHistory.splice(i, 1)
  }
}

// @upstash/redis auto-deserializes JSON, so members may already be objects.
function parseEntry(raw: string | TrackEntry): TrackEntry | null {
  try {
    const obj = typeof raw === 'string' ? (JSON.parse(raw) as TrackEntry) : raw
    if (obj && typeof obj.title === 'string' && typeof obj.playedAt === 'number') {
      return obj
    }
    return null
  } catch {
    return null
  }
}
