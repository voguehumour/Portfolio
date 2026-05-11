"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Button } from "@/components/ui/Button";

const NeuralField = dynamic(() => import("@/components/three/NeuralField"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-glow-radial" />,
});

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Headline reveal
      const words = headline.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (words) {
        gsap.set(words, { yPercent: 110 });
        gsap.to(words, {
          yPercent: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.07,
          delay: 0.4,
        });
      }

      // Parallax + fade on scroll
      gsap.to(".hero-shift", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-fade", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <NeuralField />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/20 via-transparent to-ink-950" />
      <div className="pointer-events-none absolute inset-0 grain" />

      {/* Floating UI rails */}
      <div className="pointer-events-none absolute inset-x-0 top-28 z-10 mx-auto flex max-w-[1600px] items-start justify-between px-6 text-[10px] uppercase tracking-[0.32em] text-graphite-200 sm:px-10">
        <div className="hero-fade">
          <div className="text-bone/40">— Reel</div>
          <div className="mt-2">2016 / 2026</div>
        </div>
        <div className="hero-fade text-right">
          <div className="text-bone/40">— Index</div>
          <div className="mt-2">00 / 09</div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-24 sm:px-10 sm:pb-28">
        <div className="hero-shift max-w-6xl">
          <div className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-graphite-100">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-electric" />
            AI Consultant · Senior Product Designer · Creative Technologist
          </div>

          <h1
            ref={headline}
            className="font-display text-display-1 text-balance text-bone"
          >
            <span className="block overflow-hidden">
              <span data-word className="inline-block will-change-transform">
                Designing
              </span>{" "}
              <span data-word className="inline-block will-change-transform">
                intelligent
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-word className="inline-block italic text-bone/70 will-change-transform">
                digital
              </span>{" "}
              <span data-word className="inline-block will-change-transform gradient-stroke">
                experiences.
              </span>
            </span>
          </h1>

          <div className="mt-12 grid items-end gap-12 lg:grid-cols-[1fr_auto]">
            <p className="hero-shift max-w-2xl text-balance text-base leading-relaxed text-graphite-100 sm:text-lg">
              AI Consultant and Senior Product Designer crafting cinematic products,
              AI systems, creative workflows, immersive interfaces and next-generation
              digital experiences for studios, founders and brands.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/projects">View Projects</Button>
              <Button href="/contact" variant="outline">Book a consultation</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-fade pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.36em] text-graphite-200">
        <div className="mb-3 mx-auto h-12 w-px overflow-hidden bg-white/10">
          <div className="h-1/3 w-full animate-[fadeUp_2.4s_ease-in-out_infinite] bg-bone" />
        </div>
        Scroll
      </div>
    </section>
  );
}
