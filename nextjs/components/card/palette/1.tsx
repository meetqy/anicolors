import { ColorPoint } from "@/components/palette/picker-colors";
import Color from "color";
import { withSave } from "../with-save";
import { cn } from "@/lib/utils";

interface CardPalette1Props {
  points: ColorPoint[];
  image: string;
  className?: string;
  style?: React.CSSProperties;
}

const CardPalette1Base = ({ points, className, style }: CardPalette1Props) => {
  const end = Color(points[points.length - 1].color);

  return (
    <div style={style} className={cn("w-[375px] aspect-[3/4] flex flex-col relative bg-background", className)}>
      <div className="absolute text-xl right-4 bottom-2 font-serif italic font-bold opacity-80" style={{ color: end.isDark() ? "#fff" : "#000" }}>
        HiColors
      </div>
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
