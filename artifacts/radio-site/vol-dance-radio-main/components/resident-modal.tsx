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
import { X } from 'lucide-react'
import { RESIDENTS } from '@/lib/residents'
import { SocialLink } from './social-link'

type ResidentContextValue = { open: () => void }
const ResidentContext = createContext<ResidentContextValue | null>(null)

function GenreTags({ genres }: { genres: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {genres.map((g) => (
        <span
          key={g}
          className="rounded-full border border-white/10 bg-secondary/60 px-2.5 py-0.5 text-[11px] font-semibold text-foreground"
        >
          {g}
        </span>
      ))}
    </div>
  )
}

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

  const featured = RESIDENTS.find((r) => r.featured)!
  const rest = RESIDENTS.filter((r) => !r.featured)

  return (
    <ResidentContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Резиденти VOL DANCE RADIO"
            className="relative my-6 w-full max-w-3xl rounded-3xl border border-white/10 vd-glass p-5 shadow-2xl sm:p-6"
          >
            <button
              onClick={close}
              aria-label="Закрити"
              className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              <X className="size-4" />
            </button>

            <h2 className="mb-1 text-xl font-black tracking-wide">
              Резиденти{' '}
              <span className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text italic text-transparent">
                VOL DANCE
              </span>
            </h2>
            <p className="mb-5 text-sm text-dim">Артисти, що формують звучання станції.</p>

            <article className="overflow-hidden rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/10 to-transparent">
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-56 w-full shrink-0 sm:h-auto sm:w-48">
                  <Image
                    src={featured.photo || '/placeholder.svg'}
                    alt={`${featured.name} — ${featured.realName}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 192px"
                    className={`object-cover ${featured.objectPos}`}
                    priority
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Хедлайнер
                  </span>
                </div>
                <div className="flex-1 p-5">
                  <h3 className="text-2xl font-black leading-tight">{featured.name}</h3>
                  <p className="text-sm text-dim">{featured.realName}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand">
                    {featured.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {featured.bio}
                  </p>
                  <GenreTags genres={featured.genres} />
                  {featured.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {featured.links.map((l) => (
                        <SocialLink key={l.type} link={l} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rest.map((r) => (
                <article
                  key={r.name}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-secondary/40"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={r.photo || '/placeholder.svg'}
                      alt={`${r.name} — ${r.realName}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 220px"
                      className={`object-cover ${r.objectPos}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-lg font-black leading-tight">{r.name}</h3>
                    <p className="text-xs text-dim">{r.realName}</p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue">
                      {r.role}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      {r.bio}
                    </p>
                    <GenreTags genres={r.genres} />
                    {r.links.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {r.links.map((l) => (
                          <SocialLink key={l.type} link={l} />
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </ResidentContext.Provider>
  )
}

export function useResidentModal() {
  const ctx = useContext(ResidentContext)
  if (!ctx) throw new Error('useResidentModal must be used within ResidentProvider')
  return ctx
}
