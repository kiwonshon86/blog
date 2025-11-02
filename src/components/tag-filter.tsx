"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";

export default function TagFilter({ all }: { all: [string, number][] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  const selected = new Set(
    (sp.get("tags") || "")
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean),
  );

  const toggle = (tag: string) => {
    const next = new Set(selected);
    if (next.has(tag)) next.delete(tag); else next.add(tag);

    const params = new URLSearchParams(sp.toString());
    if (next.size > 0) params.set("tags", [...next].join(","));
    else params.delete("tags");

    // Reset pagination whenever filters change so the user sees the first page.
    params.delete("page");

    startTransition(() => {
      const query = params.toString();
      router.push(query ? `/?${query}` : "/");
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {all.map(([tag, count]) => {
        const isSelected = selected.has(tag);
        return (
          <Badge
            key={tag}
            asChild
            variant={isSelected ? "default" : "outline"}
            className={pending ? "opacity-70" : undefined}
          >
            <button
              type="button"
              onClick={() => toggle(tag)}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium focus-visible:outline-none"
              aria-pressed={isSelected}
              aria-label={`${tag} 태그 ${isSelected ? "제거" : "선택"}`}
              disabled={pending}
            >
              {tag}
              <span className="text-muted-foreground">{count}</span>
            </button>
          </Badge>
        );
      })}
    </div>
  );
}
