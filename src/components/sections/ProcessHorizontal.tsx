"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/content";
import { SectionEyebrow } from "./About";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function ProcessHorizontal() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = root.current;
    const t = track.current;
    if (!wrapper || !t) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reduce) return;

    const ctx = gsap.context(() => {
      const distance = () => t.scrollWidth - window.innerWidth;
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => "+=" + distance(),
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative">
      <div className="px-6 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-[1280px]">
          <SectionEyebrow>Process</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl font-display text-display-3 text-balance"
          >
            How I <span className="gradient-stroke">work.</span>
          </motion.h2>
        </div>
      </div>

      <div ref={root} className="relative mt-16 overflow-hidden md:h-screen">
        <div
          ref={track}
          className="flex flex-col md:h-full md:flex-row md:flex-nowrap md:will-change-transform"
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="flex w-full flex-shrink-0 items-center px-6 py-20 sm:px-10 md:h-full md:w-screen md:px-24 md:py-0"
            >
              <div className="max-w-2xl">
                <div
                  className="font-display text-[clamp(7rem,18vw,14rem)] font-bold leading-[0.85] tracking-tighter"
                  style={{
                    background: "linear-gradient(180deg, rgba(91,140,255,0.55), rgba(155,135,255,0.05))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.num}
                </div>
                <h3 className="mt-6 font-display text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-xl text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-graphite-100">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
