import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { TELEGRAM_CHANNEL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { HashLink } from "./hash-link";

const linkClass =
  "flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold tracking-wide uppercase hover:bg-secondary hover:text-primary";

export function SiteMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="vd-menu fixed inset-0 lg:hidden" role="dialog" aria-modal="true" aria-label={t("menu")}>
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label={t("menuClose")}
        onClick={onClose}
      />
      <aside className="vd-menu-panel absolute inset-y-0 right-0 flex h-dvh w-80 max-w-[85vw] flex-col border-l border-border bg-card shadow-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <div>
            <div className="font-display text-lg font-semibold tracking-wide text-primary italic">
              VOL DANCE
            </div>
            <div className="text-[10px] font-semibold tracking-[0.22em] text-muted uppercase">
              {t("live")}
            </div>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full hover:bg-secondary"
            aria-label={t("menuClose")}
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4 pb-28">
          <p className="px-3 pb-2 text-[11px] font-semibold tracking-widest text-muted uppercase">
            {t("menuNav")}
          </p>
          <div className="flex flex-col gap-0.5">
            {[
              { hash: "on-air", label: t("navOnAir") },
              { hash: "history", label: t("navHistory") },
              { hash: "residents", label: t("navResidents") },
              { hash: "chat", label: t("navChat") },
            ].map((item) => (
              <HashLink key={item.hash} hash={item.hash} className={linkClass} onNavigate={onClose}>
                {item.label}
              </HashLink>
            ))}
            <Link to="/request" className={linkClass} onClick={onClose}>
              {t("navRequest")}
            </Link>
            <a
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              onClick={onClose}
            >
              Telegram
            </a>
          </div>
          <p className="mt-6 px-3 pb-2 text-[11px] font-semibold tracking-widest text-muted uppercase">
            {t("footerLegal")}
          </p>
          <div className="flex flex-col gap-0.5">
            <Link to="/offer" className={linkClass} onClick={onClose}>
              {t("footerOffer")}
            </Link>
            <Link to="/privacy" className={linkClass} onClick={onClose}>
              {t("footerPrivacy")}
            </Link>
            <Link to="/rules" className={linkClass} onClick={onClose}>
              {t("footerRules")}
            </Link>
            <Link to="/legal" className={linkClass} onClick={onClose}>
              {t("footerLegalInfo")}
            </Link>
          </div>
        </nav>
      </aside>
    </div>,
    document.body,
  );
}
