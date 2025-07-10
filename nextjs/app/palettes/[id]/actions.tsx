"use client";

import { Button } from "@/components/ui/button";
import { Palette } from "@/query/palette";
import { useToggleLike } from "@/hooks/use-toggle-like";
import Link from "next/link";
import { MdFavoriteBorder, MdFavorite, MdLink } from "react-icons/md";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TwitterIcon } from "lucide-react";

interface PaletteActionsProps {
  palette: Palette;
  id: string;
}

export const PaletteActions = ({ palette, id }: PaletteActionsProps) => {
  const { likes, isLiked, isLoading, toggleLike } = useToggleLike({
    paletteId: id,
    initialLikes: palette.likes,
  });

  const onLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/palettes/${id}`);
    toast.success("Palette link copied to clipboard!");
  };

  const title = `${palette.category} ${palette.name} Palette - HiColors \n\n #hicolors #${palette.category} #${palette.name} #palette`;
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://hicolors.org";

  return (
    <div className="flex items-center justify-between max-w-screen-lg mx-auto px-4 lg:px-0 mt-4">
      <div className="flex gap-2">
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
        <Button>
          <Link href={`/create?id=${id}`}>Custom Maker</Link>
        </Button>
      </div>

      <time suppressHydrationWarning className="text-muted-foreground">
        {new Date(palette.createdAt).toLocaleString()}
      </time>
    </div>
  );
};
