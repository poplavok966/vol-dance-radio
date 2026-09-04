import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { useI18n } from "@/lib/i18n";

export function RequestWidget() {
  const { theme } = useTheme();
  const { locale, t } = useI18n();
  const [height, setHeight] = useState(760);

  useEffect(() => {
    const onMsg = (event: MessageEvent) => {
      if (event.data?.type !== "vd-req-h") return;
      const next = Number(event.data.h);
      if (Number.isFinite(next) && next > 200) {
        setHeight(Math.min(Math.max(Math.round(next) + 12, 480), 2200));
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <iframe
      title={t("requestCatalog")}
      src={`/request-embed.html?theme=${theme}&lang=${locale}`}
      className="w-full overflow-hidden rounded-lg border border-primary/40 bg-secondary"
      style={{ height }}
    />
  );
}
