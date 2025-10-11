import { allPosts, getAllTags } from "@/lib/content";
import TagFilter from "@/components/tag-filter";
import { PostCard } from "@/components/post-card";

type SP = { [key: string]: string | string[] | undefined };

export default async function Home({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;

  const selected = new Set(String(sp.tags ?? "").split(",").filter(Boolean));
  const filtered = allPosts.filter(p => [...selected].every(t => p.tags.includes(t)));

  const page = Number(sp.page ?? 1);
  const pageSize = 10;
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      {/* ✅ 디버그 라인 (임시) */}
      <div className="text-xs text-muted-foreground">
        total: {allPosts.length} / filtered: {filtered.length} / pageItems: {items.length}
      </div>

      <TagFilter all={getAllTags()} />

      {items.length === 0 ? (
        <div className="rounded border p-6 text-sm text-muted-foreground">
          표시할 글이 없습니다. 태그/초안 여부/날짜를 확인하세요.
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map(p => <PostCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}