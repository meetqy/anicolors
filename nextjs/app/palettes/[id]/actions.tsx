"use client";

import { Button } from "@/components/ui/button";
import { Palette } from "@/query/palette";
import Link from "next/link";
import { MdFavoriteBorder, MdLink } from "react-icons/md";

interface PaletteActionsProps {
  palette: Palette;
  id: string;
  onLike?: () => void;
  onShare?: () => void;
}

export const PaletteActions = ({ palette, onLike, onShare, id }: PaletteActionsProps) => {
  return (
    <div className="flex items-center justify-between max-w-screen-lg mx-auto px-4 lg:px-0 mt-4">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onLike}>
          <MdFavoriteBorder className="size-5" /> {palette.likes}
        </Button>
        <Button variant="outline" onClick={onShare}>
          <MdLink className="size-5" /> Link
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
