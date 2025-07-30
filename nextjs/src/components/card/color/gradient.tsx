import { type ColorPoint } from "@/components/palette/picker-colors";
import { cn } from "@/lib/utils";
import Color from "color";
import { withSave } from "../with-save";
import { type CSSProperties } from "react";
import { LogoMask } from "@/components/logo";

const CardColorGradientLightenBase = ({
  point,
  className,
  style,
}: {
  point: ColorPoint;
  className?: string;
  style?: CSSProperties;
}) => {
  const color = Color(point.color);
  const colors = [
    ...new Set(
      new Array(9).fill(0).map((_, index) => {
        const number = parseFloat((0.1 * index).toFixed(1));
        const hex = color.lighten(number).hex();
        return hex;
      }),
    ),
  ];

  return (
    <div
      className={cn(
        "bg-background relative grid aspect-[4/5] w-[375px]",
        className,
      )}
      style={style}
    >
      <LogoMask
        className="absolute right-2 bottom-2"
        variant="gradient"
        gradientColors={[color.lighten(0.1).hex(), color.darken(0.9).hex()]}
      />
      {colors.map((hex, index) => {
        return (
          <h3
            className={cn(
              "flex items-center gap-4 rounded-t-xl px-4 font-mono",
              { "-mt-3": index > 0, "font-medium": index === 0 },
            )}
            key={index}
            style={{
              backgroundColor: hex,
              color: Color(hex).isLight() ? "#000" : "#fff",
            }}
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
