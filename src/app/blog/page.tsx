"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { POSTS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

const CATS = ["All", "AI Workflows", "Generative Media", "Motion Design", "Future Interfaces", "Creative Automation", "Product Design"];

export default function BlogPage() {
  const [cat, setCat] = useState("All");
  const filtered = POSTS.filter((p) => cat === "All" || p.category === cat);
  const featured = POSTS[0];
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${scrolled})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[95] h-px w-full bg-white/5">
        <div ref={bar} className="h-full w-full origin-left bg-electric" style={{ transform: "scaleX(0)" }} />
      </div>

      <section className="relative bg-ink-950 pt-40 pb-12">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-graphite-200">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-bone/40" /> Insights
            </div>
            <div className="font-mono text-bone/60">— 08 / 09</div>
          </div>
          <h1 className="font-display text-display-1 leading-[0.9] tracking-tight text-balance">
            Field notes from the studio.
          </h1>
          <p className="mt-10 max-w-2xl text-balance leading-relaxed text-graphite-100 sm:text-lg">
            Essays on AI workflows, product systems, motion design, generative media and the next decade
            of interfaces. Written between projects, not for SEO.
          </p>
        </div>
      </section>

      <section className="relative bg-ink-950 py-16">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <Link
            href={`/blog/${featured.slug}`}
            data-cursor="view"
            data-cursor-label="Read"
            className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900"
            style={{ aspectRatio: "16/8" }}
          >
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 30%, rgba(91,140,255,0.3), transparent 60%), radial-gradient(40% 60% at 80% 70%, rgba(155,135,255,0.25), transparent 60%), linear-gradient(180deg, rgba(5,5,7,0.4) 0%, rgba(5,5,7,0.85) 100%)",
              }}
            />
            <div className="grain absolute inset-0 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-10 sm:p-14">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-graphite-200">
                Featured · {featured.category} · {featured.read}
              </div>
              <div>
                <h2 className="max-w-3xl font-display text-display-2 leading-[0.95] tracking-tight">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-graphite-100">{featured.excerpt}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative bg-ink-950 pb-32 pt-12 sm:pb-48">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-12 flex flex-wrap items-center gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                data-cursor="link"
                className={`rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                  cat === c
                    ? "border-bone bg-bone text-ink-950"
                    : "border-white/10 text-graphite-100 hover:border-white/30 hover:text-bone"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <li className="group">
                  <Link
                    href={`/blog/${p.slug}`}
                    data-cursor="link"
                    className="grid grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-white/[0.015] sm:py-10"
                  >
                    <div className="col-span-12 sm:col-span-1 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">
                      0{i + 1}
                    </div>
                    <div className="col-span-12 sm:col-span-7">
                      <h3 className="font-display text-[clamp(1.4rem,3vw,2.4rem)] leading-tight tracking-tight transition-colors group-hover:text-electric">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-graphite-100">{p.excerpt}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-2 text-[11px] uppercase tracking-[0.24em] text-graphite-100">
                      {p.category}
                    </div>
                    <div className="col-span-6 sm:col-span-2 text-right text-[11px] uppercase tracking-[0.24em] text-graphite-200">
                      {p.date} · {p.read}
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
