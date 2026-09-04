const GENRES = [
  'House',
  'Tech House',
  'Melodic Techno',
  'Progressive',
  'Indie Dance',
  'Electro House',
  'Trance',
  'Club Mix',
  'Peak Time',
  'Afterhours',
]

export function GenreRibbon() {
  const loop = [...GENRES, ...GENRES]
  return (
    <div className="relative overflow-hidden rounded-full border border-white/8 bg-white/3 py-2.5">
      <div className="vd-marquee flex w-max gap-8 pr-8">
        {loop.map((g, i) => (
          <span
            key={`${g}-${i}`}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-dim"
          >
            <span className="mr-8 text-brand">●</span>
            {g}
          </span>
        ))}
      </div>
    </div>
  )
}
