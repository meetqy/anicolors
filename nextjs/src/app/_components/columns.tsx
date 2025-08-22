"use client";

import type { PaletteListItem } from "@/query/palette";
import { PaletteCard } from "@/app/palettes/components/palette-card";

export const Columns = ({ palettes }: { palettes: PaletteListItem[] }) => {
  return (
    <>
      <script
        async
        data-cfasync="false"
        src="//immoderatebreathtaking.com/31eff1937586d0b5565373f161001d47/invoke.js"
      />
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {palettes.slice(0, 8).map((palette) => (
          <PaletteCard key={palette.documentId} palette={palette} />
        ))}
        <div
          id="container-31eff1937586d0b5565373f161001d47"
          className="bg-muted w-full rounded-md md:col-span-2 lg:col-span-3 xl:col-span-4"
        />
        {palettes.slice(8).map((palette) => (
          <PaletteCard key={palette.documentId} palette={palette} />
        ))}
      </div>
    </>
  );
};
