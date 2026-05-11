"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ABOUT_PARAGRAPHS, ABOUT_STATS } from "@/lib/content";

function CountUp({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + (suffix ?? "");
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix ?? ""}</span>;
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>About</SectionEyebrow>

        <div className="mt-16 grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <aside className="md:sticky md:top-32 md:self-start">
            <div className="flex flex-col gap-12">
              {ABOUT_STATS.map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none tracking-tight">
                    <span className="bg-gradient-to-br from-electric via-electric-glow to-violet-mist bg-clip-text text-transparent">
                      <CountUp to={s.value} suffix={s.suffix} />
                    </span>
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-200">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </aside>

          <div className="space-y-10">
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className={
                  p.emphasis
                    ? "text-balance text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight text-bone"
                    : "text-balance text-[clamp(1.15rem,2vw,1.6rem)] leading-snug text-graphite-100"
                }
              >
                {p.text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-violet-mist"
    >
      <span className="h-px w-7 bg-violet-mist" />
      {children}
    </motion.div>
  );
}
