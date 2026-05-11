import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-ink-950 px-6">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-40" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative z-10 text-center">
        <div className="text-eyebrow text-graphite-200">— Error · 404</div>
        <h1 className="mt-8 font-display text-[clamp(5rem,18vw,16rem)] leading-none tracking-tight">
          <span className="gradient-stroke">404</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-balance text-graphite-100">
          The scene you're looking for hasn't been written yet. Let's get you back to the main reel.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/">Return to index</Button>
        </div>
      </div>
    </section>
  );
}
