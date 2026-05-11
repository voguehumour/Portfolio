import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work — AI systems, product design, ComfyUI pipelines and creative direction.",
};

const CATEGORIES = [
  "All",
  "AI Automation",
  "Product Design",
  "Creative Direction",
  "ComfyUI Systems",
  "Generative Video",
  "Brand Experiences",
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        index="02 / 09"
        title="A studio's body of work, distilled."
        subtitle="Selected projects across AI consulting, senior product design, ComfyUI systems and creative direction — for studios, founders and brands."
        tint="#9b87ff"
      />

      <section className="relative bg-ink-950 pb-32 pt-12 sm:pb-48">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-14 flex flex-wrap gap-2">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                data-cursor="link"
                className={`rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                  i === 0
                    ? "border-bone bg-bone text-ink-950"
                    : "border-white/10 text-graphite-100 hover:border-white/30 hover:text-bone"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/projects/${p.slug}`}
                  data-cursor="view"
                  data-cursor-label="Open"
                  className={`group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900 ${
                    i % 3 === 0 ? "md:col-span-2" : ""
                  }`}
                  style={{ aspectRatio: i % 3 === 0 ? "16/9" : "4/3" }}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}33 0%, transparent 55%), radial-gradient(60% 80% at 50% 0%, ${p.accent}22, transparent 60%), linear-gradient(180deg, #0a0a0d 0%, #15161c 100%)`,
                    }}
                  />
                  <div className="grain absolute inset-0 opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10">
                    <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.28em] text-graphite-100">
                      <span>{p.category}</span>
                      <span>{p.year}</span>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.28em] text-graphite-200">{p.client}</div>
                      <h3 className="mt-3 font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[0.95] tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-md leading-relaxed text-graphite-100">{p.summary}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-bone/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
