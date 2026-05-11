import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  return { title: p?.title || "Insight", description: p?.excerpt };
}

const BODY = `There is a quiet shift happening underneath the products we use. The agent is no longer a feature inside a product — it is becoming the product itself. The interface, then, is a stage on which the model performs, and our job as designers is to direct the performance.

The old grammar of interface design was about reducing friction. The new grammar is about increasing legibility — making the model's reasoning visible, its constraints felt, and its handoffs graceful. Friction is sometimes a feature. A small pause before an irreversible action is not a flaw; it is design.

We are early. The vocabulary is still being written. But the work is real, the stakes are higher, and the craft compounds.`;

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const idx = POSTS.findIndex((p) => p.slug === slug);
  const next = POSTS[(idx + 1) % POSTS.length];

  return (
    <article>
      <section className="relative isolate flex min-h-[70svh] w-full flex-col justify-end overflow-hidden pb-20 pt-40">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 50% at 30% 40%, rgba(91,140,255,0.35), transparent 70%), radial-gradient(40% 60% at 80% 60%, rgba(155,135,255,0.25), transparent 70%), linear-gradient(180deg, #050507 0%, #0a0a0d 100%)",
          }}
        />
        <div className="grain absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-ink-950" />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-10">
          <Link href="/blog" data-cursor="link" className="mb-10 inline-block text-[11px] uppercase tracking-[0.32em] text-graphite-200 hover:text-bone">
            ← All insights
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-graphite-200">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.read}</span>
          </div>
          <h1 className="mt-8 font-display text-display-1 leading-[0.9] tracking-tight text-balance">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="relative bg-ink-950 py-24">
        <div className="mx-auto max-w-[760px] px-6 sm:px-10">
          <p className="font-display text-2xl leading-relaxed text-bone/90 sm:text-3xl">
            {post.excerpt}
          </p>
          <div className="mt-12 space-y-6 leading-relaxed text-graphite-100">
            {BODY.split("\n\n").map((p, i) => (
              <p key={i} className="text-lg">{p}</p>
            ))}
            <hr className="my-12 border-white/10" />
            <p className="text-lg">
              If this resonates and you're shipping something in this space, <Link href="/contact" className="text-bone underline decoration-electric underline-offset-4">say hello</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-ink-900 py-24">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Link href={`/blog/${next.slug}`} data-cursor="link" className="group block">
            <div className="text-eyebrow text-graphite-200">— Next read</div>
            <h2 className="mt-6 font-display text-display-3 leading-[0.95] tracking-tight transition-colors group-hover:text-electric">
              {next.title}
            </h2>
            <div className="mt-4 text-[12px] uppercase tracking-[0.28em] text-graphite-100">
              {next.category} · {next.read}
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
