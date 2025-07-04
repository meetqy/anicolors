"use client";

import { ColorPoint } from "@/components/palette/picker-colors";
import Color from "color";
import { withSave, SaveableCardRef } from "../with-save";

interface CardPalette2Props {
  points: ColorPoint[];
  image: string;
}

const CardPalette2Base = ({ points }: CardPalette2Props) => {
  const end = Color(points[points.length - 1].color);

  return (
    <div className="w-[375px] aspect-video flex relative rounded-md overflow-hidden bg-red-400">
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
