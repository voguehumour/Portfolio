"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const labelEl = labelRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let dx = mx;
    let dy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setHidden(false);
    };
    const onLeave = () => setHidden(true);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dx += (mx - dx) * 0.42;
      dy += (my - dy) * 0.42;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      labelEl.style.transform = `translate3d(${rx}px, ${ry + 28}px, 0) translate(-50%, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const enterables = "a, button, [data-cursor], input, textarea";
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(enterables) as HTMLElement | null;
      if (!t) {
        ring.dataset.state = "default";
        setLabel(null);
        return;
      }
      const next = t.getAttribute("data-cursor");
      ring.dataset.state = next || "link";
      setLabel(t.getAttribute("data-cursor-label"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        data-state="default"
        className={`pointer-events-none fixed left-0 top-0 z-[120] h-9 w-9 rounded-full border border-white/30 mix-blend-difference transition-[width,height,opacity,border-color,background-color] duration-300 ease-out data-[state=link]:h-14 data-[state=link]:w-14 data-[state=link]:border-electric/80 data-[state=view]:h-24 data-[state=view]:w-24 data-[state=view]:bg-white/5 data-[state=view]:backdrop-blur-md ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[121] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[122] text-[10px] uppercase tracking-[0.32em] text-white/80"
        style={{ willChange: "transform" }}
      >
        {label}
      </div>
    </>
  );
}
