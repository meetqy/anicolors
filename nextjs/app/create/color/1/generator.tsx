"use client";

import { useState } from "react";
import { CardColor1 } from "@/components/card/color/1";
import { ColorPoint } from "@/components/palette/picker-colors";
import { getColorName } from "@/lib/nearest";
import Color from "color";
import dynamic from "next/dynamic";

const ChromePicker = dynamic(() => import("react-color").then((mod) => mod.ChromePicker), { ssr: false });

export function Generator() {
  const [selectedColor, setSelectedColor] = useState({ r: 255, g: 0, b: 0, a: 1 });

  const handleColorChange = (color: any) => {
    setSelectedColor(color.rgb);
  };

  const colorHex = Color(`rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`).hex();

  const colorPoint: ColorPoint = {
    id: 1,
    x: 0,
    y: 0,
    color: colorHex,
    name: getColorName(colorHex)?.name || "Unknown",
  };

  return (
    <div className="grid lg:grid-cols-2 gap-0 max-w-6xl mx-auto border rounded-2xl overflow-hidden">
      {/* Color Picker Section */}
      <div className="bg-muted/50 p-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">Pick Your Color</h2>
        <div className="flex justify-center" suppressHydrationWarning>
          <ChromePicker className="!w-full !shadow-none border !rounded-md overflow-hidden" color={selectedColor} onChange={handleColorChange} disableAlpha={false} />
        </div>
      </div>

      {/* Color Card Display */}
      <div className="bg-background p-12 border-l">
        <h2 className="text-2xl font-semibold mb-8 text-center">Generated Color Card</h2>
        <div className="flex justify-center">
          <div className="border w-full">
            <CardColor1 className="w-full" point={colorPoint} />
          </div>
        </div>
        <p className="text-center text-muted-foreground mt-8 text-sm">Click the download button on the card to save it as an image</p>
      </div>
    </div>
  );
}
