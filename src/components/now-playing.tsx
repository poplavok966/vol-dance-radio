import { Loader2, Pause, Play, Radio, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useRadio } from "./radio-provider";
import { AudioVisualizer } from "./audio-visualizer";
import { TrackReactions } from "./track-reactions";
import { Button } from "./ui/button";
import { cn } from "@/lib/cn";

export function NowPlaying() {
  const { isPlaying, isBuffering, trackName, listeners, peak, toggle } = useRadio();
  const { t } = useI18n();

  return (
    <section
      id="on-air"
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="flex flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:items-center lg:gap-10">
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label={isPlaying ? t("pause") : t("listenAir")}
          className="relative mx-auto size-36 shrink-0 lg:mx-0"
        >
          <span
            className={cn(
              "absolute inset-0 rounded-full border-8 border-background bg-[conic-gradient(from_200deg,#1a1a22,#2c2c36,#111,#2c2c36,#1a1a22)]",
              isPlaying && "vd-vinyl",
            )}
          />
          <span className="absolute inset-[30%] rounded-full bg-primary" />
          <span className="absolute inset-[44%] rounded-full bg-background ring-1 ring-border" />
          <span className="relative z-10 grid size-full place-items-center text-primary-foreground">
            {isBuffering ? (
              <Loader2 className="size-8 animate-spin" />
            ) : isPlaying ? (
              <Pause className="size-8 fill-current" />
            ) : (
              <Play className="size-8 translate-x-0.5 fill-current" />
            )}
          </span>
        </button>

        <div className="min-w-0 flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase lg:justify-start">
            <span className="vd-pulse size-1.5 rounded-full bg-primary" />
            {isPlaying ? t("onAirNow") : t("liveReady")}
          </div>
          <p className="mt-2 text-[11px] font-semibold tracking-[0.28em] text-muted uppercase">
            {t("tagline")}
          </p>
          <h1 className="mt-2 break-words font-display text-3xl leading-tight font-semibold tracking-wide sm:text-5xl">
            {trackName}
          </h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4 text-accent" />
              <b className="tabular-nums text-foreground">{listeners}</b>
              {t("listeners")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Radio className="size-4 text-primary" />
              {t("peak")} {peak} · 24/7
            </span>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button onClick={() => void toggle()} size="lg">
              {isPlaying ? t("pause") : t("listenNow")}
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/request">{t("requestTrack")}</Link>
            </Button>
            <TrackReactions />
          </div>
        </div>
      </div>
      <div className="relative h-24 px-5 pb-5 sm:h-28 sm:px-8">
        <AudioVisualizer />
      </div>
    </section>
  );
}
