"use client";

import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { ColorPointsOverlay } from "@/components/color-points-overlay";
import { CardPaletteProps } from "./common";

const CardPalette5Base = ({ points, className, style, image }: CardPaletteProps) => {
  const first = points[0];

  return (
    <div style={{ backgroundColor: first.color, ...style }} className={cn("w-[375px] flex aspect-[16/9] relative", className)}>
      <div className="absolute text-xl right-2 top-2 font-serif italic font-bold z-10" style={{ color: Color(first.color).isDark() ? "#fff" : "#000" }}>
        HiColors
      </div>
      <ColorPointsOverlay className="size-full z-50" points={points} image={image} />
      <div className="absolute bottom-0 left-0 h-4 w-full flex z-10">
        {points.map((item) => {
          const color = Color(item.color);
          return (
            <div
              key={item.id}
              className="flex-1"
              style={{
                backgroundColor: color.hex(),
                color: color.isDark() ? "#fff" : "#000",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export const CardPalette5 = withSave(CardPalette5Base);
CardPalette5.displayName = "CardPalette5";
