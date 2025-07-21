import { ColorPoint } from "@/components/palette/picker-colors";
import { cn } from "@/lib/utils";
import Color from "color";
import { withSave } from "../with-save";

type CardColor1Props = {
  point: ColorPoint;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    valuesContainer?: string;
  };
};

const CardColor1Base = ({ point, index, className, style, classNames }: CardColor1Props) => {
  const color = Color(point.color);
  const hex = color.hex();
  const rgb = color.rgb().string();
  const cmyk = color.cmyk().string();

  return (
    <div className={cn("w-[375px] aspect-[5/4] overflow-hidden rounded-md flex flex-col border bg-background", className)} style={style}>
      {/* Color preview bar */}
      <div className="relative flex h-20 w-full items-center justify-between px-6" style={{ backgroundColor: point.color }}>
        <h3
          className="text-lg font-medium truncate pr-4"
          style={{
            color: color.isDark() ? "white" : "black",
          }}
        >
          {point.name}
        </h3>
        {index && (
          <span
            className="text-sm opacity-75 flex-shrink-0"
            style={{
              color: color.isDark() ? "white" : "black",
            }}
          >
            #{index + 1}
          </span>
        )}
      </div>

      {/* Color values */}
      <div className={cn("p-4 flex flex-col flex-1 space-y-2", classNames?.valuesContainer)}>
        <button className="bg-muted border-muted flex w-full items-center justify-between rounded-md border p-3 transition-colors">
          <div className="text-left">
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">HEX</div>
            <div className="font-mono text-sm font-medium">{hex}</div>
          </div>
        </button>

        <button className="bg-muted border-muted flex w-full items-center justify-between rounded-md border p-3 transition-colors">
          <div className="text-left">
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">RGB</div>
            <div className="font-mono text-sm font-medium">{rgb}</div>
          </div>
        </button>

        <button className="bg-muted border-muted flex w-full items-center justify-between rounded-md border p-3 transition-colors">
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
