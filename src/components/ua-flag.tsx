export function UaFlag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex overflow-hidden rounded-[2px] ${className}`}
      aria-hidden
    >
      <span className="flex h-3 w-4 flex-col">
        <span className="h-1.5 bg-[#0057b7]" />
        <span className="h-1.5 bg-[#ffd700]" />
      </span>
    </span>
  );
}
