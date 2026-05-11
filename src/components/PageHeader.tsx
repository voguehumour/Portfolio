"use client";

import dynamic from "next/dynamic";
import { SplitText } from "./ui/SplitText";

const AmbientField = dynamic(() => import("@/components/three/AmbientField"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-glow-radial" />,
});

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  index,
  tint,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  index?: string;
  tint?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[78svh] w-full flex-col justify-end overflow-hidden pb-20 pt-44 sm:min-h-[85svh] sm:pb-28">
      <div className="absolute inset-0">
        <AmbientField tint={tint || "#5b8cff"} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10">
        <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-graphite-200">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-bone/40" />
            {eyebrow}
          </div>
          {index && <div className="font-mono text-bone/60">— {index}</div>}
        </div>
        <SplitText as="h1" className="font-display text-display-1 text-balance tracking-tight">
          {title}
        </SplitText>
        {subtitle && (
          <p className="mt-10 max-w-2xl text-balance text-base leading-relaxed text-graphite-100 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
