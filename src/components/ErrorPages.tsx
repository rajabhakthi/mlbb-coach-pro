import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Home, RotateCw, Swords, Zap } from "lucide-react";

/* ---------------------------------------------------------------- *
 * Shared shell                                                      *
 * ---------------------------------------------------------------- */
function ErrorShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-5 py-12">
      {/* ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: "var(--bg-gradient-hero)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* floating orbs */}
      <span
        className="pointer-events-none absolute -left-24 top-1/4 w-72 h-72 rounded-full blur-3xl opacity-30 animate-float"
        style={{ background: "var(--blue)" }}
      />
      <span
        className="pointer-events-none absolute -right-24 bottom-10 w-72 h-72 rounded-full blur-3xl opacity-25 animate-float"
        style={{ background: "var(--gold)", animationDelay: "1.5s" }}
      />
      <div className="w-full max-w-lg text-center animate-fade-in">{children}</div>
    </main>
  );
}

/* ---------------------------------------------------------------- *
 * 404 — Lost hero recalling                                         *
 * ---------------------------------------------------------------- */
export function NotFoundPage() {
  return (
    <ErrorShell>
      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)] font-semibold mb-3">
        <Swords className="inline w-3 h-3 mr-1.5 -mt-0.5" /> Land of Dawn
      </p>

      <h1 className="font-display font-black text-[6.5rem] sm:text-[8rem] leading-none text-gradient-gold drop-shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_45%,transparent)]">
        404
      </h1>

      <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold">
        Lost in the Land of Dawn
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        Your hero mis-recalled and this page respawned somewhere else. Probably the enemy jungle.
      </p>

      <LostHeroScene />

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--primary-foreground)] font-semibold px-5 py-3 text-sm shadow-[var(--shadow-glow-gold)] hover:brightness-110 transition"
        >
          <Home className="w-4 h-4" /> Back to Base
        </Link>
        <Link
          to="/heroes"
          className="inline-flex items-center gap-2 rounded-full glass border-border font-semibold px-5 py-3 text-sm hover:border-[var(--blue)] transition"
        >
          <Swords className="w-4 h-4" /> Browse Heroes
        </Link>
      </div>

      <SceneStyles />
    </ErrorShell>
  );
}

function LostHeroScene() {
  return (
    <div
      className="relative mx-auto mt-8 h-56 w-full max-w-sm rounded-2xl overflow-hidden card-premium"
      aria-hidden="true"
    >
      {/* ground */}
      <div
        className="absolute inset-x-0 bottom-0 h-16"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in oklab, var(--blue) 25%, transparent))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }}
      />

      {/* portal — destination */}
      <div className="absolute right-6 bottom-8 grid place-items-center">
        <div className="portal" />
        <span className="text-[9px] uppercase tracking-widest text-[var(--gold)] mt-1 font-semibold">
          recall
        </span>
      </div>

      {/* wandering hero (going the WRONG way) */}
      <div className="hero-wander">
        <div className="hero-body">
          {/* cape */}
          <span className="cape" />
          {/* head */}
          <span className="head" />
          {/* torso */}
          <span className="torso" />
          {/* sword */}
          <span className="sword" />
          {/* legs */}
          <span className="legs" />
        </div>
        {/* ? bubble */}
        <span className="bubble">?</span>
      </div>

      {/* tiny minions cheering */}
      <span className="minion minion-a" />
      <span className="minion minion-b" />
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Generic error — hero short-circuiting a turret                    *
 * ---------------------------------------------------------------- */
export function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const id =
    typeof error?.message === "string" && error.message.length > 0
      ? error.message.slice(0, 80)
      : "unknown";

  return (
    <ErrorShell>
      <p className="text-[11px] uppercase tracking-[0.3em] text-red-400 font-semibold mb-3">
        <Zap className="inline w-3 h-3 mr-1.5 -mt-0.5" /> Glitch in the Rift
      </p>

      <h1 className="font-display font-black text-3xl sm:text-4xl">
        Something went <span className="text-gradient-gold">wrong</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        A glitch in the rift — that didn't load right. Our minions are already on it.
      </p>

      <ZapScene />

      <p className="mt-4 text-[11px] text-muted-foreground/70 font-mono truncate">
        ref: {id}
      </p>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--primary-foreground)] font-semibold px-5 py-3 text-sm shadow-[var(--shadow-glow-gold)] hover:brightness-110 transition"
        >
          <RotateCw className="w-4 h-4 transition group-hover:rotate-180" /> Try again
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full glass border-border font-semibold px-5 py-3 text-sm hover:border-[var(--blue)] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <SceneStyles />
    </ErrorShell>
  );
}

