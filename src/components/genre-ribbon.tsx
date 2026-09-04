const GENRES = [
  "House",
  "Tech House",
  "Melodic Techno",
  "Progressive",
  "Indie Dance",
  "Electro House",
  "Trance",
  "Club Mix",
  "Peak Time",
];

export function GenreRibbon() {
  const loop = [...GENRES, ...GENRES];
  return (
    <div className="overflow-hidden rounded-full border border-border bg-secondary py-2.5">
      <div className="vd-marquee flex w-max gap-8 pr-8">
        {loop.map((g, i) => (
          <span
            key={`${g}-${i}`}
            className="text-[11px] font-semibold tracking-[0.24em] text-muted uppercase"
          >
            <span className="mr-8 text-primary">●</span>
            {g}
          </span>
        ))}
      </div>
    </div>
  );
}
