'use client'

import { BarChart3, Music, Download } from 'lucide-react'
import { useRadio, STREAM_URL } from './radio-provider'
import { useRequestModal } from './request-modal'

export function StatsPanel() {
  const { listeners, peak } = useRadio()
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
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="mb-5 flex items-center gap-2 text-base font-extrabold uppercase tracking-wide">
        <BarChart3 className="size-4 text-blue" />
        Статистика ефіру
      </h2>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-secondary/60 p-4 text-center">
          <div className="text-3xl font-black tabular-nums text-blue">
            {listeners}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wide text-dim">
            Слухачів зараз
          </div>
        </div>
        <div className="rounded-2xl bg-secondary/60 p-4 text-center">
          <div className="text-3xl font-black tabular-nums text-blue">
            {peak}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wide text-dim">
            Пік слухачів
          </div>
        </div>
      </div>

      <button
        onClick={open}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-2 px-4 py-3 text-sm font-extrabold uppercase text-white shadow-[0_4px_15px_rgba(255,85,0,0.35)] transition-transform hover:scale-[1.02]"
      >
        <Music className="size-4" />
        Замовити трек в ефір
      </button>
      <button
        onClick={downloadM3u}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue bg-blue/10 px-4 py-3 text-sm font-extrabold uppercase text-blue transition-colors hover:bg-blue hover:text-accent-foreground"
      >
        <Download className="size-4" />
        Завантажити .M3U файл
      </button>
    </div>
  )
}
