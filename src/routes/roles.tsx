import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { heroes, roles } from "@/lib/mlbb-data";

export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: "Roles — MLBB Knowledge" },
      { name: "description", content: "MLBB roles explained: strengths, weaknesses, and recommended heroes." },
    ],
  }),
  component: RolesPage,
});

function RolesPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Hero classes" title="Roles" subtitle="Every hero fills a role. Understand what each one does to draft and play better." />

      <Section className="pb-12 space-y-4">
        {roles.map((r) => (
          <div key={r.slug} className="card-premium p-5 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-25 blur-3xl" style={{ background: r.accent }} />
            <div className="flex items-start gap-4 flex-wrap">
              <div className="grid place-items-center w-14 h-14 rounded-2xl font-display font-black text-white shrink-0" style={{ background: r.accent }}>
                {r.slug[0]}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display font-bold text-2xl">{r.slug}</h2>
                <p className="text-sm text-muted-foreground mt-1">{r.description}</p>

                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 mb-1">Strengths</p>
                    <p className="text-sm">{r.strengths.join(" · ")}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-red-400 mb-1">Weaknesses</p>
                    <p className="text-sm">{r.weaknesses.join(" · ")}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-1">Best Emblem</p>
                  <p className="text-sm">{r.bestEmblem}</p>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-2">Recommended Heroes</p>
                  <div className="flex gap-2 flex-wrap">
                    {r.recommended.map((slug) => {
                      const h = heroes.find((x) => x.slug === slug);
                      if (!h) return null;
                      return (
                        <Link key={slug} to="/heroes/$slug" params={{ slug }} className="flex items-center gap-2 rounded-lg p-1.5 pr-3 hover:bg-white/5">
                          <HeroPortrait name={h.name} accent={h.accent} size={36} rounded="rounded-md" />
                          <span className="text-sm">{h.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Section>
    </AppShell>
  );
}
