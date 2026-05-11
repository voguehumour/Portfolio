"use client";

import { motion } from "framer-motion";
import { TECH_PILLS } from "@/lib/content";
import { SectionEyebrow } from "./About";
import { cn } from "@/lib/utils";

export function TechCloud() {
  return (
    <section id="tech" className="relative px-6 py-32 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1280px] text-center">
        <div className="inline-block">
          <SectionEyebrow>Tech & Tools</SectionEyebrow>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-3xl font-display text-display-3 text-balance"
        >
          The stack I design and <span className="gradient-stroke">build with.</span>
        </motion.h2>

        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
          {TECH_PILLS.map((pill, i) => {
            const featured = "featured" in pill && pill.featured;
            return (
            <motion.span
              key={pill.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
                delay: i * 0.035,
              }}
              data-cursor="link"
              className={cn(
                "cursor-default rounded-full border border-white/[0.08] bg-ink-800/60 px-4 py-2.5 font-mono backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10 hover:text-bone hover:shadow-[0_0_24px_rgba(91,140,255,0.4)]",
                featured ? "px-5 py-3 text-base text-bone border-electric/25" : "text-sm text-graphite-100",
              )}
            >
              {pill.name}
            </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
