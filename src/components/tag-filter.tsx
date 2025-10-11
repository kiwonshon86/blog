"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function TagFilter({ all }: { all: [string, number][] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const selected = new Set((sp.get("tags") || "").split(",").filter(Boolean));

  const toggle = (tag: string) => {
    if (selected.has(tag)) selected.delete(tag); else selected.add(tag);
    const q = [...selected].join(",");
    router.push(q ? `/?tags=${q}` : "/");
  };

  return (
    <div className="flex flex-wrap gap-2">
      {all.map(([tag, count]) => (
        <Badge
          key={tag}
          onClick={() => toggle(tag)}
          className={selected.has(tag) ? "bg-primary text-primary-foreground" : "cursor-pointer"}
        >
          {tag} ({count})
        </Badge>
      ))}
    </div>
  );
}
