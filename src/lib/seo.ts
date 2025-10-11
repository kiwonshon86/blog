import type { Post } from "./content";
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const articleJsonLd = (p: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  datePublished: p.date,
  dateModified: p.updated || p.date,
  url: `${base}/posts/${p.slug}`,
  author: { "@type": "Person", name: "Author" },
});
