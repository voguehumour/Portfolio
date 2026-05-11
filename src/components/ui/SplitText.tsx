"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
  by?: "char" | "word";
};

export function SplitText({
  children,
  className = "",
  as = "h2",
  delay = 0,
  stagger = 0.04,
  trigger = true,
  by = "word",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    el.textContent = "";

    const parts = by === "word" ? text.split(/(\s+)/) : Array.from(text);
    const spans: HTMLSpanElement[] = [];

    parts.forEach((p) => {
      if (/^\s+$/.test(p)) {
        el.appendChild(document.createTextNode(p));
      } else {
        const wrap = document.createElement("span");
        wrap.className = "inline-block overflow-hidden align-baseline";
        const inner = document.createElement("span");
        inner.className = "inline-block will-change-transform";
        inner.textContent = p;
        inner.style.transform = "translateY(110%)";
        wrap.appendChild(inner);
        el.appendChild(wrap);
        spans.push(inner);
      }
    });

    const tween = gsap.to(spans, {
      y: "0%",
      duration: 1.1,
      ease: "expo.out",
      stagger,
      delay,
      paused: trigger,
    });

    if (trigger) {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => tween.play(),
      });
      return () => {
        st.kill();
        tween.kill();
      };
    }
    tween.play();
    return () => {
      tween.kill();
    };
  }, [by, delay, stagger, trigger]);

  const Tag = as as unknown as React.ElementType;
  return (
    <Tag ref={ref as React.MutableRefObject<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
