import type { MetadataRoute } from "next";
import { SITE, PROJECTS, POSTS, NAV } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;
  return [
    ...NAV.map((n) => ({ url: `${base}${n.href}`, lastModified: now })),
    ...PROJECTS.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: now })),
    ...POSTS.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: now })),
  ];
}
