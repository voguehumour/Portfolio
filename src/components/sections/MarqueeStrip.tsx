"use client";

const ITEMS = [
  "Next.js",
  "LangChain",
  "OpenAI",
  "Figma",
  "Cursor",
  "Vercel",
  "Anthropic",
  "RAG Systems",
  "Agent Design",
  "Framer",
  "Tailwind",
  "Supabase",
  "Claude",
  "GPT-4o",
];

export function MarqueeStrip() {
  const sequence = [...ITEMS, ...ITEMS];
  return (
    <div className="relative h-20 overflow-hidden border-y border-white/[0.06] bg-ink-900/40">
      <div className="group flex h-full items-center">
        <div className="flex shrink-0 animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
          {sequence.map((item, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-mono text-sm tracking-wide text-graphite-100 transition-all duration-300 hover:text-bone hover:[text-shadow:0_0_12px_rgba(91,140,255,0.6)]">
                {item}
              </span>
              <span className="select-none text-electric/50">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
