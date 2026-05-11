"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities() {
  return (
    <section className="relative bg-ink-950 py-32 sm:py-48">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-20 grid items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-eyebrow text-graphite-200">— Capabilities</div>
            <h2 className="mt-6 font-display text-display-2 tracking-tight">
              A studio practice for <span className="italic text-bone/60">AI-native teams.</span>
            </h2>
          </div>
          <p className="text-pretty text-graphite-100">
            I move fluently between strategy, design, motion and engineering — embedded
            with founders and creative teams as a senior partner, not a vendor. Each
            engagement is shaped around leverage, not deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link
                href="/services"
                data-cursor="link"
                className="group relative block h-full bg-ink-900 p-8 transition-colors hover:bg-ink-800"
              >
                <div className="mb-12 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite-300">
                  · 0{i + 1}
                </div>
                <h3 className="font-display text-[1.6rem] leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-graphite-100">{s.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-bone/40 transition-colors group-hover:text-bone">
                  Explore
                  <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
                </div>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(400px 200px at 50% 0%, rgba(91,140,255,0.12), transparent 70%)" }}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
