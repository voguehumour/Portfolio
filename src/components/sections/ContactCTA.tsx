"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Linkedin, Github, Dribbble, Mail } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE } from "@/lib/content";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function scrambleTo(el: HTMLElement, target: string) {
  const total = 32;
  const queue = target.split("").map(() => ({
    start: Math.floor(Math.random() * 12),
    end: 12 + Math.floor(Math.random() * 22),
  }));
  let frame = 0;
  const tick = () => {
    let out = "";
    let done = 0;
    for (let i = 0; i < target.length; i++) {
      const q = queue[i];
      if (frame >= q.end) { out += target[i]; done++; }
      else if (frame >= q.start)
        out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      else out += target[i] === " " ? " " : " ";
    }
    el.textContent = out;
    frame++;
    if (done < target.length && frame < total + 5) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

const WORDS = ["Let's", "build", "something", "intelligent."];

export function ContactCTA() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.3, once: true });
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!inView) return;
    WORDS.forEach((w, i) => {
      const el = refs.current[i];
      if (el) {
        window.setTimeout(() => scrambleTo(el, w), i * 180);
      }
    });
  }, [inView]);

  return (
    <section
      id="contact"
      ref={root}
      className="relative overflow-hidden px-6 py-32 text-center sm:px-10 sm:py-44"
    >
      {/* Animated mesh background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(91,140,255,0.18), transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(155,135,255,0.15), transparent 50%)",
          animation: "meshShift 14s infinite alternate ease-in-out",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 grain" />

      <div className="mx-auto max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display text-balance font-bold leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          {WORDS.map((w, i) => (
            <span
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              className="block transition-all duration-500 hover:text-electric hover:[text-shadow:0_0_40px_rgba(91,140,255,0.6)]"
            >
              {w}
            </span>
          ))}
        </motion.h2>

        <div className="mt-14 flex flex-col items-center gap-6">
          <a
            href={`mailto:${SITE.email}`}
            data-cursor="link"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-ink-800/60 px-5 py-2.5 font-mono text-[13px] text-bone backdrop-blur-md transition-all duration-300 hover:border-electric/60 hover:shadow-[0_0_24px_rgba(91,140,255,0.4)]"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
            {SITE.email}
          </a>

          <div className="flex gap-3">
            {[
              { href: SITE.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: SITE.socials.behance, label: "Dribbble", Icon: Dribbble },
              { href: SITE.socials.github, label: "GitHub", Icon: Github },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                data-cursor="link"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.08] bg-ink-800/60 text-bone transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10 hover:shadow-[0_8px_24px_rgba(91,140,255,0.3)]"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <Link href={`mailto:${SITE.email}?subject=Let%27s%20talk`} className="mt-2 inline-block">
            <Magnetic strength={0.3}>
              <span
                data-cursor="link"
                className="inline-flex items-center gap-3 rounded-full bg-electric px-7 py-4 text-[12px] uppercase tracking-[0.22em] text-white shadow-[0_8px_40px_rgba(91,140,255,0.4)] transition-all duration-300 hover:bg-electric-glow hover:shadow-[0_12px_56px_rgba(91,140,255,0.6)]"
              >
                Book a call →
              </span>
            </Magnetic>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes meshShift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-3%, 2%) scale(1.1); }
        }
      `}</style>
    </section>
  );
}
