"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { allPosts, getAllTags, normSlug } from "@/lib/content";
import { FileTextIcon, HashIcon, HomeIcon, SearchIcon } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(value => !value);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const pages = useMemo(
    () => [
      { href: "/", label: "홈으로", icon: HomeIcon },
    ],
    [],
  );

  const posts = useMemo(
    () =>
      allPosts.slice(0, 15).map(post => ({
        href: `/posts/${normSlug(post.slug)}`,
        label: post.title,
        description: post.description,
      })),
    [],
  );

  const tags = useMemo(() => getAllTags().slice(0, 15), []);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">My Blog</Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            aria-label="커맨드 팔레트 열기"
          >
            ⌘K
          </Button>
          <Sheet>
            <SheetTrigger className="md:hidden rounded border px-3 py-2">Menu</SheetTrigger>
            <SheetContent side="left">
              <div className="mt-6 flex flex-col gap-4">
                <Link href="/">Home</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          title="블로그 검색"
          description="콘텐츠를 빠르게 이동합니다."
        >
          <CommandInput placeholder="글, 태그, 페이지를 검색하세요" />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup heading="바로 가기">
              {pages.map(page => (
                <CommandItem key={page.href} onSelect={() => handleSelect(page.href)}>
                  <page.icon className="size-4" />
                  {page.label}
                  <CommandShortcut>{page.href}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="최근 게시글">
              {posts.map(post => (
                <CommandItem key={post.href} onSelect={() => handleSelect(post.href)}>
                  <FileTextIcon className="size-4" />
                  <span className="flex min-w-0 flex-col text-left">
                    <span className="truncate font-medium">{post.label}</span>
                    {post.description && (
                      <span className="truncate text-xs text-muted-foreground">{post.description}</span>
                    )}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="태그">
              {tags.map(([tag, count]) => (
                <CommandItem key={tag} onSelect={() => handleSelect(`/?tags=${tag}`)}>
                  <HashIcon className="size-4" />
                  #{tag}
                  <CommandShortcut>{count}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </header>
  );
}
