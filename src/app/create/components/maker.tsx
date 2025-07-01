"use client";

import { Generator } from "~/components/palette/generator";

export const Maker = () => {
  return (
    <div>
      <Generator
        onChange={(e) => {
          console.log("Palette changed:", e);
        }}
      />
    </div>
  );
};
