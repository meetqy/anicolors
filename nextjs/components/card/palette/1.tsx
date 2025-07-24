import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { CardPaletteProps } from "./common";
import { HiColorsLogo } from "@/components/hicolors-logo";

const CardPalette1Base = ({ points, className, style }: CardPaletteProps) => {
  const end = Color(points[points.length - 1].color);

  return (
    <div style={style} className={cn("w-[375px] aspect-[3/4] flex flex-col relative bg-background", className)}>
      <HiColorsLogo className="absolute bottom-2 right-2" style={{ color: end.isDark() ? "#fff" : "#000" }} />
      {points.map((item) => {
        const color = Color(item.color);
        return (
          <div key={item.id} className="flex-1 px-8 flex items-center font-medium" style={{ backgroundColor: color.hex(), color: color.isDark() ? "#fff" : "#000" }}>
            {color.hex()}
          </div>
        );
      })}
    </div>
  );
};

export const CardPalette1 = withSave(CardPalette1Base);
CardPalette1.displayName = "CardPalette1";
