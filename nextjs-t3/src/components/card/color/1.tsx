import { ColorPoint } from "@/components/palette/picker-colors";
import { cn } from "@/lib/utils";
import Color from "color";
import { withSave } from "../with-save";
import { useEffect, useRef, useState } from "react";

type CardColor1Props = {
  point: ColorPoint;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    valuesContainer?: string;
  };
  maskExtra?: React.ReactNode;
};

const CardColor1Base = ({ point, index, className, style, classNames }: CardColor1Props) => {
  const color = Color(point.color);
  const hex = color.hex();
  const rgb = color.rgb().string();
  const cmyk = color.cmyk().string();

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const baseWidth = 375;
        const newScale = containerWidth / baseWidth;
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("", className)}
      style={{
        ...style,
        width: className?.includes("w-full") ? "100%" : "375px",
        height: `${300 * scale}px`,
      }}
    >
      <div
        className="aspect-[5/4] flex flex-col bg-background origin-top-left"
        style={{
          transform: `scale(${scale})`,
          width: "375px",
        }}
      >
        {/* Color preview bar */}
        <div className="relative flex-shrink-0 flex h-20 w-full items-center justify-between px-6" style={{ backgroundColor: point.color }}>
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
              #{index}
            </span>
          )}
        </div>

        {/* Color values */}
        <div className={cn("flex flex-col justify-between flex-1 p-4", classNames?.valuesContainer)}>
          <button className="bg-muted border-muted flex w-full items-center justify-between rounded-md border p-2 ">
            <div className="text-left">
              <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">HEX</div>
              <div className="font-mono text-sm font-medium">{hex}</div>
            </div>
          </button>

          <button className="bg-muted border-muted flex w-full items-center justify-between rounded-md border p-2 ">
            <div className="text-left">
              <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">RGB</div>
              <div className="font-mono text-sm font-medium">{rgb}</div>
            </div>
          </button>

          <button className="bg-muted border-muted flex w-full items-center justify-between rounded-md border p-2 ">
            <div className="text-left">
              <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">CMYK</div>
              <div className="truncate font-mono text-sm font-medium">{cmyk}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export const CardColor1 = withSave(CardColor1Base);
CardColor1.displayName = "CardColor1";
