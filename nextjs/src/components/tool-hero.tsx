import Link from "next/link";
import { TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { env } from "@/env";

interface ToolHeroProps {
  tool: {
    name: string;
    description: string;
    keywords: string;
    slug: string;
  };
}

export const ToolHero = ({ tool }: ToolHeroProps) => {
  return (
    <div className="container flex flex-col items-center gap-6 py-8 text-center md:py-16 lg:py-20">
      <div className="space-y-4">
        <h1 className="max-w-3xl scroll-m-20 text-4xl font-extrabold tracking-tight capitalize lg:text-5xl">
          {tool.name}
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl">
          {tool.description}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {tool.keywords.split(", ").map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="hover:bg-secondary/80 cursor-pointer"
          >
            <Link href={`#${item}`} className="capitalize">
              {item}
            </Link>
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Button size="sm" className="gap-2" asChild>
          <Link
            target="_blank"
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(tool.name)}&url=${encodeURIComponent(env.NEXT_PUBLIC_SITE_URL + "/tools/" + tool.slug)}`}
          >
            <TwitterIcon className="h-4 w-4" />
            Share on Twitter
          </Link>
        </Button>
      </div>
    </div>
  );
};
