interface Props {
  name: string;
  accent: string;
  size?: number;
  className?: string;
  rounded?: string;
}

export function HeroPortrait({ name, accent, size = 64, className = "", rounded = "rounded-xl" }: Props) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${rounded} ${className}`}
      style={{ width: size, height: size, background: accent }}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(255,255,255,.4), transparent 40%), radial-gradient(circle at 70% 80%, rgba(0,0,0,.4), transparent 50%)",
      }} />
      <span className="font-display relative z-10 font-bold text-white drop-shadow-md" style={{ fontSize: size * 0.34 }}>
        {initials}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
