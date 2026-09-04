import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Moon, Radio, Sun } from "lucide-react";
import { TELEGRAM_CHANNEL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { Button } from "./ui/button";
import { HashLink } from "./hash-link";
import { UaFlag } from "./ua-flag";
import { useTheme } from "./theme-provider";

type Weather = { temp: number };

function formatClock(now: Date) {
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(formatClock(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time || "00:00:00";
}

export function SiteHeader() {
  const time = useClock();
  const { theme, toggle } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    void fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=49.53&longitude=26.18&current_weather=true",
    )
      .then((r) => r.json())
      .then((d) => setWeather({ temp: Math.round(d.current_weather.temperature) }))
      .catch(() => {});
  }, []);

  const temp =
    weather !== null ? `${weather.temp > 0 ? "+" : ""}${weather.temp}°C` : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Radio className="size-5" strokeWidth={2.4} />
          </span>
          <span className="min-w-0">
            <span className="font-display block text-xl font-semibold tracking-wide text-primary italic">
              VOL DANCE
            </span>
            <span className="hidden text-[10px] font-semibold tracking-[0.22em] text-muted uppercase sm:block">
              {t("live")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {[
            { hash: "on-air", label: t("navOnAir") },
            { hash: "history", label: t("navHistory") },
            { hash: "residents", label: t("navResidents") },
            { hash: "chat", label: t("navChat") },
          ].map((item) => (
            <HashLink
              key={item.hash}
              hash={item.hash}
              className="rounded-full px-3 py-2 text-xs font-semibold tracking-widest text-muted uppercase hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </HashLink>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <span
            title={t("uaTitle")}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 text-[11px] font-semibold"
          >
            <UaFlag />
            <span className="hidden sm:inline">{t("uaShort")}</span>
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1.5 text-xs text-accent sm:inline-flex">
            <Clock className="size-3" />
            <span className="tabular-nums">{time}</span>
          </span>
          {temp && (
            <span className="hidden rounded-full border border-border bg-secondary px-2.5 py-1.5 text-xs md:inline-flex">
              <strong className="text-primary">{temp}</strong>
              <span className="ml-1 text-muted">{t("city")}</span>
            </span>
          )}
          <div
            className="inline-flex h-9 overflow-hidden rounded-full border border-border"
            role="group"
            aria-label={t("langSwitch")}
          >
            <button
              type="button"
              className={`px-2.5 text-[11px] font-bold ${locale === "uk" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted hover:text-foreground"}`}
              onClick={() => setLocale("uk")}
            >
              {t("langUk")}
            </button>
            <button
              type="button"
              className={`px-2.5 text-[11px] font-bold ${locale === "en" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted hover:text-foreground"}`}
              onClick={() => setLocale("en")}
            >
              {t("langEn")}
            </button>
          </div>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={toggle}
            aria-label={theme === "light" ? t("themeDark") : t("themeLight")}
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/request">{t("navRequest")}</Link>
          </Button>
          <Button asChild size="sm">
            <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
