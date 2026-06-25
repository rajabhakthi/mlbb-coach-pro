import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { HeroPortrait } from "@/components/HeroPortrait";
import { heroes, type Difficulty, type Lane, type Role } from "@/lib/mlbb-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/heroes/")({
  head: () => ({
    meta: [
      { title: "Heroes — MLBB Knowledge" },
      { name: "description", content: "Explore every Mobile Legends hero with builds, counters, and stats." },
    ],
  }),
  component: HeroesIndex,
});

const roles: Role[] = ["Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"];
const lanes: Lane[] = ["EXP", "Mid", "Jungle", "Gold", "Roam"];
const diffs: Difficulty[] = ["Easy", "Medium", "Hard"];

function HeroesIndex() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [lane, setLane] = useState<Lane | null>(null);
  const [diff, setDiff] = useState<Difficulty | null>(null);

  const filtered = useMemo(() => {
    return heroes.filter((h) => {
      if (q && !h.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (role && h.role !== role && h.secondaryRole !== role) return false;
      if (lane && h.lane !== lane) return false;
      if (diff && h.difficulty !== diff) return false;
      return true;
    });
  }, [q, role, lane, diff]);

  return (
    <AppShell>
      <PageHeader eyebrow="Hero database" title="Heroes" subtitle="Browse, filter, and dive into every hero in MLBB." />

      <Section>
        <div className="card-premium p-4 lg:p-5">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search heroes..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-4 space-y-2">
            <FilterRow label="Role" values={roles} current={role} setCurrent={setRole} />
            <FilterRow label="Lane" values={lanes} current={lane} setCurrent={setLane} />
            <FilterRow label="Difficulty" values={diffs} current={diff} setCurrent={setDiff} />
          </div>
        </div>
      </Section>

      <Section className="pb-12">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No heroes match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.map((h) => (
              <Link
                key={h.slug}
                to="/heroes/$slug"
                params={{ slug: h.slug }}
                className="card-premium card-premium-hover p-3 group"
              >
                <HeroPortrait name={h.name} accent={h.accent} size={140} className="w-full aspect-square" rounded="rounded-lg" />
                <div className="mt-3">
                  <p className="font-display font-bold leading-tight truncate">{h.name}</p>
                  <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground">{h.role}</span>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground">{h.lane}</span>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">{h.difficulty}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </AppShell>
  );
}

function FilterRow<T extends string>({ label, values, current, setCurrent }: {
  label: string; values: readonly T[]; current: T | null; setCurrent: (v: T | null) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground w-16">{label}</span>
      <button
        onClick={() => setCurrent(null)}
        className={`text-xs px-2.5 py-1 rounded-full border ${current === null ? "border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]" : "border-border hover:border-[var(--blue)]"}`}
      >All</button>
      {values.map((v) => (
        <button
          key={v}
          onClick={() => setCurrent(v)}
          className={`text-xs px-2.5 py-1 rounded-full border ${current === v ? "border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]" : "border-border hover:border-[var(--blue)]"}`}
        >{v}</button>
      ))}
    </div>
  );
}
