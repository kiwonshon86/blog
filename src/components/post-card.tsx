import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { normSlug } from "@/lib/content";

export function PostCard({ p }: { p: { slug: string; title: string; description?: string; date: string | Date; tags: string[] } }) {
  const d = new Date(p.date);
  const href = `/posts/${normSlug(p.slug)}`; // ✅ 중복 방지

  return (
    <Card>
      <CardContent className="px-6">
        <h3 className="text-xl font-semibold"><Link href={href}>{p.title}</Link></h3>
        <p className="text-sm text-muted-foreground">{isNaN(+d) ? "" : d.toLocaleDateString()}</p>
        {p.description && <p className="mt-2">{p.description}</p>}
        <div className="mt-3 flex gap-2 flex-wrap">
          {p.tags?.map(t => <span key={t} className="text-xs rounded bg-muted px-2 py-1">{t}</span>)}
        </div>
      </CardContent>
    </Card>
  );
}
