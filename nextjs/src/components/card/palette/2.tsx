"use client";

import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { type CardPaletteProps } from "./common";
import { LogoMask } from "@/components/logo";

const CardPalette2Base = ({ points, className, style }: CardPaletteProps) => {
  const end = Color(points[points.length - 1]!.color);

  return (
    <div
      style={style}
      className={cn(
        "bg-background relative flex aspect-video w-[375px]",
        className,
      )}
    >
      <LogoMask
        className="absolute top-2 right-2"
        style={{ color: end.isDark() ? "#fff" : "#000" }}
      />
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
  );
};

export const CardPalette2 = withSave(CardPalette2Base);
CardPalette2.displayName = "CardPalette2";
