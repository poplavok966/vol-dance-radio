import { useTheme } from "./theme-provider";
import { useI18n } from "@/lib/i18n";

export function RequestWidget() {
  const { theme } = useTheme();
  const { locale, t } = useI18n();

  return (
    <iframe
      title={t("requestCatalog")}
      src={`/request-embed.html?theme=${theme}&lang=${locale}`}
      className="h-[70vh] min-h-96 w-full rounded-lg border border-primary/40 bg-secondary"
    />
  );
}
