import { cn } from "@/lib/utils";
import { withSave } from "../with-save";
import { CardPaletteProps } from "./common";
import { ColorPointsOverlay } from "@/components/color-points-overlay";
import Color from "color";
import { LogoMask } from "@/components/logo";

const _heights = ["h-1/2", "h-1/3", "h-2/5", "h-1/6", "h-2/7"];

const CardPalette6Base = ({ points, className, image }: CardPaletteProps) => {
  const bgColor = points[0].color;
  const heights = _heights.slice(0, points.length).sort(() => Math.random() - 0.5);

  // 计算颜色亮度来调整阴影强度
  const getLuminance = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const luminance = getLuminance(points[0]?.color || "#000000");
  const isDark = luminance < 0.5;

  return (
    <div
      className={cn("group aspect-[4/5] rounded-md overflow-hidden", className)}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <LogoMask className="absolute right-1 top-1 z-20" />
      <div className="relative h-full pt-[105px]">
        <div
          className="absolute z-10 bottom-[-85px] left-1/2 w-56 h-56 rounded-full -translate-x-1/2 rotate-x-[80deg]"
          style={{
            background: Color(bgColor).hex() + "70",
            boxShadow: `
              0 30px 60px rgba(0,0,0,${isDark ? "0.4" : "0.2"}),
              0 20px 40px rgba(0,0,0,${isDark ? "0.3" : "0.15"}),
              0 10px 20px rgba(0,0,0,${isDark ? "0.2" : "0.1"}),
              inset 0 -15px 30px rgba(0,0,0,${isDark ? "0.2" : "0.3"}),
              inset 0 15px 30px rgba(255,255,255,${isDark ? "0.1" : "0.4"}),
              inset -10px 0 20px rgba(0,0,0,0.1),
              inset 10px 0 20px rgba(255,255,255,0.1)
            `,
            transform: "rotateX(80deg) rotateY(-5deg)",
          }}
        />
        <div className="relative h-full z-10 scale-130 translate-y-[-60px] rotate-x-[15deg] drop-shadow-2xl">
          <ColorPointsOverlay className="size-full z-50" points={points} image={image} />
        </div>
        <div className="flex w-full h-full absolute bottom-0 left-0 items-end flex-row-reverse">
          {points.map((point, index) => {
            const randomHeight = heights[index % heights.length];
            return <div className={`w-full rounded-t-md ${randomHeight}`} key={index} style={{ backgroundColor: point.color }}></div>;
          })}
        </div>
      </div>
    </div>
  );
};

export const CardPalette6 = withSave(CardPalette6Base);
CardPalette6.displayName = "CardPalette6";
