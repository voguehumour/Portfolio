"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { HERO_ROLES } from "@/lib/content";

const NeuralField = dynamic(() => import("@/components/three/NeuralField"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-glow-radial" />,
});

export function HeroParticles() {
  const root = useRef<HTMLElement>(null);
  const subhead = useRef<HTMLParagraphElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Split subheadline into words
      if (subhead.current) {
        const text = subhead.current.dataset.text || subhead.current.textContent || "";
        subhead.current.innerHTML = text
          .split(" ")
          .map((w) => `<span class="hero-word inline-block opacity-0 translate-y-2">${w}</span>`)
          .join(" ");
      }

      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(".hero-line-1 > span", { x: -120, opacity: 0, duration: 0.95, ease: "power3.out" }, 0.15)
        .from(".hero-line-2 > span", { x: 120, opacity: 0, duration: 0.95, ease: "power3.out" }, 0.3)
        .to(".hero-word", { y: 0, opacity: 1, stagger: 0.022, duration: 0.5, ease: "power2.out" }, 0.55)
        .from(".hero-cta", { scale: 0.85, opacity: 0, stagger: 0.1, duration: 0.55, ease: "back.out(2)" }, 0.85)
        .from(".scroll-cue", { y: -10, opacity: 0, duration: 0.5, ease: "power3.out" }, 1.15);

      // Parallax fade on scroll
      gsap.to(".hero-fade", {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Role typing rotator
  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIdx((i) => (i + 1) % HERO_ROLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative isolate flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Three.js particle field */}
      <div className="absolute inset-0 -z-10">
        <NeuralField />
      </div>

      {/* Vignette + grain */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />
      <div className="pointer-events-none absolute inset-0 -z-10 grain" />

      {/* Floating UI rails */}
      <div className="pointer-events-none absolute inset-x-0 top-28 mx-auto flex max-w-[1600px] items-start justify-between px-6 text-[10px] uppercase tracking-[0.32em] text-graphite-200 sm:px-10">
        <div className="hero-fade">
          <div className="text-bone/40">— Reel</div>
          <div className="mt-2">2022 / 2026</div>
        </div>
        <div className="hero-fade text-right">
          <div className="text-bone/40">— Index</div>
          <div className="mt-2">01 / 12</div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 text-center sm:px-10">
        <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/60 px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-graphite-100 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <motion.span
            key={roleIdx}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 6, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-electric-glow"
          >
            {HERO_ROLES[roleIdx]}
          </motion.span>
          <span className="text-bone/30">×</span>
          <span>Product Designer</span>
        </div>

        <h1 className="font-display text-display-1 text-balance leading-[0.9] tracking-tight">
          <span className="hero-line-1 block overflow-hidden">
            <span className="inline-block gradient-stroke">Animesh</span>
          </span>
          <span className="hero-line-2 block overflow-hidden">
            <span className="inline-block gradient-stroke">Jaiswal</span>
          </span>
        </h1>

        <p
          ref={subhead}
          data-text="Designing the intelligent edge — where AI strategy meets human-centered product thinking."
          className="mx-auto mt-8 max-w-[640px] text-balance text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-graphite-100"
        >
          Designing the intelligent edge — where AI strategy meets human-centered product thinking.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/#work" className="hero-cta inline-block">
            <Magnetic strength={0.3}>
              <span
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-full bg-electric px-7 py-4 text-[12px] uppercase tracking-[0.22em] text-white shadow-[0_8px_40px_rgba(91,140,255,0.4)] transition-all duration-300 hover:bg-electric-glow hover:shadow-[0_12px_56px_rgba(91,140,255,0.6)]"
              >
                View Work
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Magnetic>
          </Link>
          <Link href="/#contact" className="hero-cta inline-block">
            <Magnetic strength={0.3}>
              <span
                data-cursor="link"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-ink-900/60 px-7 py-4 text-[12px] uppercase tracking-[0.22em] text-bone backdrop-blur-md transition-all duration-300 hover:border-violet-mist/60 hover:bg-white/[0.04]"
              >
                Let's Talk
              </span>
            </Magnetic>
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="relative block h-10 w-px overflow-hidden bg-gradient-to-b from-transparent via-electric to-transparent">
          <span className="absolute -top-2 left-1/2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-electric shadow-[0_0_8px_#5b8cff]"
            style={{ animation: "scrollDot 2.2s infinite ease-in-out" }} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite-300">
          Scroll to explore
        </span>
      </div>

      <style jsx>{`
        @keyframes scrollDot {
          0% { transform: translate(-50%, 0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-50%, 50px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
