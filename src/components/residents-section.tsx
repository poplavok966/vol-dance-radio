import { RESIDENTS } from "@/lib/residents";
import { useI18n } from "@/lib/i18n";
import { SocialChip } from "./social-chip";

function Tags({ genres }: { genres: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {genres.map((g) => (
        <span
          key={g}
          className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-semibold"
        >
          {g}
        </span>
      ))}
    </div>
  );
}

export function ResidentsSection() {
  const { t } = useI18n();
  const featured = RESIDENTS.find((r) => r.featured)!;
  const rest = RESIDENTS.filter((r) => !r.featured);
  const copy = {
    alexx: { name: t("alexxName"), role: t("alexxRole"), bio: t("alexxBio") },
    lisima: { name: t("lisimaName"), role: t("lisimaRole"), bio: t("lisimaBio") },
    verum: { name: t("verumName"), role: t("verumRole"), bio: t("verumBio") },
    quasar: { name: t("quasarName"), role: t("quasarRole"), bio: t("quasarBio") },
  };

  return (
    <section id="residents" className="space-y-5">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
          {t("teamKicker")}
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-wide">
          {t("residentsTitle")} <span className="text-primary italic">VOL DANCE</span>
        </h2>
      </div>

      <article className="overflow-hidden rounded-xl border border-primary/35 bg-card">
        <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
          <div className="relative h-64 md:h-auto">
            <img
              src={featured.photo}
              alt={`${featured.name} — ${copy[featured.id as keyof typeof copy].name}`}
              className={`absolute inset-0 h-full w-full object-cover ${featured.objectPos}`}
            />
            <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-wider text-primary-foreground uppercase">
              {t("headliner")}
            </span>
          </div>
          <div className="p-5 sm:p-7">
            <h3 className="font-display text-3xl font-semibold tracking-wide">{featured.name}</h3>
            <p className="text-sm text-muted">{copy[featured.id as keyof typeof copy].name}</p>
            <p className="mt-1 text-xs font-semibold tracking-wide text-primary uppercase">
              {copy[featured.id as keyof typeof copy].role}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {copy[featured.id as keyof typeof copy].bio}
            </p>
            <Tags genres={featured.genres.map((g) => (g.includes("16") ? t("exp16") : g))} />
            <div className="mt-4 flex flex-wrap gap-2">
              {featured.links.map((l) => (
                <SocialChip key={l.href} link={l} />
              ))}
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-3">
        {rest.map((r) => (
          <article key={r.id} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative h-60">
              <img
                src={r.photo}
                alt={`${r.name} — ${copy[r.id as keyof typeof copy].name}`}
                className={`h-full w-full object-cover ${r.objectPos}`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-4 pt-12">
                <h3 className="font-display text-xl font-semibold tracking-wide">{r.name}</h3>
                <p className="text-[11px] font-semibold tracking-wide text-accent uppercase">
                  {copy[r.id as keyof typeof copy].role}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs text-muted">{copy[r.id as keyof typeof copy].name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {copy[r.id as keyof typeof copy].bio}
              </p>
              <Tags genres={r.genres} />
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {r.links.map((l) => (
                  <SocialChip key={l.href} link={l} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
