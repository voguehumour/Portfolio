import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HoverImageClient } from "@/components/three/HoverImageClient";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return { title: "Project" };
  return {
    title: p.title,
    description: p.summary,
    openGraph: { images: [p.cover] },
  };
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
        <div className="absolute inset-0 -z-10">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover opacity-50"
          />
          <HoverImageClient src={project.cover} accent={project.accent} />
        </div>
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${project.accent}22 0%, transparent 50%), radial-gradient(60% 60% at 50% 30%, ${project.accent}22, transparent 70%), linear-gradient(180deg, rgba(5,5,7,0.4) 0%, rgba(5,5,7,0.92) 100%)`,
          }}
        />
        <div className="grain absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10">
          <Link
            href="/projects"
            data-cursor="link"
            className="mb-10 inline-block text-[11px] uppercase tracking-[0.32em] text-graphite-200 hover:text-bone"
          >
            ← All projects
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-graphite-200">
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.duration}</span>
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
            <div className="mt-10 grid grid-cols-2 gap-6 text-[11px] uppercase tracking-[0.24em] text-graphite-100">
              <div>
                <div className="mb-2 text-bone/40">Role</div>
                {project.role.map((r) => (
                  <div key={r} className="text-bone">{r}</div>
                ))}
              </div>
              <div>
                <div className="mb-2 text-bone/40">Duration</div>
                <div className="text-bone">{project.duration}</div>
                <div className="mt-6 text-bone/40">Year</div>
                <div className="text-bone">{project.year}</div>
              </div>
            </div>
          </div>
          <div className="space-y-6 text-pretty leading-relaxed text-graphite-100">
            <p className="text-lg">{project.problem}</p>
          </div>
        </div>
      </section>

      <section className="relative bg-ink-900 py-32">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <div className="text-eyebrow text-graphite-200">— Process</div>
              <h2 className="mt-6 font-display text-display-2 tracking-tight">How we shipped it.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] md:grid-cols-2 lg:grid-cols-4">
            {project.process.map((s, i) => (
              <Reveal key={s.h} delay={i * 0.06}>
                <div className="h-full bg-ink-900 p-8 sm:p-10">
                  <div className="mb-12 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">
                    · 0{i + 1}
                  </div>
                  <h3 className="font-display text-[1.5rem] leading-tight tracking-tight">{s.h}</h3>
                  <p className="mt-4 leading-relaxed text-graphite-100">{s.p}</p>
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
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900">
                  {project.gallery[i] && (
                    <Image
                      src={project.gallery[i]}
                      alt={`${project.title} frame ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                    />
                  )}
                  <div className="grain absolute inset-0 opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.28em] text-bone/80">
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
            {project.results.map((r) => (
              <div key={r.l} className="border-t border-white/[0.06] pt-6">
                <div className="font-display text-[clamp(2rem,4vw,3.4rem)] tracking-tight">{r.v}</div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.28em] text-graphite-200">{r.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-950 py-24">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-10">
            <div className="text-eyebrow text-graphite-200">— Stack</div>
            <h2 className="mt-6 font-display text-display-3 tracking-tight">Technology.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-bone/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-900 py-32">
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
