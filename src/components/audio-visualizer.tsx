import { useRadio } from "./radio-provider";
import { cn } from "@/lib/cn";

const BARS = 48;

export function AudioVisualizer() {
  const { isPlaying } = useRadio();
  return (
    <div
      className={cn("vd-eq flex h-16 w-full items-end gap-px overflow-hidden sm:h-20", isPlaying && "on")}
      aria-hidden
    >
      {Array.from({ length: BARS }).map((_, i) => (
        <i
          key={i}
          className="min-h-1 flex-1"
          style={{ animationDelay: `${(i % 9) * 0.07}s` }}
        />
      ))}
    </div>
  );
}
