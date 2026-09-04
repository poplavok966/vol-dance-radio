import { SOCIAL_TINT, type ResidentLink } from "@/lib/residents";
import { cn } from "@/lib/cn";

export function SocialChip({ link }: { link: ResidentLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold text-primary-foreground",
        SOCIAL_TINT[link.type],
      )}
    >
      <img
        src={`/brands/${link.type}.svg`}
        alt=""
        className="size-3.5 brightness-0 invert"
      />
      {link.label}
    </a>
  );
}
