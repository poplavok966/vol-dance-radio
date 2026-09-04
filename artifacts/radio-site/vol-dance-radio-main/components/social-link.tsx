import type { ResidentLink } from '@/lib/residents'

const STYLES: Record<ResidentLink['type'], string> = {
  telegram: 'bg-gradient-to-r from-[#2aabee] to-[#229ed9]',
  youtube: 'bg-[#ff0033]',
  instagram: 'bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]',
  soundcloud: 'bg-[#ff5500]',
  spotify: 'bg-[#1db954]',
  facebook: 'bg-[#1877f2]',
  tiktok: 'bg-black ring-1 ring-white/15',
  threads: 'bg-black ring-1 ring-white/15',
}

export function SocialLink({
  link,
  compact = false,
}: {
  link: ResidentLink
  compact?: boolean
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-lg text-xs font-bold text-white transition-transform hover:scale-[1.03] ${STYLES[link.type]} ${
        compact ? 'px-2 py-1' : 'px-2.5 py-1.5'
      }`}
    >
      <img
        src={`/brands/${link.type}.svg`}
        alt=""
        className="size-3.5 shrink-0 brightness-0 invert"
      />
      {link.label}
    </a>
  )
}
