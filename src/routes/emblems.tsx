import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { emblems, heroes } from "@/lib/mlbb-data";

export const Route = createFileRoute("/emblems")({
  head: () => ({
    meta: [
      { title: "Emblems — MLBB Knowledge" },
      { name: "description", content: "Emblem sets, effects, and best heroes for each setup." },
    ],
  }),
  component: EmblemsPage,
});

function EmblemsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Talent system" title="Emblems" subtitle="Each emblem set unlocks bonus stats and a powerful talent. Pick the one that scales with your hero." />

      <Section className="pb-12">
        <div className="grid sm:grid-cols-2 gap-4">
          {emblems.map((e) => (
            <div key={e.slug} className="card-premium p-5 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-30 blur-3xl" style={{ background: e.accent }} />
              <div className="flex items-center gap-3">
                <div className="grid place-items-center w-14 h-14 rounded-2xl font-display font-black text-white" style={{ background: e.accent }}>
                  {e.type[0]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">{e.name}</h3>
                  <p className="text-[11px] text-muted-foreground">{e.type}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-1">Effects</p>
                <ul className="text-sm space-y-1">{e.effects.map((x) => <li key={x}>· {x}</li>)}</ul>
              </div>
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-1">Best Heroes</p>
                <div className="flex gap-2 flex-wrap">
                  {e.bestFor.map((slug) => {
                    const h = heroes.find((x) => x.slug === slug);
                    if (!h) return null;
                    return (
                      <Link key={slug} to="/heroes/$slug" params={{ slug }} className="flex items-center gap-2 rounded-full px-2 py-1 glass">
                        <HeroPortrait name={h.name} accent={h.accent} size={22} rounded="rounded-full" />
                        <span className="text-xs pr-1">{h.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground italic">{e.recommendation}</p>
            </div>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
