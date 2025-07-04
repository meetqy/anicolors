import { ColorPoint } from "@/components/palette/picker-colors";
import { cn } from "@/lib/utils";
import Color from "color";
import { withSave, SaveableCardRef } from "../with-save";
import { forwardRef } from "react";

interface CardColorGradientLightenProps {
  point: ColorPoint;
  className?: string;
}

const CardColorGradientLightenBase = forwardRef<HTMLDivElement, CardColorGradientLightenProps>(({ point, className }, ref) => {
  const color = Color(point.color);

  return (
    <div ref={ref} style={{ width: 360, height: 540 }} className={cn("relative grid rounded-xl overflow-hidden", className)}>
      <div
        className="absolute text-xl right-4 bottom-2 font-serif italic text-transparent bg-clip-text font-bold"
        style={{
          backgroundImage: `linear-gradient(135deg, ${color.lighten(0.1).hex()}, ${color.darken(0.9).hex()})`,
        }}
      >
        HiColors
      </div>
      {new Array(9).fill(0).map((_, index) => {
        const number = parseFloat((0.1 * index).toFixed(1));
        const hex = color.lighten(number).hex();

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
});

CardColorGradientLightenBase.displayName = "CardColorGradientLightenBase";

export const CardColorGradientLighten = withSave(CardColorGradientLightenBase);
export type CardColorGradientLightenRef = SaveableCardRef;
