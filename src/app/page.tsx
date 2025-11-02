import { allPosts, getAllTags } from "@/lib/content";
import TagFilter from "@/components/tag-filter";
import { PostCard } from "@/components/post-card";

type SP = { [key: string]: string | string[] | undefined };

const resolveSearchParams = async (searchParams?: Promise<SP> | SP) => {
  if (!searchParams) return {} satisfies SP;
  const maybePromise = searchParams as PromiseLike<SP>;
  if (typeof maybePromise.then === "function") return await maybePromise;
  return searchParams;
};

const parseTags = (input?: string | string[]) => {
  if (!input) return new Set<string>();
  const values = Array.isArray(input) ? input : [input];
  return new Set(
    values
      .flatMap(value => value.split(","))
      .map(tag => tag.trim())
      .filter(Boolean),
  );
};

const parsePage = (input: string | string[] | undefined) => {
  const value = Array.isArray(input) ? input[0] : input;
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

export default async function Home({ searchParams }: { searchParams?: Promise<SP> | SP }) {
  const sp = await resolveSearchParams(searchParams);

  const selected = parseTags(sp.tags);
  const filtered = [...selected].length === 0 ? allPosts : allPosts.filter(p => [...selected].some(t => p.tags.includes(t)));

  const page = parsePage(sp.page);
  const pageSize = 10;
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
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
