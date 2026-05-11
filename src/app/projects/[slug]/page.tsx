import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return { title: "Project" };
  return { title: p.title, description: p.summary };
}

export default async function ProjectDetail({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <article>
      <section className="relative isolate flex min-h-[92svh] w-full flex-col justify-end overflow-hidden pb-20 pt-40">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${project.accent}33 0%, transparent 50%), radial-gradient(60% 60% at 50% 30%, ${project.accent}33, transparent 70%), linear-gradient(180deg, #050507 0%, #0a0a0d 100%)`,
          }}
        />
        <div className="grain absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10">
          <Link href="/projects" data-cursor="link" className="mb-10 inline-block text-[11px] uppercase tracking-[0.32em] text-graphite-200 hover:text-bone">
            ← All projects
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-graphite-200">
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="mt-8 font-display text-display-1 leading-[0.9] tracking-tight text-balance">
            {project.title}
          </h1>
          <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-graphite-100">
            {project.summary}
          </p>
        </div>
      </section>

      <section className="relative bg-ink-950 py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 sm:px-10 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-eyebrow text-graphite-200">— Problem</div>
            <h2 className="mt-6 font-display text-display-3 leading-[0.95] tracking-tight">The brief</h2>
          </div>
          <div className="space-y-6 text-pretty leading-relaxed text-graphite-100">
            <p className="text-lg">
              The team came to us with a hard, foundational problem: a product that worked but felt small
              for the ambition. The interface didn't communicate intelligence. The systems beneath it had
              accumulated complexity. The story was unclear.
            </p>
            <p>
              We were asked to reframe the product end-to-end — positioning, narrative, design system, AI
              architecture and motion language — and ship a release that would carry the company through
              the next eighteen months.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-ink-900 py-32">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <div className="text-eyebrow text-graphite-200">— Process</div>
              <h2 className="mt-6 font-display text-display-2 tracking-tight">A staged rebuild.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] md:grid-cols-3">
            {["Discovery", "Systems", "Shipping"].map((t, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full bg-ink-900 p-8 sm:p-10">
                  <div className="mb-12 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">· 0{i + 1}</div>
                  <h3 className="font-display text-[1.6rem] tracking-tight">{t}</h3>
                  <p className="mt-4 leading-relaxed text-graphite-100">
                    {i === 0 && "Two weeks of listening — to leadership, customers and the model itself."}
                    {i === 1 && "Editorial design system, motion language, AI architecture rebuilt as one."}
                    {i === 2 && "Production rigor, instrumentation, and a launch that landed."}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-950 py-32">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-12">
            <div className="text-eyebrow text-graphite-200">— Gallery</div>
            <h2 className="mt-6 font-display text-display-2 tracking-tight">Selected frames.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {[
              "col-span-12 md:col-span-8 aspect-[16/9]",
              "col-span-12 md:col-span-4 aspect-[4/5]",
              "col-span-12 md:col-span-6 aspect-[4/3]",
              "col-span-12 md:col-span-6 aspect-[4/3]",
              "col-span-12 aspect-[21/9]",
            ].map((cls, i) => (
              <Reveal key={i} delay={i * 0.06} className={cls}>
                <div
                  className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.06]"
                  style={{
                    background: `linear-gradient(${135 + i * 30}deg, ${project.accent}33 0%, transparent 55%), linear-gradient(180deg, #0a0a0d 0%, #15161c 100%)`,
                  }}
                >
                  <div className="grain absolute inset-0 opacity-30" />
                  <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.28em] text-bone/70">
                    Frame · 0{i + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-950 py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 sm:px-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-eyebrow text-graphite-200">— Results</div>
            <h2 className="mt-6 font-display text-display-3 tracking-tight">The outcome.</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { v: "3.4×", l: "Activation" },
              { v: "62%", l: "Faster time-to-value" },
              { v: "94", l: "NPS" },
              { v: "0", l: "Regressions at launch" },
            ].map((r) => (
              <div key={r.l} className="border-t border-white/[0.06] pt-6">
                <div className="font-display text-[clamp(2rem,4vw,3.4rem)] tracking-tight">{r.v}</div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.28em] text-graphite-200">{r.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-950 py-32">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-10">
            <div className="text-eyebrow text-graphite-200">— Stack</div>
            <h2 className="mt-6 font-display text-display-3 tracking-tight">Technology.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Next.js 15", "Three.js / R3F", "GSAP", "Framer Motion", "ComfyUI", "Veo", "OpenAI", "Vercel"].map((s) => (
              <span key={s} className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-bone/80">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-900 py-32">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <Link
            href={`/projects/${next.slug}`}
            data-cursor="view"
            data-cursor-label="Next"
            className="group block"
          >
            <div className="flex items-center justify-between gap-8">
              <div>
                <div className="text-eyebrow text-graphite-200">— Next case</div>
                <h2 className="mt-6 font-display text-display-2 tracking-tight transition-colors group-hover:text-electric">
                  {next.title}
                </h2>
                <div className="mt-4 text-[12px] uppercase tracking-[0.28em] text-graphite-100">
                  {next.category} · {next.year}
                </div>
              </div>
              <Button href={`/projects/${next.slug}`} variant="outline">Read case</Button>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
