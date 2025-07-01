import Link from "next/link";
import { Button } from "./ui/button";
import { Icon } from "@iconify-icon/react";

export function Header() {
  return (
    <header className="border-border bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Icon width={32} icon="material-symbols:filter-tilt-shift-rounded" />
          <span className="text-xl font-semibold">HiColors</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center">
          <Button variant="link">All Palettes</Button>
          <Button asChild>
            <Link href="/create">Make a Palette</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
