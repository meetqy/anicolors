import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import Link from "next/link";

export const EmptyState = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No palettes found</h3>
        <p className="text-muted-foreground mb-6">Be the first to create a beautiful color palette!</p>
        <Button asChild>
          <Link href="/create">Create Your First Palette</Link>
        </Button>
      </div>
    </div>
  );
};
