'use client'

import { useEffect, useRef, useState } from 'react'
import { Flame, Heart } from 'lucide-react'
import { useRadio } from './radio-provider'

type Kind = 'fire' | 'love'
type Counts = { fire: number; love: number }
type Burst = { id: number; symbol: string }

// Per-track localStorage flag so a single browser can only cast one honest
// vote per reaction. Re-clicking cancels the vote instead of inflating it.
function likeKey(track: string, kind: Kind) {
  return `vd_liked_${kind}::${track}`
}

export function TrackReactions() {
  const { trackName } = useRadio()
  const [counts, setCounts] = useState<Counts>({ fire: 0, love: 0 })
  const [liked, setLiked] = useState<{ fire: boolean; love: boolean }>({
    fire: false,
    love: false,
  })
  const [bursts, setBursts] = useState<Burst[]>([])
  const burstId = useRef(0)
  const pending = useRef(false)

  // Load the server counts and this browser's saved vote for the current track.
  useEffect(() => {
    let active = true
    setLiked({
      fire: localStorage.getItem(likeKey(trackName, 'fire')) === '1',
      love: localStorage.getItem(likeKey(trackName, 'love')) === '1',
    })
    fetch(`/api/reactions?track=${encodeURIComponent(trackName)}`)
      .then((r) => r.json())
      .then((data: Counts) => {
        if (active) setCounts({ fire: data.fire ?? 0, love: data.love ?? 0 })
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [trackName])

  const react = async (kind: Kind) => {
    if (pending.current) return
    const isLiked = liked[kind]
    const action = isLiked ? 'remove' : 'add'

    // Optimistic UI update.
    pending.current = true
    setLiked((prev) => ({ ...prev, [kind]: !isLiked }))
    setCounts((prev) => ({
      ...prev,
      [kind]: Math.max(0, prev[kind] + (isLiked ? -1 : 1)),
    }))
    if (!isLiked) {
      localStorage.setItem(likeKey(trackName, kind), '1')
      const id = burstId.current++
      setBursts((prev) => [
        ...prev,
        { id, symbol: kind === 'fire' ? '🔥' : '❤️' },
      ])
      setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 900)
    } else {
      localStorage.removeItem(likeKey(trackName, kind))
    }

    try {
      const res = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track: trackName, kind, action }),
      })
      const data: Counts = await res.json()
      setCounts({ fire: data.fire ?? 0, love: data.love ?? 0 })
    } catch {
      // Ignore network errors; optimistic state stays.
    } finally {
      pending.current = false
    }
  }

  return (
    <div className="flex items-center gap-2.5">
      <button
        onClick={() => react('fire')}
        aria-label="Вогонь"
        aria-pressed={liked.fire}
        className={`vd-react group relative flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors active:scale-95 ${
          liked.fire
            ? 'border-brand bg-brand/20 text-brand'
            : 'border-border bg-secondary/60 text-brand hover:border-brand/50 hover:bg-brand/10'
        }`}
      >
        <Flame className="size-4 transition-transform group-active:scale-125" />
        <span className="tabular-nums">{counts.fire}</span>
      </button>

      <button
        onClick={() => react('love')}
        aria-label="Подобається"
        aria-pressed={liked.love}
        className={`vd-react group relative flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors active:scale-95 ${
          liked.love
            ? 'border-destructive bg-destructive/20 text-destructive'
            : 'border-border bg-secondary/60 text-destructive hover:border-destructive/50 hover:bg-destructive/10'
        }`}
      >
        <Heart
          className={`size-4 transition-transform group-active:scale-125 ${
            liked.love ? 'fill-current' : ''
          }`}
        />
        <span className="tabular-nums">{counts.love}</span>

        {/* Floating burst emojis */}
        <span className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
          {bursts.map((b) => (
            <span key={b.id} className="vd-burst absolute text-lg">
              {b.symbol}
            </span>
          ))}
        </span>
      </button>
    </div>
  )
}
