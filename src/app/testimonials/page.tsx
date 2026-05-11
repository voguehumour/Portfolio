import type { Metadata } from "next";
import { TESTIMONIALS } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Words from founders, leaders and collaborators.",
};

const LOGOS = [
  "Halo Systems",
  "North Studio",
  "Atlas Capital",
  "Mirror AI",
  "Veo Atelier",
  "Lumen Labs",
  "Strata",
  "Field Notes",
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        index="07 / 09"
        title="Words from people I've shipped with."
        subtitle="A small selection from founders, design leaders and creative directors I've worked alongside over the years."
      />

      <section className="relative bg-ink-950 py-32 sm:py-48">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
            {TESTIMONIALS.concat(TESTIMONIALS).map((t, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <article className="glass relative h-full rounded-2xl p-8 sm:p-10">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-ink-900 font-mono text-[11px] tracking-[0.28em]">
                      {t.author.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-graphite-200">
                      0{(i % TESTIMONIALS.length) + 1}
                    </span>
                  </div>
                  <blockquote className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-[1.25] tracking-tight text-bone text-balance">
                    <span className="mr-1 text-electric">"</span>
                    {t.quote}
                    <span className="ml-1 text-electric">"</span>
                  </blockquote>
                  <div className="mt-8 flex items-center justify-between text-[11px] uppercase tracking-[0.28em]">
                    <span className="text-bone">{t.author}</span>
                    <span className="text-graphite-200">{t.role}</span>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100"
                    style={{ boxShadow: "inset 0 0 80px rgba(91,140,255,0.15)" }} />
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-24">
            <div className="mb-10 text-eyebrow text-graphite-200">— Selected clients</div>
            <div className="relative overflow-hidden border-y border-white/[0.06] py-10 mask-fade-x">
              <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
                {[...LOGOS, ...LOGOS].map((l, i) => (
                  <span key={i} className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] tracking-tight text-bone/60">
                    {l}
                    <span className="ml-16 inline-block h-1.5 w-1.5 rounded-full bg-electric/70 align-middle" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
