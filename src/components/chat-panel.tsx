import { MessagesSquare } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CBOX_SRC } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

export function ChatPanel() {
  const { t } = useI18n();
  return (
    <section id="chat" className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
        <MessagesSquare className="size-4 text-primary" />
        {t("chatTitle")}
      </h2>
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <iframe
          title={t("chatIframe")}
          src={CBOX_SRC}
          className="block h-80 w-full border-0"
        />
      </div>
      <p className="mt-3 text-xs text-muted">
        {t("chatFoot")}{" "}
        <Link to="/rules" className="underline decoration-border underline-offset-2">
          {t("chatRules")}
        </Link>
        .
      </p>
    </section>
  );
}
