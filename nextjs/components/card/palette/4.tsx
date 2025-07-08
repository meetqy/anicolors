"use client";

import { ColorPoint } from "@/components/palette/picker-colors";
import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { ColorPointsOverlay } from "@/components/color-points-overlay";

interface CardPalette4Props {
  points: ColorPoint[];
  image: string;
  className?: string;
  style?: React.CSSProperties;
}

const CardPalette4Base = ({ points, className, style, image }: CardPalette4Props) => {
  return (
    <div style={style} className={cn("w-[375px] flex flex-col aspect-square relative rounded-md bg-background", className)}>
      <div className="absolute text-xl right-4 top-2 font-serif italic font-bold opacity-80 z-10 text-muted-foreground">HiColors</div>
      <div className="w-full h-[70%] bg-muted rounded-t-md">
        <ColorPointsOverlay className="size-full z-50 top-5 scale-110" points={points} image={image} />
      </div>
      <div className="flex relative z-30 flex-1 rounded-b-md overflow-hidden">
        {points.map((item) => {
          const color = Color(item.color);
          return (
            <div
              key={item.id}
              className="flex-1 flex items-center justify-end font-mono text-sm pb-2"
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
    </div>
  );
};

export const CardPalette4 = withSave(CardPalette4Base);
CardPalette4.displayName = "CardPalette4";
