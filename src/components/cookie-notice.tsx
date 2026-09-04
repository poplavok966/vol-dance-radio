import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Button } from "./ui/button";

const KEY = "vd_cookie_ok";

export function CookieNotice() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(localStorage.getItem(KEY) !== "1");
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-24 z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted sm:text-sm">
          {t("cookie")}{" "}
          <Link to="/privacy" className="text-foreground underline decoration-border underline-offset-2">
            {t("cookieLink")}
          </Link>
        </p>
        <Button
          size="sm"
          className="shrink-0"
          onClick={() => {
            localStorage.setItem(KEY, "1");
            setShow(false);
          }}
        >
          {t("cookieOk")}
        </Button>
      </div>
    </div>
  );
}
