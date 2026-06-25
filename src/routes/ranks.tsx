import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { ranks } from "@/lib/mlbb-data";

export const Route = createFileRoute("/ranks")({
  head: () => ({
    meta: [
      { title: "Ranks — MLBB Knowledge" },
      { name: "description", content: "Every MLBB rank from Warrior to Mythical Immortal — what it means and how to reach it." },
    ],
  }),
  component: RanksPage,
});

function RanksPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="The ladder" title="Ranks" subtitle="The climb from Warrior to Mythical Immortal. Each rank brings new expectations." />

      <Section className="pb-12">
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--gold)] via-[var(--blue)] to-transparent" />
          <ul className="space-y-4">
            {ranks.map((r, i) => (
              <li key={r.name} className="relative pl-16">
                <div className="absolute left-0 top-1 grid place-items-center w-12 h-12 rounded-2xl font-display font-black text-background shadow-[var(--shadow-glow-gold)]" style={{ background: r.color }}>
                  {i + 1}
                </div>
                <div className="card-premium p-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-lg">{r.name}</h3>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: r.color }}>Tier {i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </AppShell>
  );
}
