import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="border-border bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-end underline">
          <img src="/logo.svg" alt="HiColors Logo" className="h-10" />
          <span className="text-2xl font-bold font-serif italic relative top-1">Colors</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center">
          <Button variant="link" asChild>
            <Link href="/palettes">All Palettes</Link>
          </Button>
          <Button asChild>
            <Link href="/create">Make a Palette</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
