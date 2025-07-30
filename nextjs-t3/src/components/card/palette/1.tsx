import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";
import { type CardPaletteProps } from "./common";
import { LogoMask } from "@/components/logo";

const CardPalette1Base = ({ points, className, style }: CardPaletteProps) => {
  const end = Color(points[points.length - 1]!.color);

  return (
    <div
      style={style}
      className={cn(
        "bg-background relative flex aspect-[3/4] w-[375px] flex-col",
        className,
      )}
    >
      <LogoMask
        className="absolute right-2 bottom-2"
        style={{ color: end.isDark() ? "#fff" : "#000" }}
      />
      {points.map((item) => {
        const color = Color(item.color);
        return (
          <div
            key={item.id}
            className="flex flex-1 items-center px-8 font-medium"
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
  );
};

export const CardPalette1 = withSave(CardPalette1Base);
CardPalette1.displayName = "CardPalette1";
