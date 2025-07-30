import Link from "next/link";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="border-border bg-background/90 sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="link" asChild>
            <Link href="/palettes" aria-label="View all color palettes">
              All Palettes
            </Link>
          </Button>
          <Button asChild className="hidden lg:block">
            <Link href="/create" aria-label="Create a new color palette">
              Make a Palette
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://github.com/meetqy/hicolors"
              aria-label="View the GitHub repository"
              target="_blank"
            >
              <GithubIcon className="size-6" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
