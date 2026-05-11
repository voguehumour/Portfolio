import type { Metadata } from "next";
import { SERVICES } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI consulting, senior product design, creative direction, ComfyUI systems and generative pipelines.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        index="03 / 09"
        title="A luxury creative technology practice."
        subtitle="A small, senior practice working at the intersection of AI, product design and creative direction. Engagements are shaped around leverage, not deliverables."
      />

      <section className="relative bg-ink-950 py-32 sm:py-48">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04}>
                <li className="group grid grid-cols-1 gap-8 py-12 transition-colors hover:bg-white/[0.015] sm:py-16 lg:grid-cols-12">
                  <div className="col-span-12 flex items-center gap-6 lg:col-span-1">
                    <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-graphite-300">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight transition-colors group-hover:text-electric">
                      {s.title}
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-4">
                    <p className="text-pretty leading-relaxed text-graphite-100">{s.desc}</p>
                  </div>
                  <div className="col-span-12 lg:col-span-2">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-graphite-300">
                      Deliverables
                    </div>
                    <ul className="space-y-1.5 text-[12px] uppercase tracking-[0.18em] text-bone/80">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-electric" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <div className="mt-24 grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
            <h2 className="font-display text-display-2 leading-[0.95] tracking-tight">
              Not sure what fits? <span className="italic text-bone/60">Let's scope it together.</span>
            </h2>
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <Button href="/contact">Start a conversation</Button>
              <Button href="/process" variant="outline">See the process</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
