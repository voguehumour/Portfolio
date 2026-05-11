"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: value,
          duration: 2,
          ease: "expo.out",
          onUpdate: () => {
            el.textContent = Math.floor(obj.v).toString();
          },
        });
      },
    });
    return () => st.kill();
  }, [value]);

  return (
    <div className="border-t border-white/[0.06] pt-6">
      <div className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-tight">
        <span ref={ref}>0</span>
        <span className="text-electric">{suffix}</span>
      </div>
      <div className="mt-4 text-[11px] uppercase tracking-[0.3em] text-graphite-200">
        {label}
      </div>
    </div>
  );
}
