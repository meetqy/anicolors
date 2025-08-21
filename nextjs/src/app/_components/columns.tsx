"use client";

import type { PaletteListItem } from "@/query/palette";
import { PaletteCard } from "@/app/palettes/components/palette-card";

export const Columns = ({ palettes }: { palettes: PaletteListItem[] }) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {palettes.map((palette) => (
        <PaletteCard key={palette.documentId} palette={palette} />
      ))}
    </div>
  );
};
