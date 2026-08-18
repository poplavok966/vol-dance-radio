'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import Image from 'next/image'
import { X, Send, PlayCircle } from 'lucide-react'

type ResidentContextValue = { open: () => void }
const ResidentContext = createContext<ResidentContextValue | null>(null)

const GENRES = ['Tech House', 'Progressive House', 'Melodic Techno', 'Electro House']

export function ResidentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ResidentContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Резидент Quasar-89"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            <button
              onClick={close}
              aria-label="Закрити"
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              <X className="size-4" />
            </button>

            {/* Photo */}
            <div className="relative h-72 w-full">
              <Image
                src="/gal.jpg"
                alt="Quasar-89 — Олександр Галушко"
                fill
                sizes="(max-width: 448px) 100vw, 448px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-brand/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Резидент
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-black leading-tight">
                Quasar-89{' '}
                <span className="text-dim">(Олександр Галушко)</span>
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-blue">
                Music Producer &amp; DJ (UA)
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Олександр Галушко (Quasar-89) — український Music Producer та
                діджей, офіційний резидент VOL DANCE RADIO.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <span
                    key={g}
                    className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-semibold text-foreground"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href="https://t.me/Quasar89music"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2aabee] to-[#229ed9] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <Send className="size-4 -translate-y-px" />
                  Telegram
                </a>
                <a
                  href="https://www.youtube.com/@Quasar-89"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff0033] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <PlayCircle className="size-4" />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </ResidentContext.Provider>
  )
}

export function useResidentModal() {
  const ctx = useContext(ResidentContext)
  if (!ctx)
    throw new Error('useResidentModal must be used within ResidentProvider')
  return ctx
}
