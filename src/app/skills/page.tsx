"use client";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

const SkillsPile = dynamic(
  () => import("@/components/sections/SkillsPile").then((m) => m.SkillsPile),
  { ssr: false, loading: () => <div className="h-[68vh] min-h-[480px] w-full rounded-2xl border border-white/[0.06] bg-ink-900" /> },
);

const STACKS = [
  {
    h: "Design",
    items: ["Figma", "Linear", "Framer", "Rive", "After Effects", "Cinema 4D"],
  },
  {
    h: "Engineering",
    items: ["Next.js", "React", "TypeScript", "Three.js / R3F", "GSAP", "WebGL · GLSL"],
  },
  {
    h: "AI · Generative",
    items: ["ComfyUI", "Veo · Runway", "OpenAI", "Anthropic", "Replicate", "ElevenLabs"],
  },
  {
    h: "Ops · Infra",
    items: ["Vercel", "Supabase", "Cloudflare", "GitHub", "Cursor", "Notion"],
  },
];

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        index="10 / 10"
        title="A practice built on tools that compound."
        subtitle="The stack I reach for — across design, engineering, AI and operations. Drag the chips around. They have weight."
      />

      <section className="relative bg-ink-950 pb-24 pt-12 sm:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <SkillsPile />

          <div className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:grid-cols-2 lg:grid-cols-4">
            {STACKS.map((s, i) => (
              <Reveal key={s.h} delay={i * 0.05}>
                <div className="h-full bg-ink-900 p-8">
                  <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">
                    · 0{i + 1}
                  </div>
                  <h3 className="font-display text-[1.6rem] tracking-tight">{s.h}</h3>
                  <ul className="mt-6 space-y-2 text-[12px] uppercase tracking-[0.18em] text-bone/80">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-electric" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
