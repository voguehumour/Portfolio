"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

type Chip =
  | { kind: "pill"; label: string; color: ChipColor; size?: "sm" | "md" | "lg" }
  | { kind: "circle"; emoji: string; color: ChipColor };

type ChipColor = "ink" | "electric" | "violet" | "bone" | "graphite" | "outline";

const PALETTE: Record<ChipColor, { bg: string; fg: string; border: string }> = {
  ink: { bg: "#15161c", fg: "#f4f3ef", border: "rgba(255,255,255,0.08)" },
  electric: { bg: "#5b8cff", fg: "#050507", border: "rgba(255,255,255,0.18)" },
  violet: { bg: "#9b87ff", fg: "#050507", border: "rgba(255,255,255,0.18)" },
  bone: { bg: "#f4f3ef", fg: "#050507", border: "rgba(0,0,0,0.08)" },
  graphite: { bg: "#272832", fg: "#f4f3ef", border: "rgba(255,255,255,0.08)" },
  outline: { bg: "transparent", fg: "#f4f3ef", border: "rgba(255,255,255,0.18)" },
};

const SETS: Record<string, Chip[]> = {
  "Core Capabilities": [
    { kind: "pill", label: "AI Strategy", color: "electric", size: "lg" },
    { kind: "pill", label: "Senior Product Design", color: "ink" },
    { kind: "pill", label: "Creative Direction", color: "violet" },
    { kind: "pill", label: "Motion Systems", color: "outline" },
    { kind: "pill", label: "Design Systems", color: "graphite" },
    { kind: "pill", label: "ComfyUI Engineering", color: "bone", size: "lg" },
    { kind: "pill", label: "Generative Video", color: "electric" },
    { kind: "pill", label: "Editorial UX", color: "outline" },
    { kind: "pill", label: "Agentic Architecture", color: "violet" },
    { kind: "pill", label: "Prompt Direction", color: "ink" },
    { kind: "pill", label: "Workshops & Training", color: "graphite" },
    { kind: "pill", label: "Brand Worlds", color: "outline" },
    { kind: "pill", label: "Immersive Web", color: "electric", size: "lg" },
    { kind: "pill", label: "Research", color: "ink" },
    { kind: "circle", emoji: "✦", color: "violet" },
    { kind: "circle", emoji: "◎", color: "electric" },
    { kind: "circle", emoji: "◐", color: "ink" },
    { kind: "circle", emoji: "△", color: "graphite" },
    { kind: "circle", emoji: "✺", color: "bone" },
  ],
  "Tech Stack": [
    { kind: "pill", label: "Next.js", color: "ink", size: "lg" },
    { kind: "pill", label: "React", color: "electric" },
    { kind: "pill", label: "TypeScript", color: "outline" },
    { kind: "pill", label: "Three.js / R3F", color: "violet", size: "lg" },
    { kind: "pill", label: "GSAP", color: "graphite" },
    { kind: "pill", label: "Framer Motion", color: "outline" },
    { kind: "pill", label: "WebGL · GLSL", color: "bone" },
    { kind: "pill", label: "Tailwind", color: "ink" },
    { kind: "pill", label: "ComfyUI", color: "electric", size: "lg" },
    { kind: "pill", label: "Veo · Runway", color: "violet" },
    { kind: "pill", label: "OpenAI · Anthropic", color: "graphite" },
    { kind: "pill", label: "Figma", color: "outline" },
    { kind: "pill", label: "Rive", color: "ink" },
    { kind: "pill", label: "Vercel", color: "outline" },
    { kind: "pill", label: "Cursor", color: "graphite" },
    { kind: "circle", emoji: "⌘", color: "electric" },
    { kind: "circle", emoji: "✦", color: "violet" },
    { kind: "circle", emoji: "◇", color: "bone" },
    { kind: "circle", emoji: "❍", color: "ink" },
  ],
  "Services": [
    { kind: "pill", label: "AI Consulting", color: "electric", size: "lg" },
    { kind: "pill", label: "Product Design", color: "ink" },
    { kind: "pill", label: "Creative Direction", color: "violet" },
    { kind: "pill", label: "Workflow Automation", color: "outline" },
    { kind: "pill", label: "ComfyUI Systems", color: "bone" },
    { kind: "pill", label: "Generative Video", color: "violet", size: "lg" },
    { kind: "pill", label: "Motion Systems", color: "graphite" },
    { kind: "pill", label: "UX Strategy", color: "ink" },
    { kind: "pill", label: "Brand Worlds", color: "electric" },
    { kind: "pill", label: "Workshops", color: "outline" },
    { kind: "pill", label: "Advisory", color: "graphite" },
    { kind: "pill", label: "Launch Direction", color: "outline" },
    { kind: "circle", emoji: "★", color: "electric" },
    { kind: "circle", emoji: "◉", color: "ink" },
    { kind: "circle", emoji: "✺", color: "violet" },
    { kind: "circle", emoji: "◇", color: "bone" },
  ],
};

