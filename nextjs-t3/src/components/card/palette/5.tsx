"use client";

import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { ColorPointsOverlay } from "@/components/color-points-overlay";
import { type CardPaletteProps } from "./common";
import { LogoMask } from "@/components/logo";

const CardPalette5Base = ({
  points,
  className,
  style,
  image,
}: CardPaletteProps) => {
  const first = points[0]!;

  return (
    <div
      style={{ backgroundColor: first.color, ...style }}
      className={cn("relative flex aspect-[16/9] w-[375px]", className)}
    >
      <LogoMask
        className="absolute top-2 right-2"
        style={{ color: Color(first.color).isDark() ? "#fff" : "#000" }}
      />
      <ColorPointsOverlay
        className="z-50 size-full"
        points={points}
        image={image}
      />
      <div className="absolute bottom-0 left-0 z-10 flex h-4 w-full">
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
