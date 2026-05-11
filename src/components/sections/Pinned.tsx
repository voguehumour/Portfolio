"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    eyebrow: "Scene 01",
    title: "Strategy as choreography.",
    body: "Every engagement begins with reframing the problem until it becomes obvious — then choreographing the smallest, sharpest path through it.",
  },
  {
    eyebrow: "Scene 02",
    title: "Design as system.",
    body: "Editorial typography, motion language, interaction grammar — collapsed into a system that scales without diluting.",
  },
  {
    eyebrow: "Scene 03",
    title: "AI as collaborator.",
    body: "Pipelines, agents and models embedded into the studio's workflow — augmenting craft, never replacing it.",
  },
  {
    eyebrow: "Scene 04",
    title: "Shipping as discipline.",
    body: "Production rigor, performance budgets, accessibility — the unglamorous craft that makes elite work feel inevitable.",
  },
];

export function Pinned() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const total = SCENES.length;
      const slides = gsap.utils.toArray<HTMLElement>(".pin-slide");
      gsap.set(slides, { opacity: 0, y: 60 });
      gsap.set(slides[0], { opacity: 1, y: 0 });

      ScrollTrigger.create({
        trigger: ".pin-stage",
        start: "top top",
        end: () => `+=${(total - 1) * 100}%`,
        pin: ".pin-inner",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress * (total - 1);
          const idx = Math.floor(p);
          const frac = p - idx;
          slides.forEach((s, i) => {
            if (i === idx) {
              gsap.set(s, { opacity: 1 - frac, y: -frac * 40 });
            } else if (i === idx + 1) {
              gsap.set(s, { opacity: frac, y: (1 - frac) * 40 });
            } else {
              gsap.set(s, { opacity: 0, y: 60 });
            }
          });
          const bar = root.current?.querySelector<HTMLElement>(".pin-bar");
          if (bar) bar.style.transform = `scaleY(${self.progress})`;
          const idxEl = root.current?.querySelector<HTMLElement>(".pin-idx");
          if (idxEl)
            idxEl.textContent = `${String(Math.min(total, idx + 1)).padStart(2, "0")} / 0${total}`;
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="pin-stage relative bg-ink-900">
      <div className="pin-inner relative h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-40" />
        <div className="pointer-events-none absolute inset-0 grain" />

        <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2 sm:left-10">
          <div className="text-eyebrow text-graphite-200">— Method</div>
          <div className="pin-idx mt-4 font-mono text-[12px] tracking-[0.28em] text-bone/60">
            01 / 04
          </div>
          <div className="mt-6 h-32 w-px overflow-hidden bg-white/10">
            <div className="pin-bar h-full w-full origin-top bg-electric" style={{ transform: "scaleY(0)" }} />
          </div>
        </div>

        <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-6 sm:px-10">
          <div className="ml-auto w-full max-w-3xl">
            {SCENES.map((s, i) => (
              <div
                key={i}
                className="pin-slide absolute inset-y-0 right-6 left-24 flex flex-col justify-center sm:left-32 sm:right-10"
              >
                <div className="text-eyebrow text-electric">{s.eyebrow}</div>
                <h3 className="mt-8 font-display text-display-2 leading-[0.95] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-8 max-w-xl text-balance text-base leading-relaxed text-graphite-100 sm:text-lg">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
