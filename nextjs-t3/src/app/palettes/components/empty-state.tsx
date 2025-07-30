import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import Link from "next/link";

export const EmptyState = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
      <div className="py-16 text-center">
        <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Palette className="text-muted-foreground h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">No palettes yet</h3>
        <p className="text-muted-foreground mb-6">
          Start by uploading an image and selecting 5 colors to create your own
          palette.
        </p>
        <Button asChild>
          <Link href="/create">Let’s make first one!</Link>
        </Button>
      </div>
    </div>
  );
};
