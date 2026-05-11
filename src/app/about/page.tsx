import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TIMELINE, STATS } from "@/lib/content";
import { StatCounter } from "@/components/sections/StatCounter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Animesh Jaiswal — a senior product designer, AI consultant and creative technologist. Philosophy, story and worldview.",
};

const PHILOSOPHY = [
  {
    h: "Product, not pixels.",
    p: "Pixels are an output; products are an outcome. I design from the business backwards — positioning, jobs to be done, instrumentation — then forward through systems, motion and craft.",
  },
  {
    h: "AI as collaborator.",
    p: "I treat models like a new department in the studio — with brief, dailies and creative direction. Most teams use AI; few direct it. I do both.",
  },
  {
    h: "Editorial restraint.",
    p: "The best interfaces feel like editorial design — typography first, hierarchy second, decoration last. Restraint is leverage.",
  },
  {
    h: "Motion as grammar.",
    p: "Motion is the grammar of trust. A well-tuned curve teaches a user what to expect from a product, faster than any onboarding flow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        index="01 / 09"
        title="A studio of one, built around taste, systems and intelligence."
        subtitle="I'm Animesh Jaiswal — an AI consultant and senior product designer based between Mumbai and remote. For nearly a decade I've been quietly shipping the work people forward to each other."
      />

      <section className="relative bg-ink-950 py-32 sm:py-48">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 sm:px-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-eyebrow text-graphite-200">— Story</div>
            <h2 className="mt-6 font-display text-display-3 leading-[0.95] tracking-tight">
              I design <span className="italic text-bone/60">at the seam</span> between intelligence and intent.
            </h2>
          </div>
          <div className="space-y-6 text-pretty text-graphite-100">
            <p className="text-lg leading-relaxed">
              I started as a product designer in 2016 — small consumer apps, late nights, an obsessive
              spreadsheet of every typographic system I admired. Studios came next: leading interaction
              and motion for global launches, then senior product design at scale.
            </p>
            <p className="leading-relaxed">
              In 2022 the ground shifted under me. ComfyUI, agents, multimodal models — I went deep,
              not as a hobbyist but as a builder. I learned to direct models the way I'd directed
              motion designers — with brief, taste and dailies.
            </p>
            <p className="leading-relaxed">
              Today I work as an independent partner to AI-native studios, founders and brands. The
              practice sits at the intersection of senior product design, AI consulting and creative
              technology — and the work is unmistakably mine: editorial, cinematic, restrained.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-ink-950 py-20">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {STATS.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-950 py-32 sm:py-48">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-16">
            <div className="text-eyebrow text-graphite-200">— Philosophy</div>
            <h2 className="mt-6 font-display text-display-2 tracking-tight">
              Four ideas that shape the work.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.h} delay={i * 0.08}>
                <div className="glass rounded-2xl p-8 sm:p-10">
                  <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">
                    · 0{i + 1}
                  </div>
                  <h3 className="font-display text-[1.8rem] leading-tight tracking-tight">{p.h}</h3>
                  <p className="mt-4 leading-relaxed text-graphite-100">{p.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-950 py-32 sm:py-48">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-20 flex items-end justify-between gap-8">
            <div>
              <div className="text-eyebrow text-graphite-200">— Timeline</div>
              <h2 className="mt-6 font-display text-display-2 tracking-tight">A decade in chapters.</h2>
            </div>
          </div>
          <ol className="relative border-l border-white/[0.08] pl-8 sm:pl-12">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <li className="relative mb-14 last:mb-0">
                  <span className="absolute -left-[42px] top-2 grid h-3 w-3 place-items-center">
                    <span className="h-3 w-3 rounded-full bg-electric/30" />
                    <span className="absolute h-1.5 w-1.5 rounded-full bg-electric" />
                  </span>
                  <div className="font-mono text-[12px] uppercase tracking-[0.28em] text-graphite-200">
                    {t.year}
                  </div>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-tight tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-graphite-100">{t.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
