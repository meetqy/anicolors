"use client";

import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { ColorPointsOverlay } from "@/components/color-points-overlay";
import { type CardPaletteProps } from "./common";
import { LogoMask } from "@/components/logo";

const CardPalette3Base = ({
  points,
  className,
  style,
  image,
}: CardPaletteProps) => {
  return (
    <div
      style={style}
      className={cn(
        "bg-background relative flex aspect-square w-[375px] flex-col",
        className,
      )}
    >
      <LogoMask className="absolute top-2 right-2" />
      <div className="bg-muted h-[70%] w-full">
        <ColorPointsOverlay
          className="top-5 z-50 size-full scale-110"
          points={points}
          image={image}
        />
      </div>
      <div className="relative z-30 flex flex-1">
        {points.map((item) => {
          const color = Color(item.color);
          return (
            <div
              key={item.id}
              className="flex flex-1 items-center justify-end px-4 font-mono text-sm"
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

export const CardPalette3 = withSave(CardPalette3Base);
CardPalette3.displayName = "CardPalette3";
