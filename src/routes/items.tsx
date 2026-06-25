import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageHeader, Section } from "@/components/AppShell";
import { items, type Item } from "@/lib/mlbb-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/items")({
  head: () => ({
    meta: [
      { title: "Items — MLBB Knowledge" },
      { name: "description", content: "Searchable database of every MLBB item with passives, costs, and build paths." },
    ],
  }),
  component: ItemsPage,
});

const cats: ("All" | Item["category"])[] = ["All", "Attack", "Magic", "Defense", "Jungle", "Roam", "Movement"];

function ItemsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | Item["category"]>("All");
  const [active, setActive] = useState<Item | null>(null);

  const filtered = useMemo(() => items.filter((i) => {
    if (cat !== "All" && i.category !== cat) return false;
    if (q && !i.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, cat]);

  return (
    <AppShell>
      <PageHeader eyebrow="Item database" title="Items" subtitle="Every item, every passive. Tap any item for full details." />

      <Section>
        <div className="card-premium p-4 lg:p-5">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items..." className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${cat === c ? "border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]" : "border-border hover:border-[var(--blue)]"}`}>{c}</button>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {filtered.map((it) => (
            <button key={it.slug} onClick={() => setActive(it)} className="card-premium card-premium-hover p-3 text-left">
              <div className="aspect-square rounded-lg" style={{ background: it.accent }} />
              <p className="mt-2 font-display font-bold text-sm leading-tight">{it.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{it.category} · {it.cost}g</p>
            </button>
          ))}
        </div>
      </Section>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4 animate-fade-in" onClick={() => setActive(null)}>
          <div className="card-premium max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground text-xl leading-none">×</button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl" style={{ background: active.accent }} />
              <div className="min-w-0">
                <h3 className="font-display font-bold text-xl">{active.name}</h3>
                <p className="text-xs text-muted-foreground">{active.category} · {active.cost}g</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-1">Attributes</p>
                <ul className="text-sm space-y-1">
                  {active.attributes.map((a) => <li key={a}>· {a}</li>)}
                </ul>
              </div>
              {active.passive && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-1">Passive</p>
                  <p className="text-sm">{active.passive}</p>
                </div>
              )}
              {active.related && active.related.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-1">Related Items</p>
                  <div className="flex gap-2 flex-wrap">
                    {active.related.map((r) => <span key={r} className="text-xs px-2 py-1 rounded-full glass border-border">{r}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
