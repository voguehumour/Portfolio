"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { LAB_ITEMS } from "@/lib/content";
import { SectionEyebrow } from "./About";

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="transition-transform duration-300">
      {children}
    </div>
  );
}

export function Lab() {
  return (
    <section id="lab" className="relative px-6 py-32 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Lab</SectionEyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl font-display text-display-3 text-balance"
        >
          Experiments & <span className="gradient-stroke">side quests.</span>
        </motion.h2>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {LAB_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
            >
              <Tilt>
                <article
                  data-cursor="link"
                  className="group cursor-pointer rounded-2xl border border-white/[0.07] bg-ink-800/60 p-7 backdrop-blur-md transition-all duration-400 hover:border-electric/40 hover:shadow-[0_12px_40px_rgba(91,140,255,0.15)]"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-violet-mist">
                    {item.tag}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-semibold tracking-tight text-bone">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-100">{item.desc}</p>
                </article>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
