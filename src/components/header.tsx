"use client";

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CommandDialog } from "@/components/ui/command";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">My Blog</Link>

        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem><Link href="/tags">Tags</Link></NavigationMenuItem>
              <NavigationMenuItem><Link href="/search">Search</Link></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setOpen(true)}>⌘K</Button>
          <Sheet>
            <SheetTrigger className="md:hidden px-3 py-2 border rounded">Menu</SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-6">
                <Link href="/">Home</Link>
                <Link href="/tags">Tags</Link>
                <Link href="/search">Search</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          {/* 검색 모달은 8단계에서 연결 */}
        </CommandDialog>
      </div>
    </header>
  );
}
