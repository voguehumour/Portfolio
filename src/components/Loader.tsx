"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
          delay: 0.2,
          onComplete: () => setGone(true),
        });
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (num.current) num.current.textContent = String(Math.floor(counter.v)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`;
      },
    });
    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-end overflow-hidden bg-ink-950 px-6 pb-10 sm:pb-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-60" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-eyebrow text-graphite-200">Animesh Jaiswal</div>
        <div className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none">
          <span className="gradient-stroke">Designing</span>
          <span className="block italic text-bone/70">intelligent experiences</span>
        </div>
      </div>

      <div className="relative z-10 grid w-full grid-cols-3 items-end gap-8 text-[11px] uppercase tracking-[0.3em] text-graphite-200 sm:grid-cols-3">
        <div>v.2026 · Portfolio</div>
        <div className="text-center">
          <div className="mb-3 h-px w-full overflow-hidden bg-white/10">
            <div ref={bar} className="h-full origin-left bg-bone" style={{ transform: "scaleX(0)" }} />
          </div>
          <span className="font-mono">
            <span ref={num}>000</span> / 100
          </span>
        </div>
        <div className="text-right">Loading scene</div>
      </div>
    </div>
  );
}
