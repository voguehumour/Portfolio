"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="grid min-h-screen place-items-center bg-ink-950 px-6 text-center">
      <div>
        <div className="text-eyebrow text-graphite-200">— Glitch detected</div>
        <h1 className="mt-6 font-display text-display-2 tracking-tight">Something refracted.</h1>
        <div className="mt-10 flex justify-center">
          <button onClick={reset} className="inline-block">
            <Button>Try again</Button>
          </button>
        </div>
      </div>
    </section>
  );
}
