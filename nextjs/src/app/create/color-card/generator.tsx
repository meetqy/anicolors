"use client";

import { useState } from "react";
import { CardColor1 } from "@/components/card/color/1";
import { type ColorPoint } from "@/components/palette/picker-colors";
import { getColorName } from "@/lib/nearest";
import dynamic from "next/dynamic";
import { type ColorResult } from "react-color";

const ChromePicker = dynamic(
  () => import("react-color").then((mod) => mod.ChromePicker),
  { ssr: false },
);

export function Generator() {
  const [selectedColor, setSelectedColor] = useState<ColorResult>();

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color);
  };

  const hex = selectedColor?.hex ?? "#ff0000";

  const colorPoint: ColorPoint = {
    id: 1,
    x: 0,
    y: 0,
    color: hex,
    name: getColorName(hex)!.name ?? "Unknown",
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-0 overflow-hidden rounded-lg border lg:grid-cols-2">
      {/* Color Picker Section */}
      <div className="bg-muted/50 p-12">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Pick Your Color
        </h2>
        <div className="flex justify-center" suppressHydrationWarning>
          <ChromePicker
            className="!w-full overflow-hidden !rounded-md border !shadow-none"
            color={hex}
            onChange={handleColorChange}
            disableAlpha
          />
        </div>
      </div>

      {/* Color Card Display */}
      <div className="bg-background border-l p-12">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Generated Color Card
        </h2>
        <div className="flex justify-center">
          <div className="w-full overflow-hidden rounded-md border">
            <CardColor1 className="w-full" point={colorPoint} />
          </div>
        </div>
        <p className="text-muted-foreground mt-8 text-center text-sm">
          Click the download button on the card to save it as an image
        </p>
      </div>
    </div>
  );
}
