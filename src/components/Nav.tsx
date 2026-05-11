"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/content";
import { Magnetic } from "./ui/Magnetic";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-500",
          scrolled ? "py-4" : "py-6",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 sm:px-10">
          <Link
            href="/"
            data-cursor="link"
            data-cursor-label="Home"
            className="group flex items-center gap-3"
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-white/10 bg-ink-900">
              <span className="font-display text-base">A</span>
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: "inset 0 0 30px rgba(91,140,255,0.5)" }} />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm tracking-tight">{SITE.name}</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.32em] text-graphite-200">
                AI · Design · Tech
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] px-2 py-2 backdrop-blur-md lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="link"
                  className={cn(
                    "rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.2em] transition-colors",
                    active
                      ? "bg-white/10 text-bone"
                      : "text-graphite-100 hover:text-bone",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              data-cursor="link"
              data-cursor-label="Talk"
              className="hidden rounded-full border border-white/10 px-5 py-2.5 text-[11px] uppercase tracking-[0.28em] text-bone transition-colors hover:border-white/30 hover:bg-white/[0.04] md:inline-flex"
            >
              Start a project
            </Link>
            <Magnetic strength={0.25}>
              <button
                onClick={() => setOpen((v) => !v)}
                data-cursor="link"
                aria-label="Menu"
                className="relative grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-ink-900/80 backdrop-blur-md"
              >
                <span
                  className={cn(
                    "absolute h-px w-5 bg-bone transition-all duration-500",
                    open ? "rotate-45" : "-translate-y-1.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-5 bg-bone transition-all duration-500",
                    open ? "-rotate-45" : "translate-y-1.5",
                  )}
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] bg-ink-950"
          >
            <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-50" />
            <div className="pointer-events-none absolute inset-0 grain" />

            <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pb-12 pt-32 sm:px-10">
              <div>
                <div className="text-eyebrow text-graphite-200">— Index</div>
                <div className="mt-8 grid gap-2">
                  {NAV.map((item, i) => {
                    const active = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.045 }}
                      >
                        <Link
                          href={item.href}
                          data-cursor="link"
                          className={cn(
                            "group flex items-baseline gap-6 border-b border-white/[0.06] py-3 font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-none tracking-tight transition-colors",
                            active ? "text-bone" : "text-bone/60 hover:text-bone",
                          )}
                        >
                          <span className="text-[12px] tracking-[0.32em] text-graphite-300 sm:text-sm">
                            {item.index}
                          </span>
                          <span className="relative overflow-hidden">
                            <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                              {item.label}
                            </span>
                            <span className="absolute left-0 top-full inline-block italic text-electric transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                              {item.label}
                            </span>
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 text-[11px] uppercase tracking-[0.3em] text-graphite-200 md:grid-cols-4">
                <div>
                  <div className="mb-3 text-bone/40">Email</div>
                  <a href={`mailto:${SITE.email}`} className="text-bone">
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <div className="mb-3 text-bone/40">LinkedIn</div>
                  <a href={SITE.socials.linkedin} className="text-bone">
                    /animeshjaiswal
                  </a>
                </div>
                <div>
                  <div className="mb-3 text-bone/40">Behance</div>
                  <a href={SITE.socials.behance} className="text-bone">
                    /animeshjaiswal
                  </a>
                </div>
                <div>
                  <div className="mb-3 text-bone/40">Instagram</div>
                  <a href={SITE.socials.instagram} className="text-bone">
                    @animesh.designs
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
