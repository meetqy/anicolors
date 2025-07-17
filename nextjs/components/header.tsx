import Link from "next/link";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";

export function Header() {
  return (
    <header className="border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-end underline">
          <img src="/logo.svg" alt="HiColors Logo" className="h-10" />
          <span className="text-2xl font-bold font-serif italic relative top-1">Colors</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="link" asChild>
            <Link href="/palettes">All Palettes</Link>
          </Button>
          <Button asChild className="lg:block hidden">
            <Link href="/create">Make a Palette</Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/meetqy/hicolors" target="_blank">
              <GithubIcon className="size-6" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
