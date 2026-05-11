import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { POSTS } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  return {
    title: p?.title || "Insight",
    description: p?.excerpt,
    openGraph: p ? { images: [p.cover] } : undefined,
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const idx = POSTS.findIndex((p) => p.slug === slug);
  const next = POSTS[(idx + 1) % POSTS.length];

  return (
    <article>
      <section className="relative isolate flex min-h-[78svh] w-full flex-col justify-end overflow-hidden pb-20 pt-40">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover opacity-50"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 50% at 30% 40%, rgba(91,140,255,0.2), transparent 70%), radial-gradient(40% 60% at 80% 60%, rgba(155,135,255,0.15), transparent 70%), linear-gradient(180deg, rgba(5,5,7,0.4) 0%, rgba(5,5,7,0.95) 100%)",
          }}
        />
        <div className="grain absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-ink-950" />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-10">
          <Link
            href="/blog"
            data-cursor="link"
            className="mb-10 inline-block text-[11px] uppercase tracking-[0.32em] text-graphite-200 hover:text-bone"
          >
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
            {post.body.split("\n\n").map((p, i) => (
              <p key={i} className="text-lg">
                {p}
              </p>
            ))}
            <hr className="my-12 border-white/10" />
            <p className="text-lg">
              If this resonates and you're shipping something in this space,{" "}
              <Link
                href="/contact"
                className="text-bone underline decoration-electric underline-offset-4"
              >
                say hello
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-900 py-24">
        <Image
          src={next.cover}
          alt={next.title}
          fill
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900 via-ink-900/95 to-ink-900" />
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
