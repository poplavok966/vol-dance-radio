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

type ResidentContextValue = { open: () => void }
const ResidentContext = createContext<ResidentContextValue | null>(null)

type Link = {
  type:
    | 'telegram'
    | 'youtube'
    | 'instagram'
    | 'soundcloud'
    | 'spotify'
    | 'facebook'
    | 'tiktok'
    | 'threads'
  label: string
  href: string
}

type Resident = {
  name: string
  realName: string
  role: string
  photo: string
  objectPos: string
  bio: string
  genres: string[]
  links: Link[]
  featured?: boolean
}

const RESIDENTS: Resident[] = [
  {
    name: 'Dj Alexx',
    realName: 'Олександр Ганюк',
    role: 'Хедлайнер · Event & Club DJ',
    photo: '/alex.jpg',
    objectPos: 'object-center',
    bio: 'Хедлайнер VOL DANCE RADIO — Event & Club DJ із 16-річним досвідом. Офіційний резидент станції.',
    genres: ['16 років досвіду', 'Event', 'Club'],
    links: [
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/alexx_dj_/' },
      { type: 'telegram', label: 'Telegram', href: 'https://t.me/alexxdj' },
    ],
    featured: true,
  },
  {
    name: 'DJ LISIMA',
    realName: 'Лія Будник',
    role: 'DJ · UA',
    photo: '/lisima.png',
    objectPos: 'object-top',
    bio: 'Українська діджейка, яка поєднує у своїх сетах House, Indie Dance, Melodic Techno та Tech House. Її стиль — атмосферна електроніка, драйвовий грув і музика, що створює особливий вайб. Офіційний резидент VOL DANCE RADIO.',
    genres: ['House', 'Indie Dance', 'Melodic Techno', 'Tech House'],
    links: [
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/li_budnyk' },
      { type: 'soundcloud', label: 'SoundCloud', href: 'https://on.soundcloud.com/YMDyzMziW2xpLoUktc' },
      { type: 'telegram', label: 'Telegram', href: 'https://t.me/Li_Budnyk' },
    ],
  },
  {
    name: 'Verum Void',
    realName: 'Сергій Дорощук',
    role: 'Sound Producer & DJ · UA',
    photo: '/verumvoid.jpg',
    objectPos: 'object-top',
    bio: 'Український Sound Producer та діджей, офіційний резидент VOL DANCE RADIO.',
    genres: ['Melodic Techno', 'Indie Dance', 'Trance'],
    links: [
      {
        type: 'spotify',
        label: 'Spotify',
        href: 'https://open.spotify.com/artist/0DY8fkAKJeynQzDvHC7bg3?si=BmxiWyGZQSWxGiVSQtydcQ',
      },
      { type: 'instagram', label: 'Instagram', href: 'https://instagram.com/verum_void' },
      { type: 'telegram', label: 'Telegram', href: 'https://t.me/verum_void' },
      { type: 'facebook', label: 'Facebook', href: 'https://facebook.com/sergey.doroshchuk.7' },
      { type: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@verum_void' },
      { type: 'threads', label: 'Threads', href: 'https://threads.com/@verum_void' },
    ],
  },
  {
    name: 'Quasar-89',
    realName: 'Олександр Галушко',
    role: 'Music Producer & DJ · UA',
    photo: '/gal.jpg',
    objectPos: 'object-top',
    bio: 'Український Music Producer та діджей, офіційний резидент VOL DANCE RADIO.',
    genres: ['Tech House', 'Progressive House', 'Melodic Techno', 'Electro House'],
    links: [
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/quasar89music/' },
      { type: 'spotify', label: 'Spotify', href: 'https://open.spotify.com/artist/1L8v9aXzezquw8rVInJOe7' },
      { type: 'soundcloud', label: 'SoundCloud', href: 'https://soundcloud.com/user-763148322' },
      { type: 'telegram', label: 'Telegram', href: 'https://t.me/Quasar89music' },
      { type: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@Quasar-89' },
    ],
  },
]

function LinkButton({ link }: { link: Link }) {
  const base =
    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.03]'
  const styles: Record<Link['type'], string> = {
    telegram: 'bg-gradient-to-r from-[#2aabee] to-[#229ed9]',
    youtube: 'bg-[#ff0033]',
    instagram: 'bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]',
    soundcloud: 'bg-[#ff5500]',
    spotify: 'bg-[#1db954]',
    facebook: 'bg-[#1877f2]',
    tiktok: 'bg-black ring-1 ring-white/15',
    threads: 'bg-black ring-1 ring-white/15',
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles[link.type]}`}
    >
      <img
        src={`/brands/${link.type}.svg`}
        alt=""
        aria-hidden="true"
        className="size-3.5 shrink-0 brightness-0 invert"
      />
      {link.label}
    </a>
  )
}

function GenreTags({ genres }: { genres: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {genres.map((g) => (
        <span
          key={g}
          className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px] font-semibold text-foreground"
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
            className="relative my-6 w-full max-w-3xl rounded-3xl border border-border bg-card p-5 shadow-2xl sm:p-6"
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
            <p className="mb-5 text-sm text-dim">
              Артисти, що формують звучання станції.
            </p>

            {/* Featured headliner — Dj Alexx */}
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
                  <h3 className="text-2xl font-black leading-tight">
                    {featured.name}
                  </h3>
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
                        <LinkButton key={l.type} link={l} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>

            {/* Remaining residents */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rest.map((r) => (
                <article
                  key={r.name}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-secondary/40"
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
                          <LinkButton key={l.type} link={l} />
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
  if (!ctx)
    throw new Error('useResidentModal must be used within ResidentProvider')
  return ctx
}
