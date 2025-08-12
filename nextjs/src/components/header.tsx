"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Logo } from "./logo";
import { useState } from "react";
import { useImeEnter } from "@/hooks/use-ime-enter";

export function Header() {
  const [query, setQuery] = useState("");

  const search = useImeEnter(() => {
    window.open(
      `https://www.google.com/search?q=site:anicolors.com/t%20${query}`,
    );
  });

  return (
    <header className="border-border bg-background/90 sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <div className="max-w-96">
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              {...search}
            />
          </div>
          <Button variant="link" asChild>
            <Link href="/blogs" aria-label="View all blogs">
              Blogs
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/palettes" aria-label="View all color palettes">
              Palettes
            </Link>
          </Button>
          <Button asChild className="hidden lg:block">
            <Link href="/create" aria-label="Create a new color palette">
              Make a Palette
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
