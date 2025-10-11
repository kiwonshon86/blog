import { defineCollection, defineConfig, s, z } from "velite";

export const posts = defineCollection({
    name: "Post",
    pattern: "posts/*.mdx",
    schema: s.object({
        slug: s.path(),             // 파일명의 slug 자동 생성
        title: s.string(),
        description: s.string().optional(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        tags: s.array(s.string()).default([]),
        draft: s.boolean().default(false),
        // 핵심: MDX를 함수 바디 문자열로 컴파일
        code: s.mdx(),
    }),
});

export default defineConfig({
    root: "src",
    collections: { posts }
});
