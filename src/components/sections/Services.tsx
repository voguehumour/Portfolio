"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Brain, MessageSquare, Grid3x3, Layers } from "lucide-react";
import { MASTER_SERVICES } from "@/lib/content";
import { SectionEyebrow } from "./About";
import { cn } from "@/lib/utils";

const ICONS = {
  strategy: Brain,
  conversation: MessageSquare,
  atomic: Grid3x3,
  layers: Layers,
} as const;

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("transition-transform duration-300 ease-out [transform-style:preserve-3d]", className)}
    >
      {children}
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative px-6 py-32 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>What I Do</SectionEyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl font-display text-display-3 text-balance"
        >
          Services built for <span className="gradient-stroke">AI-native teams.</span>
        </motion.h2>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {MASTER_SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              >
                <TiltCard>
                  <article
                    data-cursor="link"
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-800/60 p-9 backdrop-blur-md transition-colors duration-500 hover:bg-ink-700/60"
                  >
                    {/* gradient border on hover */}
                    <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        padding: "1px",
                        background: "linear-gradient(135deg, transparent, #5b8cff, #9b87ff, transparent)",
                        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      } as React.CSSProperties}
                    />
                    {/* sweep line */}
                    <span className="pointer-events-none absolute bottom-0 left-[-100%] h-px w-full bg-gradient-to-r from-transparent via-violet-mist to-transparent transition-all duration-700 group-hover:left-full" />

                    <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-electric/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-electric/20">
                      <Icon className="h-5 w-5 text-electric-glow" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-bone">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite-100">{s.desc}</p>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
