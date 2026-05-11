"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PROJECTS } from "@/lib/content";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function ProjectsShowcase() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pj-row");
      cards.forEach((card) => {
        gsap.from(card.querySelector(".pj-bar"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
        gsap.from(card.querySelectorAll(".pj-up"), {
          yPercent: 100,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink-950 py-32 sm:py-48">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-20 flex items-end justify-between gap-8">
          <div>
            <div className="text-eyebrow text-graphite-200">— Selected Work</div>
            <h2 className="mt-6 font-display text-display-2 tracking-tight">
              Recent projects, <span className="italic text-bone/60">shipped with intent.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            data-cursor="link"
            className="hidden text-[12px] uppercase tracking-[0.28em] text-graphite-100 hover:text-bone md:block"
          >
            All work →
          </Link>
        </div>

        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className="pj-row group relative">
              <Link
                href={`/projects/${p.slug}`}
                data-cursor="view"
                data-cursor-label="View"
                className="grid grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-white/[0.015] sm:py-10"
              >
                <div className="col-span-1 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">
                  <span className="pj-up inline-block">0{i + 1}</span>
                </div>
                <div className="col-span-6 overflow-hidden">
                  <span className="pj-up inline-block font-display text-[clamp(1.8rem,5vw,4.2rem)] leading-[0.95] tracking-tight">
                    {p.title}
                  </span>
                </div>
                <div className="col-span-3 overflow-hidden">
                  <span className="pj-up inline-block text-[12px] uppercase tracking-[0.24em] text-graphite-100">
                    {p.category}
                  </span>
                </div>
                <div className="col-span-2 overflow-hidden text-right">
                  <span className="pj-up inline-block text-[12px] uppercase tracking-[0.24em] text-graphite-200">
                    {p.year}
                  </span>
                </div>
                <div
                  className="pj-bar col-span-12 mt-6 h-px w-full origin-left bg-gradient-to-r from-transparent via-electric/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                {/* hover preview tile */}
                <div className="pointer-events-none absolute right-10 top-1/2 hidden h-44 w-72 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 opacity-0 transition-all duration-500 group-hover:opacity-100 md:block">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}55 0%, transparent 60%), linear-gradient(180deg, rgba(5,5,7,0.3) 0%, rgba(5,5,7,0.7) 100%)`,
                    }}
                  />
                  <div className="grain absolute inset-0 opacity-30" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-bone/80">
                    <span>{p.client}</span>
                    <span>{p.year}</span>
                  </div>
                  <div className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-ink-950/70 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-end md:hidden">
          <Link href="/projects" className="text-[12px] uppercase tracking-[0.28em] text-bone">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