function ZapScene() {
  return (
    <div
      className="relative mx-auto mt-8 h-56 w-full max-w-sm rounded-2xl overflow-hidden card-premium"
      aria-hidden="true"
    >
      {/* ground */}
      <div
        className="absolute inset-x-0 bottom-0 h-16"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in oklab, var(--gold) 18%, transparent))",
        }}
      />

      {/* turret */}
      <div className="turret">
        <span className="turret-base" />
        <span className="turret-pole" />
        <span className="turret-head" />
        <span className="turret-eye" />
      </div>

      {/* cable */}
      <span className="cable" />

      {/* gremlin biting cable */}
      <div className="gremlin">
        <span className="g-body" />
        <span className="g-eye" />
        <span className="g-tooth" />
        {/* zap bolts */}
        <span className="bolt bolt-1">⚡</span>
        <span className="bolt bolt-2">⚡</span>
        <span className="bolt bolt-3">✦</span>
      </div>

      {/* error label */}
      <span className="err-label">SYSTEM.OVERLOAD</span>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Scene styles (scoped via unique classnames)                       *
 * ---------------------------------------------------------------- */
function SceneStyles() {
  return (
    <style>{`
      /* ===== 404 scene ===== */
      .portal {
        width: 54px; height: 70px; border-radius: 50%;
        background: radial-gradient(closest-side, color-mix(in oklab, var(--gold) 70%, transparent), transparent 70%);
        box-shadow: 0 0 30px color-mix(in oklab, var(--gold) 60%, transparent);
        animation: portal-pulse 2.2s ease-in-out infinite;
      }
      @keyframes portal-pulse {
        0%, 100% { transform: scale(1); opacity: .9; }
        50%      { transform: scale(1.08); opacity: 1; }
      }

      .hero-wander {
        position: absolute; bottom: 20px; left: 0;
        animation: wander 7s ease-in-out infinite;
        transform-origin: bottom center;
      }
      @keyframes wander {
        0%   { transform: translateX(40px)  scaleX(-1); }
        45%  { transform: translateX(220px) scaleX(-1); }
        50%  { transform: translateX(220px) scaleX( 1); }   /* turn around */
        95%  { transform: translateX(40px)  scaleX( 1); }
        100% { transform: translateX(40px)  scaleX(-1); }
      }

      .hero-body { position: relative; width: 36px; height: 56px; animation: bob .55s ease-in-out infinite; }
      @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }

      .head  { position:absolute; top:0; left:10px; width:16px; height:16px; border-radius:50%;
               background: linear-gradient(180deg,#ffe4a8,#f0b860); box-shadow: 0 0 0 2px color-mix(in oklab, var(--gold) 60%, transparent); }
      .torso { position:absolute; top:15px; left:6px; width:24px; height:22px; border-radius:6px;
               background: linear-gradient(180deg, color-mix(in oklab, var(--blue) 70%, #0b1530), #0b1530); }
      .legs  { position:absolute; top:36px; left:8px; width:20px; height:14px; border-radius:0 0 6px 6px;
               background: #1b2a48; }
      .cape  { position:absolute; top:14px; left:-2px; width:14px; height:30px; border-radius:50% 10% 50% 10%;
               background: linear-gradient(180deg, var(--gold), #b8860b); transform-origin: top right;
               animation: flap .8s ease-in-out infinite; opacity:.95; }
      @keyframes flap { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(8deg); } }
      .sword { position:absolute; top:18px; right:-8px; width:3px; height:28px; border-radius:2px;
               background: linear-gradient(180deg,#fff, #94a3b8); box-shadow: 0 0 8px rgba(255,255,255,.4); }

      .bubble {
        position:absolute; top:-18px; right:-14px;
        width:22px; height:22px; border-radius:50% 50% 50% 4px;
        background:#fff; color:#0b1530; font-weight:900; font-size:13px;
        display:grid; place-items:center;
        animation: bubble-pop 2.2s ease-in-out infinite;
      }
      @keyframes bubble-pop {
        0%,80%,100% { transform: scale(1); opacity: 1; }
        85%         { transform: scale(1.25) rotate(-6deg); opacity: 1; }
        90%         { transform: scale(.9); opacity: .7; }
      }

      .minion {
        position:absolute; bottom:18px; width:10px; height:14px; border-radius:4px 4px 2px 2px;
        background: linear-gradient(180deg,#ef4444,#7f1d1d);
        box-shadow: inset 0 -3px 0 rgba(0,0,0,.3);
        animation: hop 1.1s ease-in-out infinite;
      }
      .minion::after {
        content:""; position:absolute; top:3px; left:2px; width:6px; height:2px; background:#fde68a; border-radius:2px;
      }
      .minion-a { right: 80px; animation-delay: .1s; }
      .minion-b { right: 64px; animation-delay: .5s; height:12px; }
      @keyframes hop { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

      /* ===== Error scene ===== */
      .turret { position:absolute; right:34px; bottom:14px; width:60px; height:120px; }
      .turret-base { position:absolute; bottom:0; left:6px; width:48px; height:14px; border-radius:6px;
                     background: linear-gradient(180deg,#475569,#1f2937); box-shadow: inset 0 -3px 0 rgba(0,0,0,.4); }
      .turret-pole { position:absolute; bottom:12px; left:26px; width:8px; height:60px; background:#334155; border-radius:3px; }
      .turret-head { position:absolute; top:10px; left:6px; width:48px; height:38px; border-radius:10px;
                     background: linear-gradient(180deg,#64748b,#1e293b); box-shadow: inset 0 -4px 0 rgba(0,0,0,.4);
                     animation: turret-shake .25s ease-in-out infinite; animation-play-state: paused; }
      .turret-eye  { position:absolute; top:24px; left:22px; width:14px; height:8px; border-radius:50%;
                     background: var(--gold); box-shadow: 0 0 12px var(--gold);
                     animation: eye-flicker 2.6s ease-in-out infinite; }
      @keyframes eye-flicker {
        0%, 60%, 100% { background: var(--gold); box-shadow: 0 0 12px var(--gold); }
        65%, 75%      { background: #ef4444; box-shadow: 0 0 16px #ef4444; }
      }
      @keyframes turret-shake {
        0%,100% { transform: translateX(0); }
        25%     { transform: translateX(-1px) rotate(-1deg); }
        75%     { transform: translateX(1px)  rotate(1deg); }
      }
      .turret:has(.bolt-1) .turret-head { /* zap state via sibling timing trick below */ }

      .cable {
        position:absolute; left:78px; bottom:28px; width:140px; height:6px; border-radius:3px;
        background: linear-gradient(90deg,#0f172a,#1f2937,#0f172a);
        transform-origin: right center;
        animation: cable-jolt 2.6s ease-in-out infinite;
      }
      @keyframes cable-jolt {
        0%,60%,100% { transform: rotate(0); filter: none; }
        65%, 75%    { transform: rotate(-1.5deg); filter: drop-shadow(0 0 6px #fde68a); }
      }

      .gremlin {
        position:absolute; left:52px; bottom:18px; width:46px; height:38px;
        animation: gremlin-bounce 2.6s ease-in-out infinite;
      }
      @keyframes gremlin-bounce {
        0%, 60%, 100% { transform: translateY(0); }
        65%, 75%      { transform: translateY(-6px) rotate(-4deg); }
        80%           { transform: translateY(2px); }
      }
      .g-body  { position:absolute; inset:6px 4px 0 4px; border-radius:50% 50% 40% 40%;
                 background: linear-gradient(180deg,#7c3aed,#3b0764); box-shadow: inset 0 -4px 0 rgba(0,0,0,.35); }
      .g-eye   { position:absolute; top:14px; left:14px; width:8px; height:8px; border-radius:50%; background:#fff; }
      .g-eye::after { content:""; position:absolute; top:2px; left:2px; width:4px; height:4px; border-radius:50%; background:#0b1530; }
      .g-tooth { position:absolute; bottom:6px; right:8px; width:8px; height:6px; border-radius:0 0 4px 4px;
                 background:#fde68a; box-shadow: 0 0 6px rgba(253,230,138,.6); }

      .bolt {
        position:absolute; color:#fde68a; font-weight:900;
        text-shadow: 0 0 10px #fde68a, 0 0 18px #f59e0b;
        opacity:0;
      }
      .bolt-1 { top:-6px;  left:30px; font-size:18px; animation: bolt 2.6s ease-in-out infinite; }
      .bolt-2 { top:-2px;  left:14px; font-size:14px; animation: bolt 2.6s ease-in-out infinite .08s; }
      .bolt-3 { top:-10px; left:46px; font-size:12px; animation: bolt 2.6s ease-in-out infinite .04s; color:#fff; text-shadow: 0 0 8px #fff; }
      @keyframes bolt {
        0%, 60%, 100% { opacity: 0; transform: translateY(0) scale(.7); }
        65%           { opacity: 1; transform: translateY(-2px) scale(1.1); }
        75%           { opacity: .9; transform: translateY(-4px) scale(1); }
      }

      .err-label {
        position:absolute; top:10px; left:12px; font-family: var(--font-display);
        font-size:9px; letter-spacing:.25em; color: color-mix(in oklab, #ef4444 80%, #fff);
        padding:3px 8px; border-radius: 999px;
        background: color-mix(in oklab, #ef4444 18%, transparent);
        border: 1px solid color-mix(in oklab, #ef4444 40%, transparent);
        animation: err-blink 1.4s steps(2, end) infinite;
      }
      @keyframes err-blink { 50% { opacity: .35; } }

      @media (prefers-reduced-motion: reduce) {
        .hero-wander, .hero-body, .cape, .bubble, .minion,
        .portal, .turret-head, .turret-eye, .cable, .gremlin, .bolt, .err-label {
          animation: none !important;
        }
      }
    `}</style>
  );
}
