import Link from "next/link";
import { Button } from "./ui/button";
import { Icon } from "@iconify-icon/react";

export function Header() {
  return (
    <header className="border-border bg-background border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Icon width={24} icon="material-symbols:filter-tilt-shift-rounded" />
          <span className="text-xl font-semibold">HiColors</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center">
          <Button variant="ghost">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
