"use client";

import { Button } from "@/components/ui/button";
import { Topic } from "@/query/topic";
import { MdFavoriteBorder, MdLink } from "react-icons/md";

interface PaletteActionsProps {
  topic: Topic;
  onLike?: () => void;
  onShare?: () => void;
}

export const PaletteActions = ({ topic, onLike, onShare }: PaletteActionsProps) => {
  return (
    <div className="flex justify-between max-w-screen-lg mx-auto px-4 lg:px-0 mt-4">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onLike}>
          <MdFavoriteBorder className="size-5" /> {topic.like}
        </Button>
        <Button variant="outline" onClick={onShare}>
          <MdLink className="size-5" /> Link
        </Button>
      </div>

      <time suppressHydrationWarning className="text-muted-foreground">
        {new Date(topic.createdAt).toLocaleString()}
      </time>
    </div>
  );
};
