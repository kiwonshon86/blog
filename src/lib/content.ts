import { posts } from "../../.velite";

export type Post = typeof posts[number];

export const normSlug = (slug: string) => slug.replace(/^posts\//, "");

export const allPosts: Post[] = posts
    .filter(p => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const getPostBySlug = (slug: string) => {
  const target = normSlug(slug);
  return allPosts.find(p => normSlug(p.slug) === target);
};

export const getAllTags = () => {
    const m = new Map<string, number>();
    for (const p of allPosts) for (const t of p.tags) m.set(t, (m.get(t) || 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
};
