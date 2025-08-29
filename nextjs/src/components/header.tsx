"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Logo } from "./logo";
import { useState } from "react";
import { useImeEnter } from "@/hooks/use-ime-enter";
import { SearchIcon } from "lucide-react";

export function Header() {
  const [query, setQuery] = useState("");

  const search = useImeEnter(() => {
    window.open(
      `https://www.google.com/search?q=site:anicolors.com%20${query}`,
    );
  });

  return (
    <header
      id="header"
      className="bg-background/90 sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Logo className="text-base lg:text-2xl" />

        {/* Auth Buttons */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="relative flex max-w-72 flex-1 items-center">
            <SearchIcon className="text-muted-foreground absolute left-2 z-10 size-4" />
            <Input
              placeholder="Search colors..."
              className="bg-muted border-muted focus-visible:bg-muted/50 pl-8 focus-visible:border-transparent focus-visible:ring-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              {...search}
            />
          </div>

          <div className="hidden lg:flex">
            <Button variant="link" asChild>
              <Link href="/blogs" aria-label="View all blogs">
                Blogs
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/tools" aria-label="View all tools">
                Tools
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/palettes" aria-label="View all color palettes">
                Palettes
              </Link>
            </Button>
            <Button asChild className="hidden lg:block">
              <Link
                href="/tools/create-cinematic-color-palettes-with-colorpalette-cinema"
                aria-label="Create a new color palette"
              >
                Make Palette
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
