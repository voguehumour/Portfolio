"use client";

import dynamic from "next/dynamic";

const SkillsPile = dynamic(
  () => import("./SkillsPile").then((m) => m.SkillsPile),
  {
    ssr: false,
    loading: () => (
      <div className="h-[68vh] min-h-[480px] w-full rounded-2xl border border-white/[0.06] bg-ink-900" />
    ),
  },
);

export function SkillsPileSection() {
  return (
    <section className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="text-eyebrow text-graphite-200">— Skills</div>
            <h2 className="mt-6 font-display text-display-2 leading-[0.95] tracking-tight">
              The toolkit, <span className="italic text-bone/60">with weight.</span>
            </h2>
          </div>
          <p className="text-pretty leading-relaxed text-graphite-100">
            A live pile of the disciplines and tools I work with. Drag the chips —
            switch tabs to swap categories. They have gravity and friction, like the
            best collaborations.
          </p>
        </div>
        <SkillsPile />
      </div>
    </section>
  );
}
