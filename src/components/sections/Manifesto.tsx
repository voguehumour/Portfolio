"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const TEXT = [
  "I design at the seam between intelligence and intent —",
  "where systems learn, interfaces breathe,",
  "and craft compounds into compounding leverage.",
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-mw]");
      gsap.fromTo(
        words,
        { opacity: 0.08 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-ink-950 py-32 sm:py-56">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-graphite-200">
          <span className="h-px w-12 bg-bone/30" /> Manifesto
        </div>
        <p className="font-display text-display-3 leading-[1.05] tracking-tight text-bone/30">
          {TEXT.map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((w, wi) => (
                <span key={wi} data-mw className="mr-3 inline-block">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
