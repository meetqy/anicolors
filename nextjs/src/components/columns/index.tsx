"use client";

import type { PaletteListItem } from "@/query/palette";
import { ColumnItem } from "./column-item";

export const Columns = ({
  palettes,
  as,
}: {
  palettes: PaletteListItem[];
  as?: React.ElementType;
}) => {
  return (
    <>
      <script
        async
        data-cfasync="false"
        src="//immoderatebreathtaking.com/31eff1937586d0b5565373f161001d47/invoke.js"
      />
      <div className="not-prose grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {palettes.slice(0, 4).map((palette) => (
          <ColumnItem as={as} key={palette.documentId} palette={palette} />
        ))}
        <div
          id="container-31eff1937586d0b5565373f161001d47"
          className="bg-muted w-full rounded-md md:col-span-2 lg:col-span-3 xl:col-span-4"
        />
        {palettes.slice(4).map((palette) => (
          <ColumnItem as={as} key={palette.documentId} palette={palette} />
        ))}
      </div>
    </>
  );
};
