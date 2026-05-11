"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MASTER_TESTIMONIALS } from "@/lib/content";
import { SectionEyebrow } from "./About";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % MASTER_TESTIMONIALS.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  const active = MASTER_TESTIMONIALS[idx];

  return (
    <section id="testimonials" className="relative px-6 py-32 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1280px] text-center">
        <div className="inline-block">
          <SectionEyebrow>Testimonials</SectionEyebrow>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-3xl font-display text-display-3 text-balance"
        >
          Trusted by founders and <span className="gradient-stroke">product leaders.</span>
        </motion.h2>

        <div className="relative mx-auto mt-14 min-h-[260px] max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/[0.07] bg-ink-800/60 p-10 backdrop-blur-md"
            >
              <span className="block font-display text-6xl leading-none text-electric/70">"</span>
              <blockquote className="mt-2 text-balance text-[clamp(1.15rem,2vw,1.5rem)] leading-snug text-bone">
                {active.quote}
              </blockquote>
              <cite className="mt-6 block font-mono text-[12px] not-italic uppercase tracking-[0.18em] text-graphite-100">
                — {active.author}, {active.role}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {MASTER_TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              data-cursor="link"
              aria-label={`Show testimonial ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === i ? "w-7 bg-electric" : "w-1.5 bg-graphite-400 hover:bg-graphite-300",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
