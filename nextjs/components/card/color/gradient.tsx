import { ColorPoint } from "@/components/palette/picker-colors";
import { cn } from "@/lib/utils";
import Color from "color";
import { withSave } from "../with-save";
import { CSSProperties } from "react";
import { HiColorsLogo } from "@/components/hicolors-logo";

const CardColorGradientLightenBase = ({ point, className, style }: { point: ColorPoint; className?: string; style?: CSSProperties }) => {
  const color = Color(point.color);
  const colors = [
    ...new Set(
      new Array(9).fill(0).map((_, index) => {
        const number = parseFloat((0.1 * index).toFixed(1));
        const hex = color.lighten(number).hex();
        return hex;
      })
    ),
  ];

  return (
    <div className={cn("relative bg-background grid w-[375px] aspect-[4/5]", className)} style={style}>
      <HiColorsLogo className="absolute text-xl right-4 bottom-2" variant="gradient" gradientColors={[color.lighten(0.1).hex(), color.darken(0.9).hex()]} />
      {colors.map((hex, index) => {
        return (
          <h3
            className={cn("rounded-t-xl flex px-4 font-mono gap-4 items-center", { "-mt-3": index > 0, "font-medium": index === 0 })}
            key={index}
            style={{ backgroundColor: hex, color: Color(hex).isLight() ? "#000" : "#fff" }}
          >
            {index === 0 && <span className="text-xl">{point.name}</span>}
            <span className="relative top-0.5">{hex}</span>
          </h3>
        );
      })}
    </div>
  );
};

export const CardColorGradientLighten = withSave(CardColorGradientLightenBase);
CardColorGradientLighten.displayName = "CardColorGradientLighten";
