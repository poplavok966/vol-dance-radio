'use client'

import { Music, Download, Radio, Sparkles } from 'lucide-react'
import { STREAM_URL } from './radio-provider'
import { useRequestModal } from './request-modal'

export function StatsPanel() {
  const { open } = useRequestModal()

  const downloadM3u = () => {
    const m3u = `#EXTM3U\n#EXTINF:-1,VOL DANCE Radio\n${STREAM_URL}`
    const blob = new Blob([m3u], { type: 'audio/x-mpegurl' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'voldance.m3u'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col rounded-[1.6rem] border border-white/8 vd-glass p-6">
      <h2 className="mb-1 flex items-center gap-2 text-base font-extrabold uppercase tracking-wide">
        <Sparkles className="size-4 text-blue" />
        Швидкі дії
      </h2>
      <p className="mb-5 text-sm text-dim">
        Замовляй улюблені треки в ефір або слухай нас у власному плеєрі.
      </p>

      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={open}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand to-brand-2 px-4 py-7 text-center text-white shadow-[0_8px_24px_rgba(255,85,0,0.35)] transition-transform hover:scale-[1.02]"
        >
          <Music className="size-6" />
          <span className="text-sm font-extrabold uppercase leading-tight">Замовити трек</span>
          <span className="text-[11px] font-medium text-white/80">Твоя музика в ефірі</span>
        </button>

        <button
          onClick={downloadM3u}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-blue/50 bg-blue/10 px-4 py-7 text-center text-blue transition-colors hover:bg-blue hover:text-accent-foreground"
        >
          <Download className="size-6" />
          <span className="text-sm font-extrabold uppercase leading-tight">.M3U плейлист</span>
          <span className="text-[11px] font-medium opacity-80">Для сторонніх плеєрів</span>
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-xs text-dim">
        <Radio className="size-3.5 text-brand" />
        Потік іде безперервно. Підключай телефон, колонку чи авто.
      </div>
    </div>
  )
}
