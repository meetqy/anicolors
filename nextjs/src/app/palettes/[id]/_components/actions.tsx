"use client";

import { Button } from "@/components/ui/button";
import { type Palette } from "@/query/palette";
import { useToggleLike } from "@/hooks/use-toggle-like";
import Link from "next/link";
import { toast } from "sonner";
import { cn, getOriginalUrl } from "@/lib/utils";
import { Heart, TwitterIcon, LinkIcon } from "lucide-react";
import { env } from "@/env";

// 转换空格后的字符为首字母大写并删除空格
const toCamelCase = (str: string) => {
  return str
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
    .replace(/\s+/g, "");
};

export const PaletteActions = ({ palette }: { palette: Palette }) => {
  const id = palette.documentId;
  const { likes, isLiked, isLoading, toggleLike } = useToggleLike({
    paletteId: id,
    initialLikes: palette.likes,
  });

  const onLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/palettes/${id}`,
    );
    toast.success("Palette link copied to clipboard!");
  };

  const title = `${palette.category} ${palette.name} Palette - AniColors \n\n #anicolors #hicolors #${toCamelCase(palette.category)} #${toCamelCase(palette.name)} #palette`;
  const host = env.NEXT_PUBLIC_SITE_URL;

  return (
    <div className="mx-auto mt-4 max-w-screen-lg px-4 lg:px-0">
      <div className="mb-4 text-end">
        <time suppressHydrationWarning className="text-muted-foreground">
          Last Updated: {new Date(palette.updatedAt).toLocaleString()}
        </time>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={toggleLike} disabled={isLoading}>
            <Heart
              className={cn("size-5", {
                "text-red-500": isLiked,
                "text-muted-foreground": !isLiked,
              })}
              fill={isLiked ? "currentColor" : "none"}
            />
            {likes}
          </Button>
          <Button variant="outline" onClick={onLink}>
            <LinkIcon className="size-5" /> Link
          </Button>
          <Button variant={"outline"} asChild>
            <Link
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`${host}/palettes/${id}`)}`}
            >
              <TwitterIcon /> Twitter
            </Link>
          </Button>
        </div>

        <div className="flex flex-1 items-center gap-4 lg:justify-end">
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Link href={getOriginalUrl(palette.image.url)} download>
                Download Transparent PNG
              </Link>
            </Button>
            <Button>
              <Link href={`/create?id=${id}`}>Custom Maker</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
