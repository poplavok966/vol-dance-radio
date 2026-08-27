'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Clock, Radio, Send, Headphones, Zap } from 'lucide-react'
import { useResidentModal } from './resident-modal'

type Weather = { temp: number; code: number }

async function weatherFetcher(): Promise<Weather> {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=49.53&longitude=26.18&current_weather=true',
  )
  const d = await res.json()
  return {
    temp: Math.round(d.current_weather.temperature),
    code: Number(d.current_weather.weathercode ?? 0),
  }
}

function weatherIcon(code: number) {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  if (code <= 86) return '🌨️'
  return '⛈️'
}

function useClock() {
  const [time, setTime] = useState('00:00:00')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        [now.getHours(), now.getMinutes(), now.getSeconds()]
          .map((n) => String(n).padStart(2, '0'))
          .join(':'),
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function SiteHeader() {
  const time = useClock()
  const { open: openResident } = useResidentModal()
  const { data: weather } = useSWR('weather', weatherFetcher, {
    refreshInterval: 600000,
    revalidateOnFocus: false,
  })

  const tempLabel =
    weather !== undefined
      ? `${weather.temp > 0 ? '+' : ''}${weather.temp}°C`
      : '--°C'

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-3.5 md:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_20px_rgba(255,85,0,0.45)]">
            <Radio className="size-5 text-white" strokeWidth={2.5} />
          </span>
          <div className="leading-none">
            <div className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-xl font-black italic tracking-wide text-transparent md:text-2xl">
              VOL DANCE
            </div>
            <div className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.25em] text-dim sm:block">
              Dance Radio
            </div>
          </div>
        </div>

        {/* Widgets + actions — wraps to its own row on small screens */}
        <div className="flex w-full flex-wrap items-center justify-start gap-1.5 sm:w-auto sm:justify-end">
          <div className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-blue sm:flex">
            <Clock className="size-3" />
            <span className="tabular-nums">{time}</span>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium md:flex">
            <span aria-hidden className="text-xs">{weather ? weatherIcon(weather.code) : '🌡️'}</span>
            <span>
              <strong className="text-brand">{tempLabel}</strong>{' '}
              <span className="text-dim">Волочиськ</span>
            </span>
          </div>

          {/* Residents */}
          <button
            onClick={openResident}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:border-brand/50 hover:text-brand"
          >
            <Headphones className="size-3.5" />
            <span>Резиденти</span>
          </button>

          {/* Instant order — opens the live request widget */}
          <a
            href="/request.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition-colors hover:bg-brand/20"
          >
            <Zap className="size-3.5" />
            <span>Замовлення</span>
          </a>

          {/* Telegram channel */}
          <a
            href="https://t.me/vol_dance_vol"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Офіційний Telegram-канал VOL DANCE"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#2aabee] to-[#229ed9] px-3 py-1 text-xs font-semibold text-white shadow-[0_0_14px_rgba(34,158,217,0.4)] transition-transform hover:scale-105"
          >
            <Send className="size-3.5 -translate-y-px" />
            <span className="hidden sm:inline">Telegram</span>
          </a>
        </div>
      </div>
    </header>
  )
}
