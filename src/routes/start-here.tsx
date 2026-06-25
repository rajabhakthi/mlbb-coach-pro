import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { heroes, ranks, startHerePlans } from "@/lib/mlbb-data";
import { ArrowRight, Check, Compass, Sparkles, Target } from "lucide-react";

export const Route = createFileRoute("/start-here")({
  head: () => ({
    meta: [
      { title: "Start Here — MLBB Knowledge" },
      { name: "description", content: "Personalized MLBB improvement plan based on your current rank." },
      { property: "og:title", content: "Start Here — MLBB Knowledge" },
      { property: "og:description", content: "Personalized MLBB improvement plan based on your current rank." },
    ],
  }),
  component: StartHerePage,
});

const rankOptions = Object.keys(startHerePlans);

function StartHerePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const plan = selected ? startHerePlans[selected] : null;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Personal coach"
        title="Start Here"
        subtitle="Tell us your current rank and we'll build a focused plan with heroes, lessons, and goals."
      />

      <Section>
        <div className="card-premium p-5 lg:p-7 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full opacity-25 blur-3xl" style={{ background: "var(--gold)" }} />
          <div className="flex items-center gap-3 mb-4">
            <Compass className="w-5 h-5 text-[var(--gold)]" />
            <p className="font-display font-bold">What is your current rank?</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {rankOptions.map((r) => {
              const rank = ranks.find((x) => x.name === r);
              const active = selected === r;
              return (
                <button
                  key={r}
                  onClick={() => setSelected(r)}
                  className={[
                    "rounded-xl px-3 py-3 text-sm font-medium text-left transition-all border",
                    active
                      ? "border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]"
                      : "border-border hover:border-[var(--blue)] bg-white/[0.02]",
                  ].join(" ")}
                >
                  <span className="block w-2.5 h-2.5 rounded-full mb-2" style={{ background: rank?.color }} />
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      {!plan && (
        <Section>
          <p className="text-sm text-muted-foreground">Pick your rank above to see your personalized plan.</p>
        </Section>
      )}

      {plan && selected && (
        <>
          <Section>
            <div className="card-premium p-5 lg:p-7 relative overflow-hidden animate-fade-in">
              <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full opacity-25 blur-3xl" style={{ background: "var(--blue)" }} />
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">Your Next Goal</p>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <h2 className="font-display text-2xl lg:text-4xl font-black">
                  {selected} <ArrowRight className="inline w-6 h-6 mx-1 text-muted-foreground" /> {plan.nextRank}
                </h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{ranks.find((r) => r.name === plan.nextRank)?.desc}</p>
            </div>
          </Section>

          <Section>
            <h3 className="font-display text-lg lg:text-xl font-bold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-[var(--gold)]" /> Focus Areas
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {plan.focus.map((f) => (
                <div key={f} className="card-premium p-4 flex gap-3 items-start">
                  <div className="grid place-items-center w-8 h-8 rounded-lg bg-[color-mix(in_oklab,var(--gold)_20%,transparent)] shrink-0">
                    <Check className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <p className="text-sm font-medium">{f}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <h3 className="font-display text-lg lg:text-xl font-bold mb-3">Recommended Heroes</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {plan.heroes.map((slug) => {
                const h = heroes.find((x) => x.slug === slug);
                if (!h) return null;
                return (
                  <Link key={slug} to="/heroes/$slug" params={{ slug }} className="card-premium card-premium-hover p-4 flex gap-3 items-center">
                    <HeroPortrait name={h.name} accent={h.accent} size={56} />
                    <div className="min-w-0">
                      <p className="font-display font-bold">{h.name}</p>
                      <p className="text-[11px] text-muted-foreground">{h.role} · {h.difficulty}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{h.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Section>

          <Section className="pb-12">
            <h3 className="font-display text-lg lg:text-xl font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--gold)]" /> Learning Modules
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {plan.modules.map((m, i) => (
                <div key={m.title} className="card-premium card-premium-hover p-5 relative overflow-hidden">
                  <span className="absolute right-3 top-3 text-xs text-muted-foreground/60 font-mono">0{i + 1}</span>
                  <p className="font-display font-bold">{m.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}
    </AppShell>
  );
}
