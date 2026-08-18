'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { History, Music, PlayCircle } from 'lucide-react'

type Track = { title: string; time: string }
type Day = { date: string; tracks: Track[] }
type HistoryResponse = { days: Day[] }

async function historyFetcher(url: string): Promise<HistoryResponse> {
  const res = await fetch(url)
  return res.json()
}

function youtubeSearchUrl(title: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`
}

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
            Історія ефіру · останні 3 дні
          </h2>
        </div>

        {days.length > 0 && (
          <div className="flex items-center gap-1.5">
            {days.map((day) => {
              const isActive = day.date === activeDate
              return (
                <button
                  key={day.date}
                  onClick={() => setActiveDate(day.date)}
                  className={
                    'rounded-full border px-2.5 py-1 text-[11px] font-bold tabular-nums tracking-wide transition-colors ' +
                    (isActive
                      ? 'border-blue/50 bg-blue/15 text-blue'
                      : 'border-border bg-secondary/50 text-dim hover:text-foreground')
                  }
                >
                  {day.date.slice(0, 5)}
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
              <a
                href={youtubeSearchUrl(item.title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Знайти «${item.title}» на YouTube`}
                title="Знайти на YouTube"
                className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#ff0033]/10 text-[#ff3355] transition-colors hover:bg-[#ff0033] hover:text-white"
              >
                <PlayCircle className="size-4" />
              </a>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
