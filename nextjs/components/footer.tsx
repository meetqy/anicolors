import { InstagramIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

interface FriendLink {
  name: string;
  url: string;
}

export const Footer = () => {
  const friendLinks: FriendLink[] = [
    { name: "ShowMeBestAI", url: "https://www.showmebest.ai" },
    { name: "Twelve Tools", url: "https://twelve.tools" },
    { name: "Hiaitools", url: "https://hiaitools.com" },
    { name: "Victrays", url: "https://victrays.com/" },
    { name: "MagicBox", url: "https://magicbox.tools" },
    { name: "Turbo0", url: "https://turbo0.com/item/hicolors" },
  ];

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-end">
              <img src="/logo.svg" alt="HiColors Logo" className="h-8" />
              <span className="text-xl font-bold font-serif italic relative top-1">Colors</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">Discover & make acg color palettes.</p>
            <div className="flex items-center gap-x-4 gap-y-2">
              <Link href={"https://x.com/hi_colors"} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <TwitterIcon />
              </Link>

              <Link href={"https://www.instagram.com/hicolors_org/"} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon />
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/about/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/about/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Friend Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Friend Links</h3>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
              {friendLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">© 2025 HiColors. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