type Body = {
  id: number;
  body: Matter.Body;
  el: HTMLDivElement;
  width: number;
  height: number;
  isCircle: boolean;
};

export function SkillsPile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<Body[]>([]);
  const rafRef = useRef<number>(0);
  const tabsRef = useRef<string[]>(Object.keys(SETS));
  const [activeTab, setActiveTab] = useState<string>(tabsRef.current[0]);
  const tabsInitialized = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    if (!stage || !overlay) return;

    let width = stage.clientWidth;
    let height = stage.clientHeight;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.1, scale: 0.0014 },
    });
    engineRef.current = engine;

    const wallOpts = { isStatic: true, render: { visible: false } };
    const wallThickness = 200;
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOpts),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOpts),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOpts),
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2 - 200, width * 2, wallThickness, wallOpts),
    ];
    Matter.Composite.add(engine.world, walls);

    // Mouse drag
    const mouse = Matter.Mouse.create(stage);
    // disable wheel hijack
    (mouse as unknown as { element: HTMLElement }).element.removeEventListener?.(
      "wheel",
      (mouse as unknown as { mousewheel: EventListener }).mousewheel,
    );
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.18, damping: 0.2, render: { visible: false } },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // Render loop syncs DOM transforms to bodies
    const tick = () => {
      for (const b of bodiesRef.current) {
        const { position, angle } = b.body;
        b.el.style.transform = `translate3d(${position.x - b.width / 2}px, ${position.y - b.height / 2}px, 0) rotate(${angle}rad)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Resize
    const onResize = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      width = w;
      height = h;
      Matter.Body.setPosition(walls[0], { x: w / 2, y: h + wallThickness / 2 });
      Matter.Body.setPosition(walls[1], { x: -wallThickness / 2, y: h / 2 });
      Matter.Body.setPosition(walls[2], { x: w + wallThickness / 2, y: h / 2 });
      Matter.Body.setPosition(walls[3], { x: w / 2, y: -wallThickness / 2 - 200 });
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(stage);

    // initial chips
    populate(activeTab);
    tabsInitialized.current = true;

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      bodiesRef.current.forEach((b) => b.el.remove());
      bodiesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Repopulate when tab changes (after init)
  useEffect(() => {
    if (!tabsInitialized.current) return;
    populate(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  function populate(tab: string) {
    const engine = engineRef.current;
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    if (!engine || !overlay || !stage) return;

    // remove old
    for (const b of bodiesRef.current) {
      Matter.Composite.remove(engine.world, b.body);
      b.el.remove();
    }
    bodiesRef.current = [];

    const width = stage.clientWidth;
    const chips = SETS[tab];

    // measure each chip first by rendering off-screen (kept hidden)
    const created: Body[] = [];
    chips.forEach((chip, i) => {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.top = "0";
      el.style.left = "0";
      el.style.willChange = "transform";
      el.style.userSelect = "none";
      el.style.pointerEvents = "none";

      const palette = PALETTE[chip.color];
      if (chip.kind === "pill") {
        const sizeCls = chip.size === "lg" ? "px-7 py-4 text-base sm:text-lg" : chip.size === "sm" ? "px-4 py-2 text-xs" : "px-5 py-3 text-sm sm:text-[15px]";
        el.className = `inline-flex items-center justify-center rounded-full font-display tracking-tight whitespace-nowrap shadow-[0_4px_24px_rgba(91,140,255,0.12)] ${sizeCls}`;
        el.style.background = palette.bg;
        el.style.color = palette.fg;
        el.style.border = `1px solid ${palette.border}`;
        el.style.backdropFilter = chip.color === "outline" ? "blur(10px)" : "";
        el.textContent = chip.label;
      } else {
        el.className = "grid place-items-center rounded-full font-display text-xl sm:text-2xl";
        el.style.background = palette.bg;
        el.style.color = palette.fg;
        el.style.border = `1px solid ${palette.border}`;
        el.style.width = "60px";
        el.style.height = "60px";
        el.textContent = chip.emoji;
      }
      // soft glow
      if (chip.color === "electric") el.style.boxShadow = "0 0 30px rgba(91,140,255,0.4)";
      if (chip.color === "violet") el.style.boxShadow = "0 0 30px rgba(155,135,255,0.35)";

      // measure
      el.style.visibility = "hidden";
      overlay.appendChild(el);
      const rect = el.getBoundingClientRect();
      const w = chip.kind === "circle" ? 60 : Math.max(rect.width, 60);
      const h = chip.kind === "circle" ? 60 : Math.max(rect.height, 36);
      el.style.visibility = "visible";

      const x = 60 + Math.random() * (width - 120);
      const y = -100 - i * 60 - Math.random() * 200;
      const isCircle = chip.kind === "circle";

      const body = isCircle
        ? Matter.Bodies.circle(x, y, w / 2, {
            restitution: 0.45,
            friction: 0.18,
            frictionAir: 0.012,
            density: 0.0018,
          })
        : Matter.Bodies.rectangle(x, y, w, h, {
            restitution: 0.32,
            friction: 0.22,
            frictionAir: 0.012,
            density: 0.0014,
            chamfer: { radius: h / 2 },
          } as Matter.IChamferableBodyDefinition);
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.4);
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      Matter.Composite.add(engine.world, body);
      created.push({ id: body.id, body, el, width: w, height: h, isCircle });
    });

    bodiesRef.current = created;

    // Re-enable pointer events after a frame so initial fall is dramatic
    requestAnimationFrame(() => {
      created.forEach((b) => (b.el.style.pointerEvents = "auto"));
    });
  }

  function shake() {
    const bodies = bodiesRef.current;
    bodies.forEach((b) => {
      Matter.Body.applyForce(b.body, b.body.position, {
        x: (Math.random() - 0.5) * 0.06,
        y: -Math.random() * 0.08 - 0.02,
      });
      Matter.Body.setAngularVelocity(b.body, (Math.random() - 0.5) * 0.2);
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] p-1.5 backdrop-blur-md">
          {tabsRef.current.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-cursor="link"
              className={`rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                activeTab === tab ? "bg-bone text-ink-950" : "text-graphite-100 hover:text-bone"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={shake}
          data-cursor="link"
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-bone hover:border-white/30 hover:bg-white/[0.04]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-electric transition-transform duration-500 group-hover:scale-150" />
          Shake
        </button>
      </div>

      <div
        ref={stageRef}
        className="relative h-[68vh] min-h-[480px] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900"
        data-cursor="view"
        data-cursor-label="Drag"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(91,140,255,0.12), transparent 70%), radial-gradient(40% 60% at 80% 30%, rgba(155,135,255,0.08), transparent 70%)",
          }}
        />
        <div className="grain absolute inset-0 opacity-30" />

        {/* Section label */}
        <div className="pointer-events-none absolute left-6 top-6 text-[10px] uppercase tracking-[0.32em] text-graphite-200">
          · Drop & drag the chips
        </div>
        <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite-200">
          {activeTab}
        </div>

        {/* Physics chips overlay */}
        <div ref={overlayRef} className="absolute inset-0" />
      </div>
    </div>
  );
}
