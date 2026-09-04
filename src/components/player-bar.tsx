import { Loader2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useRadio } from "./radio-provider";

export function PlayerBar() {
  const { isPlaying, isBuffering, trackName, volume, muted, toggle, setVolume, toggleMute } =
    useRadio();
  const { t } = useI18n();

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <div className="vd-hair h-px w-full" />
      <div className="mx-auto grid h-[84px] w-full max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4">
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label={isPlaying ? t("pause") : t("listen")}
          className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          {isBuffering ? (
            <Loader2 className="size-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="size-5 fill-current" />
          ) : (
            <Play className="size-5 translate-x-px fill-current" />
          )}
        </button>

        <div className="min-w-0">
          <div className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
            VOL DANCE Radio
          </div>
          <div className="truncate text-sm font-semibold">{trackName}</div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div
            className={`vd-eq hidden h-5 items-end gap-0.5 md:flex ${isPlaying ? "on" : ""}`}
            aria-hidden
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <i key={i} />
            ))}
          </div>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? t("unmute") : t("mute")}
            className="grid size-11 place-items-center text-muted hover:text-foreground"
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>
          <input
            type="range"
            className="hidden w-24 accent-accent sm:block"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label={t("volume")}
            suppressHydrationWarning
          />
        </div>
      </div>
    </div>
  );
}
