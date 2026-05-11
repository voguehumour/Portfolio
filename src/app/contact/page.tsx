"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE } from "@/lib/content";

const AmbientField = dynamic(() => import("@/components/three/AmbientField"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-glow-radial" />,
});

const SUBJECTS = ["AI Consulting", "Product Design", "Creative Direction", "Workshop / Talk"];
const BUDGETS = ["< $15k", "$15k — $40k", "$40k — $100k", "$100k+"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], budget: BUDGETS[1], message: "" });
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onChange = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something refracted. Try again.");
        return;
      }
      setSent(true);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  };

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0">
          <AmbientField tint="#9b87ff" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/20 via-transparent to-ink-950" />
        <div className="pointer-events-none absolute inset-0 grain" />

        <div className="relative z-10 mx-auto grid max-w-[1600px] gap-16 px-6 sm:px-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-graphite-200">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-bone/40" /> Contact
              </div>
              <div className="font-mono text-bone/60">— 09 / 09</div>
            </div>

            <h1 className="font-display text-display-1 leading-[0.9] tracking-tight text-balance">
              Let's make something <span className="italic text-bone/60">extraordinary.</span>
            </h1>
            <p className="mt-10 max-w-md text-balance leading-relaxed text-graphite-100 sm:text-lg">
              I'm currently accepting a small number of engagements for Q3 2026. If you're building
              something that needs senior product design, AI integration or creative direction — let's talk.
            </p>

            <div className="mt-12 space-y-6 text-[12px] uppercase tracking-[0.24em]">
              <div>
                <div className="text-bone/40">Email</div>
                <a href={`mailto:${SITE.email}`} className="mt-2 inline-block text-lg normal-case tracking-normal text-bone">
                  {SITE.email}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-bone/40">LinkedIn</div>
                  <a href={SITE.socials.linkedin} className="mt-2 inline-block text-bone">/animeshjaiswal</a>
                </div>
                <div>
                  <div className="text-bone/40">Behance</div>
                  <a href={SITE.socials.behance} className="mt-2 inline-block text-bone">/animeshjaiswal</a>
                </div>
                <div>
                  <div className="text-bone/40">GitHub</div>
                  <a href={SITE.socials.github} className="mt-2 inline-block text-bone">/animeshjaiswal</a>
                </div>
                <div>
                  <div className="text-bone/40">Instagram</div>
                  <a href={SITE.socials.instagram} className="mt-2 inline-block text-bone">@animesh.designs</a>
                </div>
              </div>
            </div>

            <div className="mt-12 glass overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between p-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-graphite-200">Calendar</div>
                  <div className="mt-2 font-display text-2xl tracking-tight">Book a 30-minute intro</div>
                </div>
                <Magnetic strength={0.3}>
                  <a
                    href={`https://cal.com/${SITE.calcom}`}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="inline-block rounded-full bg-bone px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-ink-950"
                  >
                    Open Cal ↗
                  </a>
                </Magnetic>
              </div>
              <div className="relative h-[420px] w-full border-t border-white/[0.06]">
                <iframe
                  title="Book a call"
                  src={`https://cal.com/${SITE.calcom}?embed=true&theme=dark&hideEventTypeDetails=false`}
                  className="absolute inset-0 h-full w-full"
                  style={{ colorScheme: "dark" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="glass-strong relative rounded-3xl p-8 sm:p-12">
            {sent ? (
              <div className="flex h-full min-h-[480px] flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-electric/40">
                  <span className="h-3 w-3 animate-pulse-glow rounded-full bg-electric" />
                </div>
                <h2 className="mt-8 font-display text-display-3 tracking-tight">Message received.</h2>
                <p className="mt-4 max-w-md text-balance text-graphite-100">
                  Thank you, {form.name || "friend"}. I read every message myself and reply within 48 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-graphite-200">
                  <span>New enquiry</span>
                  <span>· Encrypted</span>
                </div>

                <div className="space-y-8">
                  <Field label="Your name">
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => onChange("name", e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full border-b border-white/10 bg-transparent py-3 font-display text-2xl text-bone placeholder:text-bone/30 focus:border-electric focus:outline-none"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => onChange("email", e.target.value)}
                      placeholder="you@studio.com"
                      className="w-full border-b border-white/10 bg-transparent py-3 font-display text-2xl text-bone placeholder:text-bone/30 focus:border-electric focus:outline-none"
                    />
                  </Field>
                  <Field label="Subject">
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => onChange("subject", s)}
                          data-cursor="link"
                          className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                            form.subject === s
                              ? "border-bone bg-bone text-ink-950"
                              : "border-white/10 text-graphite-100 hover:border-white/30 hover:text-bone"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Budget">
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => onChange("budget", s)}
                          data-cursor="link"
                          className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                            form.budget === s
                              ? "border-bone bg-bone text-ink-950"
                              : "border-white/10 text-graphite-100 hover:border-white/30 hover:text-bone"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Tell me about the project">
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => onChange("message", e.target.value)}
                      rows={5}
                      placeholder="The brief, the dream, the constraints…"
                      className="w-full resize-none border-b border-white/10 bg-transparent py-3 text-base leading-relaxed text-bone placeholder:text-bone/30 focus:border-electric focus:outline-none"
                    />
                  </Field>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-graphite-200">
                    {errorMsg ? <span className="text-violet-mist">{errorMsg}</span> : "Response in 48h"}
                  </div>
                  <Magnetic strength={0.3}>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor="link"
                      className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-[12px] uppercase tracking-[0.28em] text-ink-950 transition-transform disabled:opacity-60"
                    >
                      {status === "sending" ? "Transmitting…" : "Send transmission"}
                      <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-electric" />
                    </button>
                  </Magnetic>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.28em] text-graphite-200">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
