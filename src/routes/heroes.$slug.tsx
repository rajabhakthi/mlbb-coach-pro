import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { heroBySlug, heroes } from "@/lib/mlbb-data";
import { ArrowLeft, ChevronDown, Sparkles, Sword, Users } from "lucide-react";

export const Route = createFileRoute("/heroes/$slug")({
  loader: ({ params }) => {
    const hero = heroBySlug(params.slug);
    if (!hero) throw notFound();
    return { hero };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.hero.name ?? "Hero"} — MLBB Knowledge` },
      { name: "description", content: loaderData?.hero.tagline ?? "Hero details" },
      { property: "og:title", content: `${loaderData?.hero.name ?? "Hero"} — MLBB Knowledge` },
      { property: "og:description", content: loaderData?.hero.tagline ?? "Hero details" },
    ],
  }),
  notFoundComponent: () => (
    <AppShell><Section><p className="text-sm">Hero not found. <Link to="/heroes" className="text-[var(--gold)] underline">Back to heroes</Link></p></Section></AppShell>
  ),
  errorComponent: ({ error }) => (
    <AppShell><Section><p className="text-sm text-red-400">{error.message}</p></Section></AppShell>
  ),
  component: HeroDetail,
});

function HeroDetail() {
  const { slug } = Route.useParams();
  const hero = heroBySlug(slug)!;
  const [build, setBuild] = useState(hero.builds[0].name);
  const [openSkill, setOpenSkill] = useState<number | null>(0);
  const activeBuild = hero.builds.find((b) => b.name === build)!;

  return (
    <AppShell>
      {/* Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-60" style={{ background: hero.accent }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div className="relative px-4 lg:px-10 pt-6 lg:pt-10 pb-6">
          <Link to="/heroes" className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> All heroes
          </Link>
          <div className="flex items-end gap-5 flex-wrap">
            <HeroPortrait name={hero.name} accent={hero.accent} size={120} rounded="rounded-2xl" className="ring-2 ring-white/20" />
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/80 font-semibold">{hero.specialty}</p>
              <h1 className="font-display font-black text-4xl lg:text-6xl text-white drop-shadow-lg">{hero.name}</h1>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <Badge>{hero.role}</Badge>
                {hero.secondaryRole && <Badge>{hero.secondaryRole}</Badge>}
                <Badge>{hero.lane}</Badge>
                <Badge>{hero.difficulty}</Badge>
                <Badge className="bg-[var(--gold)] text-[var(--primary-foreground)] border-transparent">Tier {hero.tier}</Badge>
              </div>
              <p className="mt-2 text-sm italic text-white/80">"{hero.tagline}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section>
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Win Rate" value={`${hero.winRate}%`} color="var(--gold)" />
          <Stat label="Pick Rate" value={`${hero.pickRate}%`} color="var(--blue)" />
          <Stat label="Ban Rate" value={`${hero.banRate}%`} color="#ef4444" />
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <h2 className="font-display text-xl lg:text-2xl font-bold mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--gold)]" /> Skills
        </h2>
        <div className="space-y-2">
          {hero.skills.map((s, i) => {
            const open = openSkill === i;
            return (
              <button
                key={s.name}
                onClick={() => setOpenSkill(open ? null : i)}
                className="w-full card-premium p-4 text-left transition hover:border-[var(--gold)]/50"
              >
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center w-10 h-10 rounded-lg font-display font-bold text-sm" style={{ background: hero.accent, color: "white" }}>
                    {s.key}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold leading-tight">{s.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">CD {s.cooldown} · Cost {s.cost}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
                </div>
                {open && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2 animate-fade-in">
                    <p className="text-sm">{s.desc}</p>
                    <p className="text-xs text-[var(--gold)]"><strong>Tip:</strong> {s.tip}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Combo */}
      <Section>
        <h2 className="font-display text-xl lg:text-2xl font-bold mb-3">Skill Combo</h2>
        <div className="card-premium p-5">
          <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
            {hero.combo.map((step, i) => (
              <div key={i} className="flex items-center gap-2 lg:gap-3">
                <div className="px-3 py-2 rounded-lg glass border-border text-sm font-medium">{step}</div>
                {i < hero.combo.length - 1 && <span className="text-[var(--gold)]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Builds */}
      <Section>
        <h2 className="font-display text-xl lg:text-2xl font-bold mb-3 flex items-center gap-2">
          <Sword className="w-5 h-5 text-[var(--gold)]" /> Recommended Builds
        </h2>
        <div className="card-premium p-4 lg:p-5">
          <div className="flex gap-2 flex-wrap mb-4">
            {hero.builds.map((b) => (
              <button
                key={b.name}
                onClick={() => setBuild(b.name)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${build === b.name ? "border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]" : "border-border hover:border-[var(--blue)]"}`}
              >{b.name}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {activeBuild.items.map((it, i) => (
              <div key={i} className="card-premium p-2 text-center">
                <div className="aspect-square rounded-md mb-2" style={{ background: `linear-gradient(135deg, hsl(${(i * 50) % 360} 70% 55%), hsl(${(i * 50 + 60) % 360} 70% 35%))` }} />
                <p className="text-[10px] leading-tight text-muted-foreground line-clamp-2">{it}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Counters & Synergies */}
      <Section className="pb-12">
        <div className="grid lg:grid-cols-2 gap-4">
          <HeroList title="Counters" reason="These heroes punish their kit" heroSlugs={hero.counters} color="#ef4444" />
          <HeroList title="Best Teammates" reason="Excellent synergy in teamfights" heroSlugs={hero.synergies} color="var(--gold)" icon={<Users className="w-4 h-4" />} />
        </div>
      </Section>
    </AppShell>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/20 bg-black/30 text-white ${className}`}>{children}</span>;
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="card-premium p-4 text-center">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-2xl lg:text-3xl font-black mt-1" style={{ color }}>{value}</p>
    </div>
  );
}

function HeroList({ title, reason, heroSlugs, color, icon }: { title: string; reason: string; heroSlugs: string[]; color: string; icon?: React.ReactNode }) {
  return (
    <div className="card-premium p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-5 rounded-full" style={{ background: color }} />
        <h3 className="font-display font-bold">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{reason}</p>
      <div className="space-y-2">
        {heroSlugs.map((s) => {
          const h = heroes.find((x) => x.slug === s);
          if (!h) return null;
          return (
            <Link key={s} to="/heroes/$slug" params={{ slug: s }} className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5">
              <HeroPortrait name={h.name} accent={h.accent} size={40} rounded="rounded-lg" />
              <div className="min-w-0">
                <p className="font-medium truncate">{h.name}</p>
                <p className="text-[11px] text-muted-foreground">{h.role} · {h.lane}</p>
              </div>
              {icon && <span className="ml-auto text-muted-foreground">{icon}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
