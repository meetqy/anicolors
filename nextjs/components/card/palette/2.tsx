"use client";

import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { CardPaletteProps } from "./common";

const CardPalette2Base = ({ points, className, style }: CardPaletteProps) => {
  const end = Color(points[points.length - 1].color);

  return (
    <div style={style} className={cn("w-[375px] aspect-video flex relative bg-background", className)}>
      <div className="absolute text-xl right-4 top-2 font-serif italic font-bold opacity-80" style={{ color: end.isDark() ? "#fff" : "#000" }}>
        HiColors
      </div>
      {points.map((item) => {
        const color = Color(item.color);
        return (
          <div
            key={item.id}
            className="flex-1 flex items-center justify-end font-mono text-sm px-4"
            style={{
              backgroundColor: color.hex(),
              color: color.isDark() ? "#fff" : "#000",
              writingMode: "vertical-rl",
            }}
          >
            {color.hex().split("").reverse().join("")}
          </div>
        );
      })}
    </div>
  );
};

export const CardPalette2 = withSave(CardPalette2Base);
CardPalette2.displayName = "CardPalette2";
