"use client";

import { Button } from "@/components/ui/button";
import { Palette } from "@/query/palette";
import { useToggleLike } from "@/hooks/use-toggle-like";
import Link from "next/link";
import { MdFavoriteBorder, MdFavorite, MdLink } from "react-icons/md";
import { toast } from "sonner";
import { cn, getOriginalUrl } from "@/lib/utils";
import { TwitterIcon } from "lucide-react";

interface PaletteActionsProps {
  palette: Palette;
  id: string;
}

// 转换空格后的字符为首字母大写并删除空格
const toCamelCase = (str: string) => {
  return str.replace(/\s+(.)/g, (_, char) => char.toUpperCase()).replace(/\s+/g, "");
};

export const PaletteActions = ({ palette, id }: PaletteActionsProps) => {
  const { likes, isLiked, isLoading, toggleLike } = useToggleLike({
    paletteId: id,
    initialLikes: palette.likes,
  });

  const onLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/palettes/${id}`);
    toast.success("Palette link copied to clipboard!");
  };

  const title = `${palette.category} ${palette.name} Palette - HiColors \n\n #hicolors #${toCamelCase(palette.category)} #${toCamelCase(palette.name)} #palette`;
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://hicolors.org";

  return (
    <div className="max-w-screen-lg px-4 lg:px-0 mt-4 mx-auto ">
      <div className="mb-4 text-end">
        <time suppressHydrationWarning className="text-muted-foreground">
          {new Date(palette.createdAt).toLocaleString()}
        </time>
      </div>

      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="flex gap-2 flex-wrap items-center">
          <Button
            variant="outline"
            className={cn({
              "bg-muted border-muted": isLiked,
            })}
            onClick={toggleLike}
            disabled={isLoading}
          >
            {isLiked ? <MdFavorite className="size-5 text-red-500" /> : <MdFavoriteBorder className="size-5" />}
            {likes}
          </Button>
          <Button variant="outline" onClick={onLink}>
            <MdLink className="size-5" /> Link
          </Button>
          <Button variant={"outline"} asChild>
            <Link target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`${host}/palettes/${id}`)}`}>
              <TwitterIcon /> Twitter
            </Link>
          </Button>
        </div>

        <div className="flex lg:justify-end items-center flex-1 gap-4">
          <div className="flex gap-2 items-center">
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
