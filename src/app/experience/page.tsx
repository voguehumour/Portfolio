"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TIMELINE } from "@/lib/content";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  { year: "2025 — Now", title: "Independent Practice", co: "Animesh Studio", body: "AI consulting, senior product design and creative direction for AI-native teams." },
  { year: "2023 — 2025", title: "Founding Designer · AI Lead", co: "Halo Systems", body: "Designed and engineered the cinematic operating layer for AI-native teams." },
  { year: "2021 — 2023", title: "Senior Product Designer", co: "Atlas Capital", body: "Led design for the flagship wealth platform — editorial system, mobile, growth." },
  { year: "2019 — 2021", title: "Lead Designer", co: "Mirror Studio", body: "Brand worlds, motion identities and product launches for global brands." },
  { year: "2016 — 2019", title: "Product Designer", co: "Various", body: "Consumer apps, design systems and early experiments in motion." },
];

export default function ExperiencePage() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !track.current) return;
    const ctx = gsap.context(() => {
      const trackEl = track.current!;
      const total = trackEl.scrollWidth - window.innerWidth + 80;

      ScrollTrigger.create({
        trigger: ".exp-stage",
        start: "top top",
        end: `+=${total}`,
        pin: ".exp-pin",
        scrub: 1.1,
        onUpdate: (self) => {
          gsap.to(trackEl, { x: -self.progress * total, duration: 0.1, overwrite: true });
          const bar = root.current?.querySelector<HTMLElement>(".exp-bar");
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section className="relative pt-40 pb-12">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-graphite-200">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-bone/40" /> Experience
            </div>
            <div className="font-mono text-bone/60">— 06 / 09</div>
          </div>
          <h1 className="font-display text-display-1 leading-[0.9] tracking-tight text-balance">
            A decade, in motion.
          </h1>
          <p className="mt-10 max-w-2xl text-balance leading-relaxed text-graphite-100 sm:text-lg">
            Scroll horizontally to traverse a decade of practice — studios, product teams, and the
            independent chapter that followed.
          </p>
        </div>
      </section>

      <section className="exp-stage relative">
        <div className="exp-pin relative h-[100svh] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-30" />
          <div className="pointer-events-none absolute inset-0 grain" />

          <div ref={track} className="flex h-full items-center gap-12 px-10 will-change-transform sm:gap-16 sm:px-20">
            {ROLES.map((r, i) => (
              <article
                key={i}
                className="flex h-[60vh] w-[78vw] flex-shrink-0 flex-col justify-between rounded-2xl border border-white/[0.06] bg-ink-900/60 p-10 backdrop-blur sm:w-[52vw]"
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-graphite-200">
                  <span>0{i + 1} · {r.year}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10">
                    <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-electric" />
                  </span>
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-[0.28em] text-electric">{r.co}</div>
                  <h2 className="mt-4 font-display text-display-2 leading-[0.95] tracking-tight">
                    {r.title}
                  </h2>
                  <p className="mt-6 max-w-md leading-relaxed text-graphite-100">{r.body}</p>
                </div>
                <div className="flex items-end justify-between">
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/40">
                    · {String(i + 1).padStart(2, "0")} / {String(ROLES.length).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-bone/40">Chapter</div>
                </div>
              </article>
            ))}
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 w-[60vw] max-w-2xl -translate-x-1/2">
            <div className="h-px w-full overflow-hidden bg-white/10">
              <div className="exp-bar h-full w-full origin-left bg-bone" style={{ transform: "scaleX(0)" }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-graphite-200">
              <span>2016</span>
              <span>Drag · Scroll</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-ink-950 py-32">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="mb-12 text-eyebrow text-graphite-200">— Milestones</div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="border-t border-white/[0.06] pt-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">
                  · 0{i + 1}
                </div>
                <div className="mt-4 font-display text-2xl tracking-tight">{t.year}</div>
                <div className="mt-2 text-sm text-bone/80">{t.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
