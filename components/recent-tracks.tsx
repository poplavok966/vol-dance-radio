'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { History, Music } from 'lucide-react'

type Track = { title: string; time: string }
type Day = { date: string; tracks: Track[] }
type HistoryResponse = { days: Day[] }

async function historyFetcher(url: string): Promise<HistoryResponse> {
  const res = await fetch(url)
  return res.json()
}

const SEARCH_SERVICES = [
  {
    name: 'YouTube',
    icon: '/brands/youtube.svg',
    bg: 'bg-white/5 hover:bg-[#ff0033]/25',
    url: (t: string) =>
      `https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`,
  },
  {
    name: 'Spotify',
    icon: '/brands/spotify.svg',
    bg: 'bg-white/5 hover:bg-[#1db954]/25',
    url: (t: string) => `https://open.spotify.com/search/${encodeURIComponent(t)}`,
  },
  {
    name: 'Apple Music',
    icon: '/brands/apple-music.svg',
    bg: 'bg-white/5 hover:bg-[#fa243c]/25',
    url: (t: string) =>
      `https://music.apple.com/us/search?term=${encodeURIComponent(t)}`,
  },
  {
    name: 'SoundCloud',
    icon: '/brands/soundcloud.svg',
    bg: 'bg-white/5 hover:bg-[#ff5500]/25',
    url: (t: string) => `https://soundcloud.com/search?q=${encodeURIComponent(t)}`,
  },
] as const

export function RecentTracks() {
  const { data } = useSWR('/api/history', historyFetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  const days = data?.days ?? []
  const [activeDate, setActiveDate] = useState<string | null>(null)

  // Default to the newest day that actually has tracks (fallback: first day).
  useEffect(() => {
    if (days.length === 0) return
    const stillValid = activeDate && days.some((d) => d.date === activeDate)
    if (!stillValid) {
      const firstWithTracks = days.find((d) => d.tracks.length > 0)
      setActiveDate((firstWithTracks ?? days[0]).date)
    }
  }, [days, activeDate])

  const selected = days.find((d) => d.date === activeDate) ?? null
  const hasAny = days.some((d) => d.tracks.length > 0)

  return (
    <section className="rounded-3xl border border-border bg-card p-5 sm:p-6">
      {/* Header: title left, date selector top-right */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="size-4 text-blue" />
          <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-dim">
            Історія ефіру · останні 7 днів
          </h2>
        </div>

        {days.length > 0 && (
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {days.map((day, i) => {
              const isActive = day.date === activeDate
              // Newest-first: index 0 = today, 1 = yesterday, rest show DD.MM.
              const label =
                i === 0 ? 'Сьогодні' : i === 1 ? 'Вчора' : day.date.slice(0, 5)
              return (
                <button
                  key={day.date}
                  onClick={() => setActiveDate(day.date)}
                  title={day.date}
                  className={
                    'rounded-full border px-2.5 py-1 text-[11px] font-bold tabular-nums tracking-wide transition-colors ' +
                    (isActive
                      ? 'border-blue/50 bg-blue/15 text-blue'
                      : 'border-border bg-secondary/50 text-dim hover:text-foreground')
                  }
                >
                  {label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {!hasAny ? (
        <p className="py-4 text-center text-sm text-dim">
          Історія збирається на сервері — треки з&apos;являться, щойно зіграють в
          ефірі.
        </p>
      ) : !selected || selected.tracks.length === 0 ? (
        <p className="py-4 text-center text-sm text-dim">
          За {activeDate ?? 'цю дату'} треків не було.
        </p>
      ) : (
        // Scrollable list: ~5 rows visible, then a neat scrollbar appears.
        <ol className="vd-scroll flex max-h-[19rem] flex-col gap-2 overflow-y-auto pr-1">
          {selected.tracks.map((item, i) => (
            <li
              key={`${selected.date}-${item.title}-${item.time}-${i}`}
              className="flex items-center gap-3 rounded-xl border border-transparent bg-secondary/50 px-3.5 py-2.5 transition-colors hover:border-border hover:bg-card-hover"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-blue">
                <Music className="size-4" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                {item.title}
              </span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-dim">
                {item.time}
              </span>
              <div className="flex shrink-0 items-center gap-1">
                {SEARCH_SERVICES.map((svc) => (
                  <a
                    key={svc.name}
                    href={svc.url(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Знайти «${item.title}» на ${svc.name}`}
                    title={`Знайти на ${svc.name}`}
                    className={`grid size-7 place-items-center rounded-lg ring-1 ring-white/10 transition-colors ${svc.bg}`}
                  >
                    <img
                      src={svc.icon || '/placeholder.svg'}
                      alt=""
                      className="size-4 object-contain"
                    />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
