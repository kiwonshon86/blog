// /src/app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/content";
import { MDXContent } from "@/components/mdx/MDXContent";
import { MDXComponents } from "@/components/mdx/MDXComponents";
import Toc from "@/components/toc";
import { Separator } from "@/components/ui/separator";
import GiscusComments from "@/components/comments/GiscusComments";
import { getGiscusConfig } from "@/lib/giscus";

type Params = { slug: string };

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;   // ✅ Next 15: Promise 타입
}) {
  const { slug } = await params; // ✅ 반드시 await
  const post = getPostBySlug(slug);
  if (!post) return notFound();
  const giscusConfig = getGiscusConfig();

  return (
    <article className="prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="text-sm text-muted-foreground">
        {new Date(post.date).toLocaleString()}
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        <div>
          <MDXContent code={post.code} components={MDXComponents} />
        </div>
        <aside className="hidden lg:block">
          <Toc />
        </aside>
      </div>

      <Separator className="my-10" />
      {giscusConfig ? (
        <GiscusComments config={giscusConfig} slug={slug} />
      ) : null}
    </article>
  );
}
