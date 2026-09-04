import { Link } from "@tanstack/react-router";
import { Radio } from "lucide-react";
import { TELEGRAM_CHANNEL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { UaFlag } from "./ua-flag";
import { HashLink } from "./hash-link";

export function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pt-10 pb-4">
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground">
              <Radio className="size-4" />
            </span>
            <div>
              <div className="font-display text-lg font-semibold tracking-wide italic">
                VOL DANCE RADIO
              </div>
              <div className="text-[11px] tracking-[0.18em] text-muted uppercase">
                <span className="inline-flex items-center gap-1.5">
                  <UaFlag /> {t("city")} · {t("uaShort")} · 24/7
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">{t("footerAbout")}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <div className="text-[11px] font-semibold tracking-widest text-muted uppercase">
              {t("footerAir")}
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              <HashLink hash="on-air" className="hover:text-primary">
                {t("listen")}
              </HashLink>
              <Link to="/request" className="hover:text-primary">
                {t("requestTrack")}
              </Link>
              <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                {t("footerChannel")}
              </a>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-widest text-muted uppercase">
              {t("footerLegal")}
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              <Link to="/offer" className="hover:text-primary">
                {t("footerOffer")}
              </Link>
              <Link to="/privacy" className="hover:text-primary">
                {t("footerPrivacy")}
              </Link>
              <Link to="/rules" className="hover:text-primary">
                {t("footerRules")}
              </Link>
              <Link to="/legal" className="hover:text-primary">
                {t("footerLegalInfo")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-[11px] leading-relaxed text-muted">
        {t("footerAccept")}{" "}
        <Link to="/offer" className="underline decoration-border underline-offset-2">
          {t("footerOfferLow")}
        </Link>
        . {t("footerData")}{" "}
        <Link to="/privacy" className="underline decoration-border underline-offset-2">
          {t("footerPolicy")}
        </Link>
        . {t("footerRights")} © {year} {t("footerCopy")}
      </p>
    </footer>
  );
}
