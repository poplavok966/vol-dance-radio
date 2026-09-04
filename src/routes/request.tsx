import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { RequestFields } from "@/components/request-form";
import { RequestWidget } from "@/components/request-widget";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/request")({ component: RequestPage });

function RequestPage() {
  const { t } = useI18n();
  return (
    <AppShell>
      <section className="mb-10 space-y-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
            {t("requestKicker")}
          </p>
          <h1 className="font-display mt-1 text-4xl font-semibold tracking-wide">
            {t("requestTitle")}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {t("requestLead")}{" "}
            <Link to="/rules" className="text-foreground underline decoration-border underline-offset-2">
              {t("requestRules")}
            </Link>
            .
          </p>
        </div>
        <RequestWidget />
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold tracking-wide">{t("requestShort")}</h2>
          <p className="mt-1 text-sm text-muted">{t("requestShortLead")}</p>
          <RequestFields />
        </div>
      </section>
    </AppShell>
  );
}
