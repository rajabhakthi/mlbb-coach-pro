import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { heroes, patches } from "@/lib/mlbb-data";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/patches")({
  head: () => ({
    meta: [
      { title: "Patch Notes — MLBB Knowledge" },
      { name: "description", content: "Recent patch notes with buffs, nerfs, and meta-shifting changes." },
    ],
  }),
  component: PatchesPage,
});

function PatchesPage() {
  const [open, setOpen] = useState<string | null>(patches[0].version);
  return (
    <AppShell>
      <PageHeader eyebrow="Game history" title="Patch Notes" subtitle="Every patch matters. Stay ahead of the meta." />

      <Section className="pb-12 space-y-3">
        {patches.map((p) => {
          const isOpen = open === p.version;
          return (
            <div key={p.version} className="card-premium overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : p.version)} className="w-full p-5 text-left">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--blue)] text-background font-display font-black">
                    {p.version}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.date}</p>
                    <h3 className="font-display font-bold text-lg">{p.summary}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-border space-y-4 animate-fade-in">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <PatchHeroList title="Buffed" color="#10b981" slugs={p.buffed} />
                    <PatchHeroList title="Nerfed" color="#ef4444" slugs={p.nerfed} />
                  </div>
                  <p className="text-sm text-muted-foreground">{p.details}</p>
                </div>
              )}
            </div>
          );
        })}
      </Section>
    </AppShell>
  );
}

function PatchHeroList({ title, color, slugs }: { title: string; color: string; slugs: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-4 rounded-full" style={{ background: color }} />
        <p className="text-xs uppercase tracking-wider font-semibold" style={{ color }}>{title}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {slugs.length === 0 && <span className="text-xs text-muted-foreground italic">None</span>}
        {slugs.map((s) => {
          const h = heroes.find((x) => x.slug === s);
          if (!h) return null;
          return (
            <Link key={s} to="/heroes/$slug" params={{ slug: s }} className="flex items-center gap-2 rounded-full px-2 py-1 glass">
              <HeroPortrait name={h.name} accent={h.accent} size={22} rounded="rounded-full" />
              <span className="text-xs pr-1">{h.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
