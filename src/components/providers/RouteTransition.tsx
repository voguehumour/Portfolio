"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/content";

const EASE = [0.85, 0, 0.15, 1] as const;

function labelFor(pathname: string): { index: string; label: string } {
  // exact match in NAV
  const exact = NAV.find((n) => n.href === pathname);
  if (exact) return { index: exact.index, label: exact.label };
  // dynamic route: take base
  const base = "/" + (pathname.split("/")[1] || "");
  const seg = NAV.find((n) => n.href === base);
  if (seg) return { index: seg.index, label: seg.label };
  return { index: "—", label: pathname.replace("/", "") || "Index" };
}

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [overlayKey, setOverlayKey] = useState<string | null>(null);
  const prev = useRef(pathname);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      // skip the first render — the loader already covers initial load
      isFirst.current = false;
      prev.current = pathname;
      return;
    }
    if (prev.current === pathname) return;
    prev.current = pathname;
    setOverlayKey(pathname + "-" + Date.now());
    // overlay clears itself via onAnimationComplete
  }, [pathname]);

  const meta = labelFor(pathname);

  return (
    <>
      <AnimatePresence>
        {overlayKey && (
          <motion.div
            key={overlayKey}
            initial={{ y: "100%" }}
            animate={{ y: ["100%", "0%", "0%", "-100%"] }}
            transition={{ duration: 1.4, ease: EASE, times: [0, 0.42, 0.6, 1] }}
            onAnimationComplete={() => setOverlayKey(null)}
            className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-ink-950"
          >
            <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-30" />
            <div className="pointer-events-none absolute inset-0 grain" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: [0, 1, 1, 0], y: [24, 0, 0, -24] }}
              transition={{ duration: 1.4, ease: EASE, times: [0, 0.45, 0.55, 1] }}
              className="text-center"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-graphite-200">
                · Scene {meta.index}
              </div>
              <div className="mt-4 font-display text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight">
                <span className="gradient-stroke">{meta.label}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
