import { GithubIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

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
    { name: "Turbo0", url: "https://turbo0.com" },
    { name: "YP for AI", url: "https://ypforai.com" },
    { name: "UtilPortal", url: "https://utilportal.com" },
    { name: "AI Toolz Dir", url: "https://www.aitoolzdir.com" },
    { name: "AI Best Top", url: "https://aibesttop.com" },
    { name: "Tap4AI", url: "https://tap4.ai" },
    { name: "Kontext AI", url: "https://kontext-ai.com" },
    { name: "SimilarLabs", url: "https://similarlabs.com" },
    { name: "Fazier badge", url: "https://fazier.com/launches/anicolors.com" },
    { name: "AiFinder", url: "https://aifinder.site" },
    { name: "Startupslab", url: "https://startupslab.site" },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <Logo />
              <p className="text-muted-foreground mt-2 max-w-sm text-sm">
                Discover and create anime colors.
              </p>
            </div>
            <div className="flex items-center gap-x-4 gap-y-2">
              <Link
                href={"https://github.com/meetqy/anicolors"}
                aria-label="View the GitHub"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon />
              </Link>
              <Link
                href={"https://x.com/anicolors"}
                aria-label="View the Twitter profile"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TwitterIcon />
              </Link>

              <Link
                href={"https://www.instagram.com/anicolors_com/"}
                aria-label="View the Instagram profile"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <InstagramIcon />
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/about/privacy"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/about/terms"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Friend Links */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold">
              Friend Links
            </h3>
            <div className="text-muted-foreground [&>a]:hover:text-foreground flex flex-wrap gap-x-2 gap-y-1 text-sm [&>a]:transition-colors">
              {friendLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="https://starterbest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                StarterBest
                <img
                  src="https://starterbest.com/badages-awards.svg"
                  className="sr-only"
                  alt="Featured on Starter Best"
                  style={{ height: 54 }}
                />
              </a>
              <a
                target="_blank"
                href="https://launchigniter.com/product/hicolors?ref=badge-hicolors"
              >
                Launchigniter
                <img
                  src="https://api.launchigniter.com/widgets/embed-image/featured.svg"
                  className="sr-only"
                  alt="Featured on LaunchIgniter"
                  width="250"
                  height="54"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-border mt-8 border-t pt-8">
          <div className="text-center">
            <p className="text-muted-foreground text-xs">
              © 2025 AniColors. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
