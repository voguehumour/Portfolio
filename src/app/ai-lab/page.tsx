import type { Metadata } from "next";
import { AI_LAB } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "AI Lab",
  description:
    "Generative experiments — ComfyUI graphs, Veo pipelines, real-time WebGL, agentic systems and editorial AI.",
};

const SPANS = [
  "col-span-12 md:col-span-8 row-span-2 aspect-[16/12]",
  "col-span-12 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-4 aspect-square",
  "col-span-12 md:col-span-6 aspect-[16/10]",
  "col-span-12 md:col-span-6 aspect-[16/10]",
  "col-span-12 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-4 aspect-square",
  "col-span-12 md:col-span-4 aspect-square",
];

export default function AILabPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Lab"
        index="05 / 09"
        title="Experiments, pipelines, fragments from the studio."
        subtitle="The lab is where I prototype freely — ComfyUI graphs, Veo pipelines, agentic systems, real-time WebGL and editorial AI. Some experiments graduate into client work; others stay as field notes."
        tint="#9b87ff"
      />

      <section className="relative bg-ink-950 pb-32 pt-12 sm:pb-48">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {AI_LAB.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.05}
                className={`relative ${SPANS[i % SPANS.length]}`}
              >
                <div
                  data-cursor="view"
                  data-cursor-label="Preview"
                  className={`group relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${item.hue}`}
                >
                  <div className="absolute inset-0 bg-ink-900 mix-blend-multiply" />
                  <div
                    className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    style={{
                      background:
                        i % 3 === 0
                          ? "radial-gradient(60% 60% at 30% 30%, rgba(91,140,255,0.45), transparent 60%), radial-gradient(40% 40% at 70% 70%, rgba(155,135,255,0.35), transparent 60%)"
                          : i % 3 === 1
                            ? "conic-gradient(from 90deg at 50% 50%, rgba(91,140,255,0.4), rgba(155,135,255,0.2), rgba(91,140,255,0.4))"
                            : "linear-gradient(140deg, rgba(91,140,255,0.3) 0%, transparent 60%), radial-gradient(at 80% 20%, rgba(155,135,255,0.4), transparent 50%)",
                    }}
                  />
                  <div className="grain absolute inset-0 opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-graphite-200">
                        Lab · 0{i + 1}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-bone/80">
                        {item.tag}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-tight tracking-tight">
                        {item.title}
                      </h2>
                      <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-bone/40 transition-colors group-hover:text-bone">
                        Open
                        <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Before / After slider mockup */}
          <div className="mt-24">
            <div className="mb-8 text-eyebrow text-graphite-200">— Before / After</div>
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]" style={{ aspectRatio: "21/9" }}>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, #15161c 0%, #15161c 50%, transparent 50%, transparent 100%), radial-gradient(50% 80% at 75% 50%, rgba(91,140,255,0.5), transparent 70%), linear-gradient(180deg, #0a0a0d, #15161c)",
                }}
              />
              <div className="grain absolute inset-0 opacity-30" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-bone/30" />
              <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-bone/30 bg-ink-900/80 backdrop-blur">
                <span className="text-[10px] uppercase tracking-[0.28em]">drag</span>
              </div>
              <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.28em] text-bone/80">Before</div>
              <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.28em] text-bone/80">After</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
