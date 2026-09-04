'use client'

import { Play, Pause, Loader2, Volume2, VolumeX } from 'lucide-react'
import { useRadio } from './radio-provider'

export function PlayerBar() {
  const {
    isPlaying,
    isBuffering,
    trackName,
    volume,
    muted,
    toggle,
    setVolume,
    toggleMute,
  } = useRadio()

  return (
    <div className="fixed bottom-0 left-0 z-[1000] w-full border-t border-white/8 bg-background/80 backdrop-blur-2xl">
      <div className="h-px w-full vd-hairline opacity-70" />
      <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3.5 md:flex-none md:min-w-[280px]">
          <button
            onClick={toggle}
            aria-label={isPlaying ? 'Пауза' : 'Слухати'}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-[0_0_22px_rgba(255,85,0,0.55)] transition-transform hover:scale-105"
          >
            {isBuffering ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="size-5 fill-white" />
            ) : (
              <Play className="size-5 translate-x-0.5 fill-white" />
            )}
          </button>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dim">
              VOL DANCE Radio
            </div>
            <div className="truncate text-sm font-bold">{trackName}</div>
          </div>
        </div>

        <div
          className={`hidden h-6 items-end gap-1 md:flex ${isPlaying ? 'vd-eq-playing' : ''}`}
          aria-hidden
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="vd-eq-bar" />
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 md:min-w-[200px]">
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Увімкнути звук' : 'Вимкнути звук'}
            className="text-dim transition-colors hover:text-foreground"
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>
          <input
            type="range"
            className="vd-range w-24 md:w-32"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Гучність"
            style={{
              background: `linear-gradient(to right, var(--blue) ${volume * 100}%, var(--input) ${volume * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
