"use client";

import Link from "next/link";
import { SITE, NAV } from "@/lib/content";
import { Magnetic } from "./ui/Magnetic";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-40" />
      <div className="relative mx-auto max-w-[1600px] px-6 pb-10 pt-24 sm:px-10 sm:pb-14 sm:pt-32">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="text-eyebrow text-graphite-200">— Have a project in mind</div>
            <h2 className="mt-8 font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] tracking-tight">
              <span className="block">Let's build something</span>
              <span className="block italic text-bone/60">unforgettable.</span>
            </h2>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${SITE.email}`}
                  data-cursor="link"
                  data-cursor-label="Email"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-bone px-8 py-5 text-[12px] uppercase tracking-[0.28em] text-ink-950"
                >
                  {SITE.email}
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-electric" />
                </a>
              </Magnetic>
              <Link
                href="/contact"
                data-cursor="link"
                className="text-[12px] uppercase tracking-[0.28em] text-graphite-100 hover:text-bone"
              >
                Book a call →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 text-[12px] uppercase tracking-[0.24em]">
            <div>
              <div className="mb-5 text-bone/40">Navigate</div>
              <ul className="space-y-3">
                {NAV.slice(0, 6).map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} data-cursor="link" className="text-bone/80 hover:text-bone">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-5 text-bone/40">Elsewhere</div>
              <ul className="space-y-3">
                <li>
                  <a href={SITE.socials.linkedin} className="text-bone/80 hover:text-bone">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={SITE.socials.behance} className="text-bone/80 hover:text-bone">
                    Behance
                  </a>
                </li>
                <li>
                  <a href={SITE.socials.github} className="text-bone/80 hover:text-bone">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={SITE.socials.instagram} className="text-bone/80 hover:text-bone">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-white/[0.06] pt-8 text-[11px] uppercase tracking-[0.28em] text-graphite-200 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-electric" />
            Available · Q3 2026
          </div>
          <div>Crafted in deep focus · Mumbai / Remote</div>
        </div>

        <div className="pointer-events-none mt-10 select-none overflow-hidden">
          <div className="font-display text-[clamp(5rem,22vw,22rem)] leading-none tracking-[-0.06em] text-bone/[0.06]">
            animesh.
          </div>
        </div>
      </div>
    </footer>
  );
}
