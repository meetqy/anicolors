"use client";

import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { ColorPointsOverlay } from "@/components/color-points-overlay";
import { type CardPaletteProps } from "./common";
import { LogoMask } from "@/components/logo";

const CardPalette4Base = ({
  points,
  className,
  style,
  image,
}: CardPaletteProps) => {
  return (
    <div
      style={style}
      className={cn(
        "bg-background relative flex aspect-[16/9] w-[375px]",
        className,
      )}
    >
      <LogoMask className="absolute top-2 left-2" />
      <div className="bg-background flex w-2/3 items-center justify-center">
        <ColorPointsOverlay
          className="z-50 size-full"
          points={points}
          image={image}
        />
      </div>
      <div className="relative flex flex-1 flex-col gap-1">
        {points.map((item) => {
          const color = Color(item.color);
          return (
            <div
              key={item.id}
              className="flex flex-1 items-center justify-end pr-2 font-mono text-sm"
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
