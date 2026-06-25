import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Home, Sparkles, Users, TrendingUp, Swords, Shield, Wand2, Layers,
  Trophy, History, BookOpen, Compass, MessageCircle,
} from "lucide-react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/start-here", label: "Start Here", icon: Sparkles, highlight: true },
  { to: "/heroes", label: "Heroes", icon: Users },
  { to: "/meta", label: "Meta", icon: TrendingUp },
  { to: "/items", label: "Items", icon: Swords },
  { to: "/emblems", label: "Emblems", icon: Shield },
  { to: "/battle-spells", label: "Battle Spells", icon: Wand2 },
  { to: "/roles", label: "Roles", icon: Layers },
  { to: "/ranks", label: "Ranks", icon: Trophy },
  { to: "/patches", label: "Patches", icon: History },
  { to: "/guides", label: "Community Guides", icon: BookOpen },
] as const;

const soon = [
  { label: "Draft Assistant", icon: Compass },
  { label: "Community Chat", icon: MessageCircle },
] as const;

const mobileNav = nav.slice(0, 5);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border glass sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2 px-5 py-5 border-b border-border">
          <div className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--blue)] font-display font-black text-background">
            M
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold tracking-wide">MLBB</span>
            <span className="text-xs text-muted-foreground -mt-0.5">Knowledge</span>
          </div>
        </Link>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={[
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  active
                    ? "bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-foreground ring-1 ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                ].join(" ")}
              >
                <Icon className={`w-4 h-4 ${active ? "text-[var(--gold)]" : ""}`} />
                <span className="truncate">{item.label}</span>
                {item.highlight && !active && (
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-[var(--gold)]">New</span>
                )}
              </Link>
            );
          })}
          <div className="pt-4 mt-4 border-t border-border">
            <p className="px-3 text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">Coming Soon</p>
            {soon.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground/60">
                <s.icon className="w-4 h-4" />
                <span className="truncate">{s.label}</span>
              </div>
            ))}
          </div>
        </nav>
        <div className="px-4 py-3 border-t border-border text-[11px] text-muted-foreground/70">
          v1.0 · Community project
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-30 glass border-b border-border">
          <div className="flex items-center justify-between px-4 h-14">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid place-items-center w-8 h-8 rounded-md bg-gradient-to-br from-[var(--gold)] to-[var(--blue)] font-display font-black text-background text-sm">M</div>
              <span className="font-display font-bold tracking-wide">MLBB Knowledge</span>
            </Link>
            <Link to="/start-here" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--gold)] text-[var(--primary-foreground)]">
              Start
            </Link>
          </div>
        </header>

        <main className="flex-1 pb-20 lg:pb-10">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border">
          <div className="grid grid-cols-5">
            {mobileNav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to} className="flex flex-col items-center justify-center py-2.5 gap-1">
                  <Icon className={`w-5 h-5 ${active ? "text-[var(--gold)]" : "text-muted-foreground"}`} />
                  <span className={`text-[10px] ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, children }: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="px-4 lg:px-10 pt-6 lg:pt-10 pb-4 lg:pb-6">
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] mb-2 font-semibold">{eyebrow}</p>
      )}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="text-3xl lg:text-5xl font-display font-black text-gradient-gold leading-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-sm lg:text-base text-muted-foreground max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`px-4 lg:px-10 py-4 lg:py-6 ${className}`}>{children}</section>;
}
