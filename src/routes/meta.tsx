import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { heroes, type Role, type Tier } from "@/lib/mlbb-data";

export const Route = createFileRoute("/meta")({
  head: () => ({
    meta: [
      { title: "Meta Tier List — MLBB Knowledge" },
      { name: "description", content: "Current MLBB tier list with hero rankings by patch and rank." },
    ],
  }),
  component: MetaPage,
});

const tiers: { name: Tier; color: string; desc: string }[] = [
  { name: "S+", color: "var(--tier-splus)", desc: "Game-warping. Pick or ban." },
  { name: "S", color: "var(--tier-s)", desc: "Top-tier in skilled hands." },
  { name: "A", color: "var(--tier-a)", desc: "Reliable and strong." },
  { name: "B", color: "var(--tier-b)", desc: "Situational but viable." },
  { name: "C", color: "var(--tier-c)", desc: "Off-meta picks." },
];

const allRoles: ("All" | Role)[] = ["All", "Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"];

function MetaPage() {
  const [role, setRole] = useState<"All" | Role>("All");

  const byTier = useMemo(() => {
    const filtered = role === "All" ? heroes : heroes.filter((h) => h.role === role || h.secondaryRole === role);
    return tiers.map((t) => ({ ...t, list: filtered.filter((h) => h.tier === t.name) }));
  }, [role]);

  return (
    <AppShell>
      <PageHeader eyebrow="Patch 1.9.20" title="Meta Tier List" subtitle="Curated rankings updated for the current patch. Filter by role to find your pick." />

      <Section>
        <div className="flex gap-2 flex-wrap">
          {allRoles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${role === r ? "border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]" : "border-border hover:border-[var(--blue)]"}`}
            >{r}</button>
          ))}
        </div>
      </Section>

      <Section className="pb-12 space-y-4">
        {byTier.map((t) => (
          <div key={t.name} className="card-premium overflow-hidden">
            <div className="flex">
              <div className="w-16 lg:w-24 shrink-0 grid place-items-center font-display font-black text-2xl lg:text-4xl text-background" style={{ background: t.color }}>
                {t.name}
              </div>
              <div className="flex-1 p-4">
                <p className="text-xs text-muted-foreground mb-3">{t.desc}</p>
                {t.list.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">No heroes in this tier with current filters.</p>
                ) : (
                  <div className="flex gap-3 flex-wrap">
                    {t.list.map((h) => (
                      <Link key={h.slug} to="/heroes/$slug" params={{ slug: h.slug }} className="flex items-center gap-2 rounded-lg p-1.5 pr-3 hover:bg-white/5 transition">
                        <HeroPortrait name={h.name} accent={h.accent} size={44} rounded="rounded-lg" />
                        <div>
                          <p className="font-medium text-sm">{h.name}</p>
                          <p className="text-[11px] text-muted-foreground">{h.role}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Section>
    </AppShell>
  );
}
