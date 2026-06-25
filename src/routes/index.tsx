import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { heroes, patches } from "@/lib/mlbb-data";
import { ArrowRight, Flame, Shield, Sparkles, Swords, TrendingUp, Trophy, Wand2, BookOpen, Compass } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MLBB Knowledge — Everything Mobile Legends in one place" },
      { name: "description", content: "Heroes, builds, counters, items, rankings, and improvement guides. The premium MLBB knowledge hub." },
      { property: "og:title", content: "MLBB Knowledge" },
      { property: "og:description", content: "Heroes, builds, counters, items, rankings, and improvement guides." },
    ],
  }),
  component: HomePage,
});

const quickAccess = [
  { to: "/start-here", label: "Start Here", desc: "Get a personal plan", icon: Sparkles, accent: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { to: "/heroes", label: "Heroes", desc: "Browse every hero", icon: Swords, accent: "linear-gradient(135deg,#7c3aed,#0ea5e9)" },
  { to: "/meta", label: "Meta Tier List", desc: "Current rankings", icon: TrendingUp, accent: "linear-gradient(135deg,#22d3ee,#a78bfa)" },
  { to: "/items", label: "Items", desc: "Build smarter", icon: Swords, accent: "linear-gradient(135deg,#ef4444,#f59e0b)" },
  { to: "/emblems", label: "Emblems", desc: "Talent setups", icon: Shield, accent: "linear-gradient(135deg,#10b981,#22d3ee)" },
  { to: "/battle-spells", label: "Battle Spells", desc: "Spell guide", icon: Wand2, accent: "linear-gradient(135deg,#facc15,#f97316)" },
  { to: "/patches", label: "Patch Notes", desc: "What changed", icon: BookOpen, accent: "linear-gradient(135deg,#ec4899,#8b5cf6)" },
  { to: "/ranks", label: "Ranks", desc: "Climb the ladder", icon: Trophy, accent: "linear-gradient(135deg,#f59e0b,#facc15)" },
] as const;

function HomePage() {
  const trending = {
    picked: [...heroes].sort((a, b) => b.pickRate - a.pickRate).slice(0, 4),
    winrate: [...heroes].sort((a, b) => b.winRate - a.winRate).slice(0, 4),
    banned: [...heroes].sort((a, b) => b.banRate - a.banRate).slice(0, 4),
  };
  const latestPatch = patches[0];

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: "var(--bg-gradient-hero)" }} />
        <div className="px-4 lg:px-10 pt-10 lg:pt-20 pb-12 lg:pb-20 max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--gold)] font-semibold mb-3">
            <Flame className="inline w-3 h-3 mr-1.5 -mt-0.5" /> Premium MLBB companion
          </p>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl leading-[1.05]">
            Everything <span className="text-gradient-gold">MLBB</span><br /> in One Place
          </h1>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground max-w-2xl">
            Heroes, builds, counters, items, rankings, and improvement guides — designed for both new players and Mythic grinders.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/start-here" className="group inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--primary-foreground)] font-semibold px-5 py-3 text-sm shadow-[var(--shadow-glow-gold)] hover:brightness-110 transition">
              <Sparkles className="w-4 h-4" /> Start Learning
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/heroes" className="inline-flex items-center gap-2 rounded-full glass border-border font-semibold px-5 py-3 text-sm hover:border-[var(--blue)] transition">
              Browse Heroes
            </Link>
          </div>
        </div>
      </section>

      {/* Quick access */}
      <Section>
        <h2 className="font-display text-xl lg:text-2xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {quickAccess.map((q) => (
            <Link key={q.to} to={q.to} className="card-premium card-premium-hover p-4 group relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-30 blur-2xl group-hover:opacity-60 transition" style={{ background: q.accent }} />
              <div className="grid place-items-center w-10 h-10 rounded-lg mb-3" style={{ background: q.accent }}>
                <q.icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-display font-bold">{q.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{q.desc}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Trending */}
      <Section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-xl lg:text-2xl font-bold">Trending Heroes</h2>
          <Link to="/meta" className="text-xs text-[var(--gold)] font-semibold hover:underline">View tier list →</Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {([
            { title: "Most Picked", color: "var(--blue)", list: trending.picked, metric: (h: typeof heroes[number]) => `${h.pickRate}%` },
            { title: "Highest Win Rate", color: "var(--gold)", list: trending.winrate, metric: (h: typeof heroes[number]) => `${h.winRate}%` },
            { title: "Most Banned", color: "#ef4444", list: trending.banned, metric: (h: typeof heroes[number]) => `${h.banRate}%` },
          ]).map((col) => (
            <div key={col.title} className="card-premium p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-5 rounded-full" style={{ background: col.color }} />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider">{col.title}</h3>
              </div>
              <ul className="space-y-2">
                {col.list.map((h, i) => (
                  <li key={h.slug}>
                    <Link to="/heroes/$slug" params={{ slug: h.slug }} className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5 transition">
                      <span className="text-xs text-muted-foreground w-4 text-center">{i + 1}</span>
                      <HeroPortrait name={h.name} accent={h.accent} size={40} rounded="rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{h.name}</p>
                        <p className="text-[11px] text-muted-foreground">{h.role} · {h.lane}</p>
                      </div>
                      <span className="text-sm font-display font-bold" style={{ color: col.color }}>{col.metric(h)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Meta snapshot */}
      <Section>
        <div className="card-premium p-5 lg:p-7 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gold)" }} />
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">Current Meta · Patch {latestPatch.version}</p>
          <div className="mt-2 flex items-end justify-between gap-4 flex-wrap">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">{latestPatch.summary}</h2>
            <Link to="/patches" className="text-xs text-muted-foreground hover:text-foreground">{latestPatch.date} →</Link>
          </div>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">Buffed</p>
              <div className="flex gap-2 flex-wrap">
                {latestPatch.buffed.map((s) => {
                  const h = heroes.find((x) => x.slug === s);
                  if (!h) return null;
                  return (
                    <Link key={s} to="/heroes/$slug" params={{ slug: s }} className="flex items-center gap-2 rounded-full px-2 py-1 glass">
                      <HeroPortrait name={h.name} accent={h.accent} size={24} rounded="rounded-full" />
                      <span className="text-xs font-medium pr-1">{h.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-red-400 font-semibold mb-2">Nerfed</p>
              <div className="flex gap-2 flex-wrap">
                {latestPatch.nerfed.map((s) => {
                  const h = heroes.find((x) => x.slug === s);
                  if (!h) return null;
                  return (
                    <Link key={s} to="/heroes/$slug" params={{ slug: s }} className="flex items-center gap-2 rounded-full px-2 py-1 glass">
                      <HeroPortrait name={h.name} accent={h.accent} size={24} rounded="rounded-full" />
                      <span className="text-xs font-medium pr-1">{h.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-12">
        <Link to="/start-here" className="block card-premium card-premium-hover p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--bg-gradient-hero)" }} />
          <div className="relative flex items-center gap-5 flex-wrap">
            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-[var(--gold)] text-[var(--primary-foreground)]">
              <Compass className="w-7 h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl lg:text-2xl font-bold">New to MLBB or feeling lost?</h3>
              <p className="text-sm text-muted-foreground mt-1">Pick your rank and get a personalized path to climb the next tier.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--gold)]" />
          </div>
        </Link>
      </Section>
    </AppShell>
  );
}
