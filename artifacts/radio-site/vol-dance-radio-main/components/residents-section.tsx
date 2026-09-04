'use client'

import Image from 'next/image'
import { RESIDENTS } from '@/lib/residents'
import { SocialLink } from './social-link'
import { useResidentModal } from './resident-modal'

export function ResidentsSection() {
  const { open } = useResidentModal()
  const featured = RESIDENTS.find((r) => r.featured)
  const rest = RESIDENTS.filter((r) => !r.featured)

  return (
    <section id="residents" className="vd-rise space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand">
            Команда ефіру
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
            Резиденти{' '}
            <span className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text italic text-transparent">
              VOL DANCE
            </span>
          </h2>
        </div>
        <button
          onClick={open}
          className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-dim transition-colors hover:border-brand/50 hover:text-brand"
        >
          Усі профілі
        </button>
      </div>

      {featured && (
        <article className="overflow-hidden rounded-[1.6rem] border border-brand/35 bg-gradient-to-br from-brand/12 via-card to-transparent">
          <div className="grid sm:grid-cols-[220px_1fr]">
            <div className="relative h-64 sm:h-auto">
              <Image
                src={featured.photo}
                alt={`${featured.name} — ${featured.realName}`}
                fill
                sizes="220px"
                className={`object-cover ${featured.objectPos}`}
              />
              <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Хедлайнер
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <h3 className="text-2xl font-black">{featured.name}</h3>
              <p className="text-sm text-dim">{featured.realName}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand">
                {featured.role}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {featured.bio}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {featured.genres.map((g) => (
                  <span
                    key={g}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {featured.links.map((l) => (
                  <SocialLink key={l.type} link={l} />
                ))}
              </div>
            </div>
          </div>
        </article>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {rest.map((r) => (
          <article
            key={r.name}
            className="group overflow-hidden rounded-[1.4rem] border border-white/8 bg-card/80 transition-transform hover:-translate-y-1"
          >
            <div className="relative h-48">
              <Image
                src={r.photo}
                alt={`${r.name} — ${r.realName}`}
                fill
                sizes="320px"
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${r.objectPos}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-lg font-black leading-tight">{r.name}</h3>
                <p className="text-[11px] uppercase tracking-wide text-blue">{r.role}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                {r.bio}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.links.slice(0, 3).map((l) => (
                  <SocialLink key={l.type} link={l} compact />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
