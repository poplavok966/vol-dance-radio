import { useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { sendTrackRequest } from "@/lib/radio-fn";
import { useI18n } from "@/lib/i18n";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function RequestDialog({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("requestDialogTitle")}</DialogTitle>
        <DialogDescription>{t("requestDialogLead")}</DialogDescription>
        <RequestFields onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export function RequestFields({ onDone }: { onDone?: () => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [track, setTrack] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const send = async () => {
    if (!track.trim()) return;
    setStatus("sending");
    setError("");
    try {
      await sendTrackRequest({ data: { name, track, message } });
      setStatus("sent");
      setName("");
      setTrack("");
      setMessage("");
      window.setTimeout(() => onDone?.(), 1200);
    } catch (e) {
      setStatus("error");
      const raw = e instanceof Error ? e.message : "";
      if (raw.includes("TRACK_REQUIRED")) setError(t("requestNeedTrack"));
      else if (raw.includes("RATE_LIMIT")) setError(t("requestWait"));
      else setError(t("requestFail"));
    }
  };

  if (status === "sent") {
    return <p className="py-8 text-center text-sm font-semibold">{t("requestThanks")}</p>;
  }

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
    >
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase">
          {t("requestName")}
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          placeholder={t("requestNamePh")}
          className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase">
          {t("requestTrackLabel")}
        </span>
        <textarea
          value={track}
          onChange={(e) => setTrack(e.target.value)}
          required
          rows={3}
          maxLength={200}
          placeholder="Artist — Title"
          className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase">
          {t("requestMsg")}
        </span>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={280}
          className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </label>
      {status === "error" && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex justify-end gap-2 pt-1">
        <Button type="submit" disabled={status === "sending" || !track.trim()}>
          {status === "sending" && <Loader2 className="size-4 animate-spin" />}
          {t("requestSend")}
        </Button>
      </div>
    </form>
  );
}
