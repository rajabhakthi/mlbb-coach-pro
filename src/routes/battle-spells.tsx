import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { battleSpells, heroes, type BattleSpell } from "@/lib/mlbb-data";

export const Route = createFileRoute("/battle-spells")({
  head: () => ({
    meta: [
      { title: "Battle Spells — MLBB Knowledge" },
      { name: "description", content: "Every battle spell, when to use it, and which heroes benefit most." },
    ],
  }),
  component: BattleSpellsPage,
});

function BattleSpellsPage() {
  const [active, setActive] = useState<BattleSpell | null>(null);

  return (
    <AppShell>
      <PageHeader eyebrow="Active abilities" title="Battle Spells" subtitle="Battle spells are universal active abilities. Pick one that complements your hero kit." />

      <Section className="pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {battleSpells.map((s) => (
            <button key={s.slug} onClick={() => setActive(s)} className="card-premium card-premium-hover p-4 text-left">
              <div className="w-12 h-12 rounded-xl mb-3" style={{ background: s.accent }} />
              <p className="font-display font-bold">{s.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">CD {s.cooldown}</p>
            </button>
          ))}
        </div>
      </Section>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4 animate-fade-in" onClick={() => setActive(null)}>
          <div className="card-premium max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground text-xl leading-none">×</button>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl" style={{ background: active.accent }} />
              <div>
                <h3 className="font-display font-bold text-xl">{active.name}</h3>
                <p className="text-[11px] text-muted-foreground">CD {active.cooldown}</p>
              </div>
            </div>
            <p className="mt-4 text-sm">{active.description}</p>
            <p className="mt-3 text-xs text-[var(--gold)]"><strong>Tip:</strong> {active.tip}</p>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Recommended Heroes</p>
              <div className="flex gap-2 flex-wrap">
                {active.recommended.map((slug) => {
                  const h = heroes.find((x) => x.slug === slug);
                  if (!h) return null;
                  return (
                    <Link key={slug} to="/heroes/$slug" params={{ slug }} onClick={() => setActive(null)} className="flex items-center gap-2 rounded-full px-2 py-1 glass">
                      <HeroPortrait name={h.name} accent={h.accent} size={22} rounded="rounded-full" />
                      <span className="text-xs pr-1">{h.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
