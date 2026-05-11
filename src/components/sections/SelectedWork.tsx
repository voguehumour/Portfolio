"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MASTER_PROJECTS } from "@/lib/content";
import { SectionEyebrow } from "./About";
import { cn } from "@/lib/utils";

function VisualChat() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="self-start max-w-[75%] rounded-2xl border border-white/10 bg-electric/15 px-3 py-2 font-mono text-[10px] text-bone">
        Hi! How can I help you today?
      </div>
      <div className="self-end max-w-[75%] rounded-2xl border border-violet-mist/30 bg-violet-mist/20 px-3 py-2 font-mono text-[10px] text-bone">
        I need to update my plan.
      </div>
      <div className="self-start max-w-[75%] rounded-2xl border border-white/10 bg-electric/15 px-3 py-2 font-mono text-[10px] text-bone">
        I can help — moving you to Pro now.
      </div>
      <div className="self-start max-w-[75%] rounded-2xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 font-mono text-[10px] text-rose-200">
        ⚠ Routing to human agent
      </div>
    </div>
  );
}

function VisualFlow() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      <defs>
        <linearGradient id="flowG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#9b87ff" />
        </linearGradient>
      </defs>
      {[
        [40, 100], [150, 50], [150, 150], [260, 100],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="14" fill="none" stroke="url(#flowG)" strokeWidth="1.5" />
      ))}
      <path d="M54 100 Q100 75 136 55" stroke="url(#flowG)" fill="none" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M54 100 Q100 125 136 145" stroke="url(#flowG)" fill="none" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M164 55 Q200 75 246 100" stroke="url(#flowG)" fill="none" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M164 145 Q200 125 246 100" stroke="url(#flowG)" fill="none" strokeWidth="1" strokeDasharray="3 3" />
      {[[40, 100, "#5b8cff"], [150, 50, "#5b8cff"], [150, 150, "#9b87ff"], [260, 100, "#9b87ff"]].map(
        ([x, y, c], i) => (
          <circle key={i} cx={x as number} cy={y as number} r="3" fill={c as string} />
        ),
      )}
    </svg>
  );
}

function VisualGrid() {
  const cls = [
    "bg-gradient-to-br from-electric/40 to-violet-mist/20",
    "bg-electric/10",
    "bg-gradient-to-br from-rose-400/30 to-transparent",
    "bg-electric/10",
    "bg-violet-mist/25",
    "bg-electric/10",
    "bg-rose-400/20",
    "bg-electric/10",
    "bg-gradient-to-br from-electric/30 to-rose-400/20",
  ];
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-2">
      {cls.map((c, i) => (
        <div key={i} className={cn("rounded-lg border border-white/[0.06]", c)} />
      ))}
    </div>
  );
}

const VISUALS = { chat: VisualChat, flow: VisualFlow, grid: VisualGrid };

export function SelectedWork() {
  return (
    <section id="work" className="relative px-6 py-32 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Selected Work</SectionEyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl font-display text-display-3 text-balance"
        >
          Recent <span className="gradient-stroke">projects.</span>
        </motion.h2>

        <div className="mt-20 flex flex-col gap-24 md:gap-32">
          {MASTER_PROJECTS.map((p, i) => {
            const Visual = VISUALS[p.visual as keyof typeof VISUALS];
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group grid items-center gap-10 md:gap-16 lg:grid-cols-2",
                  reverse && "lg:[&>div:first-child]:order-2",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-electric/15 to-violet-mist/10 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.015] group-hover:shadow-[0_24px_80px_rgba(91,140,255,0.25)]">
                  <div className="absolute inset-0 grid place-items-center p-10">
                    <Visual />
                  </div>
                </div>
                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-[clamp(1.7rem,3vw,2.5rem)] font-bold leading-tight tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-graphite-100">{p.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-lg border border-white/[0.07] bg-electric/[0.07] px-3 py-1.5 font-mono text-[11px] text-electric-glow"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    data-cursor="link"
                    className="group/link mt-7 inline-flex items-center gap-2 text-sm font-medium text-bone"
                  >
                    <span className="relative">
                      View Case Study
                      <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-50 bg-electric transition-transform duration-300 group-hover/link:scale-x-100" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
