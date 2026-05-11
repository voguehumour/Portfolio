"use client";

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-ink-950 py-8">
      <div className="mask-fade-x flex w-max animate-marquee gap-16 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-16 font-display text-[clamp(2rem,5vw,4rem)] tracking-tight">
            <span className="text-bone/85">{t}</span>
            <span className="inline-block h-2 w-2 rounded-full bg-electric" />
          </span>
        ))}
      </div>
    </div>
  );
}
