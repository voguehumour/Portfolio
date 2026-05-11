import type { Metadata } from "next";
import { PROCESS_STAGES } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Process",
  description:
    "A studio process designed like a living AI workflow — discovery, research, strategy, design, integration, automation, deployment and optimization.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        index="04 / 09"
        title="A workflow architected like a living AI system."
        subtitle="Eight stages, connected by feedback loops and intent. Each is a node in a larger graph — discovery flows into research, strategy compiles into design, and AI weaves through every layer."
        tint="#9b87ff"
      />

      <section className="relative bg-ink-950 py-32 sm:py-48">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          {/* SVG pipeline backdrop */}
          <div className="relative">
            <svg
              viewBox="0 0 1200 800"
              className="pointer-events-none absolute inset-0 -z-0 h-full w-full opacity-60"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.0" />
                  <stop offset="50%" stopColor="#5b8cff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#9b87ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M50,80 C300,80 200,260 600,260 S900,460 1150,460 S700,640 50,720"
                stroke="url(#line-grad)"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M50,200 C400,200 350,420 700,420 S950,580 1150,580"
                stroke="url(#line-grad)"
                strokeWidth="0.8"
                fill="none"
              />
            </svg>

            <ol className="relative grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] md:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STAGES.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.05}>
                  <li className="group relative h-full bg-ink-900 p-8 transition-colors hover:bg-ink-800 sm:p-10">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">
                        {s.id}
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10">
                        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-electric" />
                      </span>
                    </div>
                    <h2 className="mt-12 font-display text-[1.8rem] leading-tight tracking-tight">
                      {s.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-graphite-100">{s.body}</p>

                    {/* connector */}
                    <span className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-electric/60 to-transparent md:block" />
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="mt-24 grid items-start gap-12 lg:grid-cols-2">
            <div>
              <div className="text-eyebrow text-graphite-200">— Principle</div>
              <h2 className="mt-6 font-display text-display-3 leading-[0.95] tracking-tight">
                Loops, <span className="italic text-bone/60">not lines.</span>
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-graphite-100">
                Linear timelines are a fiction. We work in loops — discovery feeds back into strategy,
                deployment surfaces new research, optimization rewrites the design system. The eight
                stages exist; the order is generative.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              {[
                { k: "Sprint", v: "1-2 weeks" },
                { k: "Embedded", v: "4-12 weeks" },
                { k: "Retainer", v: "Quarterly" },
                { k: "Advisory", v: "Ongoing" },
              ].map((b) => (
                <div key={b.k} className="bg-ink-900 p-8">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-graphite-300">{b.k}</div>
                  <div className="mt-4 font-display text-2xl tracking-tight">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
