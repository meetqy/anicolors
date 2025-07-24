"use client";

import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { ColorPointsOverlay } from "@/components/color-points-overlay";
import { CardPaletteProps } from "./common";
import { HiColorsLogo } from "@/components/hicolors-logo";

const CardPalette4Base = ({ points, className, style, image }: CardPaletteProps) => {
  return (
    <div style={style} className={cn("w-[375px] flex aspect-[16/9] relative bg-background", className)}>
      <HiColorsLogo className="absolute left-2 top-2" />
      <div className="w-2/3 bg-background flex justify-center items-center">
        <ColorPointsOverlay className="size-full z-50" points={points} image={image} />
      </div>
      <div className="flex flex-col relative flex-1 gap-1">
        {points.map((item) => {
          const color = Color(item.color);
          return (
            <div
              key={item.id}
              className="flex-1 flex items-center font-mono text-sm justify-end pr-2"
              style={{
                backgroundColor: color.hex(),
                color: color.isDark() ? "#fff" : "#000",
              }}
            >
              {color.hex()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CardPalette4 = withSave(CardPalette4Base);
CardPalette4.displayName = "CardPalette4";
