import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function LegalDoc({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <article className="mb-12 rounded-xl border border-border bg-card p-6 sm:p-10">
      <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">{kicker}</p>
      <h1 className="font-display mt-2 text-3xl font-semibold tracking-wide sm:text-4xl">{title}</h1>
      <p className="mt-2 text-xs text-muted">{t("legalUpdated", { date: updated })}</p>
      <div className="legal-body mt-8 space-y-4 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-wide [&_h2]:text-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-2 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
      <p className="mt-10 text-sm">
        <Link to="/" className="text-primary">
          {t("legalHome")}
        </Link>
      </p>
    </article>
  );
}
