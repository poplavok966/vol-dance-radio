import { useEffect, useState } from "react";
import { Flame, Heart } from "lucide-react";
import { getReactions, voteReaction } from "@/lib/radio-fn";
import { useI18n } from "@/lib/i18n";
import { useRadio } from "./radio-provider";
import { cn } from "@/lib/cn";

type Kind = "fire" | "love";

function likeKey(track: string, kind: Kind) {
  return `vd_liked_${kind}::${track}`;
}

export function TrackReactions() {
  const { trackName } = useRadio();
  const { t } = useI18n();
  const [counts, setCounts] = useState({ fire: 0, love: 0 });
  const [liked, setLiked] = useState({ fire: false, love: false });
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let active = true;
    setLiked({
      fire: localStorage.getItem(likeKey(trackName, "fire")) === "1",
      love: localStorage.getItem(likeKey(trackName, "love")) === "1",
    });
    void getReactions({ data: { track: trackName } })
      .then((data) => {
        if (active) setCounts({ fire: data.fire ?? 0, love: data.love ?? 0 });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [trackName]);

  const react = async (kind: Kind) => {
    if (pending) return;
    const isLiked = liked[kind];
    setPending(true);
    setLiked((p) => ({ ...p, [kind]: !isLiked }));
    setCounts((p) => ({ ...p, [kind]: Math.max(0, p[kind] + (isLiked ? -1 : 1)) }));
    if (isLiked) localStorage.removeItem(likeKey(trackName, kind));
    else localStorage.setItem(likeKey(trackName, kind), "1");
    try {
      const data = await voteReaction({
        data: { track: trackName, kind, action: isLiked ? "remove" : "add" },
      });
      setCounts({ fire: data.fire ?? 0, love: data.love ?? 0 });
    } catch {
      /* optimistic */
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => void react("fire")}
        aria-pressed={liked.fire}
        aria-label={t("fire")}
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold",
          liked.fire
            ? "border-primary bg-primary/15 text-primary"
            : "border-border bg-secondary text-primary hover:border-primary/50",
        )}
      >
        <Flame className="size-4" />
        <span className="tabular-nums">{counts.fire}</span>
      </button>
      <button
        type="button"
        onClick={() => void react("love")}
        aria-pressed={liked.love}
        aria-label={t("love")}
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold",
          liked.love
            ? "border-destructive bg-destructive/15 text-destructive"
            : "border-border bg-secondary text-destructive hover:border-destructive/50",
        )}
      >
        <Heart className={cn("size-4", liked.love && "fill-current")} />
        <span className="tabular-nums">{counts.love}</span>
      </button>
    </div>
  );
}
