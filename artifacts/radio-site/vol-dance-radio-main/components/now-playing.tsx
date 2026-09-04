'use client'

import { Play, Pause, Loader2, Users, Radio } from 'lucide-react'
import { useRadio } from './radio-provider'
import { AudioVisualizer } from './audio-visualizer'
import { TrackReactions } from './track-reactions'

export function NowPlaying() {
  const { isPlaying, isBuffering, trackName, listeners, toggle } = useRadio()

  return (
    <section
      id="on-air"
      className="vd-rise relative overflow-hidden rounded-[2rem] border border-white/8 vd-glass"
    >
      <div className="pointer-events-none absolute -right-16 -top-24 size-[22rem] rounded-full bg-brand/25 blur-3xl vd-glow-shift" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 size-[20rem] rounded-full bg-blue/15 blur-3xl" />

      <div className="relative grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:p-10">
        <button
          onClick={toggle}
          aria-label={isPlaying ? 'Пауза' : 'Слухати ефір'}
          className="group relative mx-auto grid size-32 place-items-center sm:size-36 lg:mx-0"
        >
          <span
            className={`absolute inset-0 rounded-full border-[10px] border-black bg-[conic-gradient(from_210deg,#1a1a22,#2a2a36,#111116,#2a2a36,#1a1a22)] shadow-[0_0_50px_rgba(255,85,0,0.35)] ${
              isPlaying ? 'vd-vinyl' : ''
            }`}
          />
          <span className="absolute inset-[28%] rounded-full bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_30px_rgba(255,85,0,0.55)]" />
          <span className="absolute inset-[42%] rounded-full bg-[#101014] ring-1 ring-white/20" />
          <span className="relative z-10 text-white">
            {isBuffering ? (
              <Loader2 className="size-8 animate-spin" />
            ) : isPlaying ? (
              <Pause className="size-8 fill-white" />
            ) : (
              <Play className="size-8 translate-x-0.5 fill-white" />
            )}
          </span>
          {isPlaying && (
            <span className="absolute -inset-2 rounded-full ring-2 ring-brand/40 vd-pulse" />
          )}
        </button>

        <div className="min-w-0 text-center lg:text-left">
          <div className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand lg:justify-start">
            <span className="vd-pulse size-1.5 rounded-full bg-brand" />
            {isPlaying ? 'Зараз в ефірі' : 'Live-потік готовий'}
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-dim">
            Твоя танцювальна хвиля
          </p>
          <h1 className="mt-2 text-balance text-3xl font-black leading-[1.05] sm:text-5xl">
            {trackName}
          </h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-dim lg:justify-start">
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-blue" />
              <span className="font-bold tabular-nums text-foreground">{listeners}</span>
              слухачів
            </span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wide">
              <Radio className="size-3.5 text-brand" />
              VOL DANCE · 24/7
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(255,85,0,0.35)] transition-transform hover:scale-[1.03]"
            >
              {isPlaying ? 'Пауза' : 'Слухати зараз'}
            </button>
            <TrackReactions />
          </div>
        </div>
      </div>

      <div className="relative h-24 w-full px-5 pb-5 sm:h-28 sm:px-8">
        <AudioVisualizer />
      </div>
    </section>
  )
}
