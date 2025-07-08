import { ColorPoint } from "@/components/palette/picker-colors";
import { cn } from "@/lib/utils";
import Color from "color";
import { withSave } from "../with-save";

const CardColor1Base = ({ point, index, className, style }: { point: ColorPoint; index: number; className?: string; style?: React.CSSProperties }) => {
  const color = Color(point.color);
  const hex = color.hex();
  const rgb = color.rgb().string();
  const cmyk = color.cmyk().string();

  return (
    <div className={cn("w-[375px] aspect-[5/4] flex flex-col border bg-background", className)} style={style}>
      {/* Color preview bar */}
      <div className="relative flex h-24 w-full items-center justify-between px-6" style={{ backgroundColor: point.color }}>
        <h3
          className="text-lg font-medium"
          style={{
            color: color.isDark() ? "white" : "black",
          }}
        >
          {point.name}
        </h3>
        <span
          className="text-sm opacity-75"
          style={{
            color: color.isDark() ? "white" : "black",
          }}
        >
          #{index + 1}
        </span>
      </div>

      {/* Color values */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <button className="bg-muted border-muted  flex w-full items-center justify-between rounded-md border p-3 transition-colors">
          <div className="text-left">
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">HEX</div>
            <div className="font-mono text-sm font-medium">{hex}</div>
          </div>
        </button>

        <button className="bg-muted border-muted  flex w-full items-center justify-between rounded-md border p-3 transition-colors">
          <div className="text-left">
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">RGB</div>
            <div className="font-mono text-sm font-medium">{rgb}</div>
          </div>
        </button>

        <button className="bg-muted border-muted  flex w-full items-center justify-between rounded-md border p-3 transition-colors">
          <div className="text-left">
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">CMYK</div>
            <div className="truncate font-mono text-sm font-medium">{cmyk}</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export const CardColor1 = withSave(CardColor1Base);
CardColor1.displayName = "CardColor1";
