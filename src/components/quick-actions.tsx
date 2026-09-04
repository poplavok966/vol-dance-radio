import { Download, Music, Radio } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { STREAM_URL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { RequestDialog } from "./request-form";

export function QuickActions() {
  const { t } = useI18n();
  const downloadM3u = () => {
    const m3u = `#EXTM3U\n#EXTINF:-1,VOL DANCE Radio\n${STREAM_URL}`;
    const blob = new Blob([m3u], { type: "audio/x-mpegurl" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "voldance.m3u";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-sm font-semibold tracking-wide uppercase">{t("quickTitle")}</h2>
      <p className="mt-1 mb-5 text-sm text-muted">{t("quickLead")}</p>
      <div className="grid flex-1 gap-3 sm:grid-cols-2">
        <RequestDialog>
          <button
            type="button"
            className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg bg-primary px-4 py-6 text-center text-primary-foreground"
          >
            <Music className="size-6" />
            <span className="text-sm font-semibold uppercase">{t("quickRequest")}</span>
            <span className="text-[11px] opacity-80">{t("quickRequestHint")}</span>
          </button>
        </RequestDialog>
        <button
          type="button"
          onClick={downloadM3u}
          className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-6 text-center text-accent"
        >
          <Download className="size-6" />
          <span className="text-sm font-semibold uppercase">{t("quickM3u")}</span>
          <span className="text-[11px] opacity-80">{t("quickM3uHint")}</span>
        </button>
      </div>
      <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
        <Radio className="size-3.5 text-primary" />
        {t("quickFoot")}{" "}
        <Link to="/request" className="text-foreground underline decoration-border underline-offset-2">
          {t("quickFootLink")}
        </Link>
        .
      </p>
    </section>
  );
}
