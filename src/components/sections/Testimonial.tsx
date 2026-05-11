"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonial() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative bg-ink-950 py-32 sm:py-48">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-graphite-200">
          <span className="h-px w-12 bg-bone/30" />
          Words from collaborators
        </div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.15] tracking-tight text-bone text-balance">
                <span className="mr-2 align-top text-electric">"</span>
                {t.quote}
                <span className="ml-2 align-top text-electric">"</span>
              </blockquote>
              <div className="mt-10 flex items-center gap-4 text-[12px] uppercase tracking-[0.28em] text-graphite-100">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 font-mono text-[10px] text-bone">
                  {t.author
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span className="text-bone">{t.author}</span>
                <span className="text-bone/40">·</span>
                <span>{t.role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              data-cursor="link"
              className={`h-px transition-all duration-700 ${
                idx === i ? "w-16 bg-bone" : "w-8 bg-bone/20 hover:bg-bone/40"
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
