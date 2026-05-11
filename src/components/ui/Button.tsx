"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  onClick?: () => void;
  arrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  arrow = true,
}: Props) {
  const base =
    "group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-[13px] uppercase tracking-[0.22em] transition-colors duration-300";
  const styles = {
    primary:
      "bg-bone text-ink-950 hover:bg-white shadow-[0_0_40px_rgba(91,140,255,0.35)]",
    ghost: "text-bone hover:text-white",
    outline:
      "border border-white/15 text-bone hover:border-white/40 hover:bg-white/[0.03]",
  } as const;

  const inner = (
    <span className={cn(base, styles[variant], className)} data-cursor="link">
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span className="relative z-10 grid h-6 w-6 place-items-center overflow-hidden rounded-full">
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:-translate-y-3" />
          <ArrowUpRight className="absolute h-3.5 w-3.5 -translate-x-3 translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: "0 0 80px rgba(91,140,255,0.65), inset 0 0 30px rgba(155,135,255,0.25)" }} />
      )}
    </span>
  );

  const wrapped = <Magnetic strength={0.35}>{inner}</Magnetic>;

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {wrapped}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="inline-block">
      {wrapped}
    </button>
  );
}
