"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Toc() {
  const [heads, setHeads] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const hs = Array.from(document.querySelectorAll("article h2[id]")) as HTMLElement[];
    setHeads(hs.map(h => ({ id: h.id, text: h.textContent || "" })));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: "0px 0px -70% 0px", threshold: 1.0 });
    hs.forEach(h => io.observe(h));
    return () => io.disconnect();
  }, []);

  return (
    <ScrollArea className="max-h-[60vh]">
      <ul className="space-y-2">
        {heads.map(h => (
          <li key={h.id}>
            <a href={`#${h.id}`} className={active === h.id ? "font-semibold" : "text-muted-foreground"}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
