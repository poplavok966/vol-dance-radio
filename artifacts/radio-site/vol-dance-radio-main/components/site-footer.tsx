import { Radio } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/8 pt-10">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-2">
            <Radio className="size-4 text-white" />
          </span>
          <div>
            <div className="text-sm font-black italic tracking-wide">VOL DANCE RADIO</div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-dim">
              Волочиськ · Україна · 24/7
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://t.me/vol_dance_vol"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-dim hover:text-foreground"
          >
            Telegram
          </a>
          <a
            href="https://mytuner-radio.com/radio/vol-dance-520895/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-dim hover:text-foreground"
          >
            myTuner
          </a>
          <a
            href="/request.html"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-dim hover:text-foreground"
          >
            Замовити трек
          </a>
        </div>
      </div>
      <p className="mt-6 pb-2 text-[11px] text-dim">
        © {new Date().getFullYear()} VOL DANCE. Танцювальна хвиля без пауз.
      </p>
    </footer>
  )
}
