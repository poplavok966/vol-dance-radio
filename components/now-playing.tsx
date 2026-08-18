'use client'

import { Play, Pause, Loader2, Users } from 'lucide-react'
import { useRadio } from './radio-provider'
import { AudioVisualizer } from './audio-visualizer'
import { TrackReactions } from './track-reactions'

export function NowPlaying() {
  const { isPlaying, isBuffering, trackName, listeners, toggle } = useRadio()

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card">
      {/* glow accents */}
      <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-blue/15 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:items-center sm:gap-8 sm:p-10 sm:text-left">
        {/* Big play control */}
        <button
          onClick={toggle}
          aria-label={isPlaying ? 'Пауза' : 'Слухати ефір'}
          className="group relative grid size-28 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-[0_0_45px_rgba(255,85,0,0.5)] transition-transform hover:scale-105 sm:size-32"
        >
          {isPlaying && (
            <span className="absolute inset-0 rounded-full ring-2 ring-white/30 vd-pulse" />
          )}
          {isBuffering ? (
            <Loader2 className="size-11 animate-spin" />
          ) : isPlaying ? (
            <Pause className="size-11 fill-white" />
          ) : (
            <Play className="size-11 translate-x-0.5 fill-white" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-brand sm:justify-start">
            <span className="vd-pulse size-1.5 rounded-full bg-brand" />
            {isPlaying ? 'Зараз в ефірі' : 'Live-потік готовий'}
          </div>
          <h1 className="mt-2 text-balance text-2xl font-black leading-tight sm:text-4xl">
            {trackName}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-dim sm:justify-start">
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-blue" />
              <span className="font-bold text-foreground tabular-nums">
                {listeners}
              </span>{' '}
              слухачів
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="font-semibold uppercase tracking-wide">
              VOL DANCE Radio · 24/7
            </span>
          </div>

          <div className="mt-5 flex justify-center sm:justify-start">
            <TrackReactions />
          </div>
        </div>
      </div>

      {/* Real-time frequency spectrum */}
      <div className="relative h-20 w-full px-6 pb-5 sm:h-24 sm:px-10">
        <AudioVisualizer />
      </div>
    </section>
  )
}
