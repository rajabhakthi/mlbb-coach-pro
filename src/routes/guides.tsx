import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { guides, type Guide } from "@/lib/mlbb-data";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Community Guides — MLBB Knowledge" },
      { name: "description", content: "Curated MLBB guides on heroes, macro strategy, drafting, and climbing ranked." },
    ],
  }),
  component: GuidesPage,
});

const cats: ("All" | Guide["category"])[] = ["All", "Beginner Guides", "Hero Guides", "Macro Strategy", "Draft Strategy", "Ranked Climbing"];

function GuidesPage() {
  const [cat, setCat] = useState<"All" | Guide["category"]>("All");
  const filtered = cat === "All" ? guides : guides.filter((g) => g.category === cat);

  return (
    <AppShell>
      <PageHeader eyebrow="Learn from the community" title="Community Guides" subtitle="Bite-sized articles to level up your game. More coming soon." />

      <Section>
        <div className="flex gap-2 flex-wrap">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${cat === c ? "border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]" : "border-border hover:border-[var(--blue)]"}`}>{c}</button>
          ))}
        </div>
      </Section>

      <Section className="pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((g) => (
            <article key={g.slug} className="card-premium card-premium-hover p-5 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-30 blur-2xl" style={{ background: g.accent }} />
              <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-semibold">{g.category}</p>
              <h3 className="font-display font-bold text-lg mt-2 leading-tight">{g.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{g.excerpt}</p>
              <p className="text-[11px] text-muted-foreground mt-4">{g.readTime} read</p>
            </article>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
