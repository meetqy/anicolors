"use client";

import { ColorPoint } from "@/components/palette/picker-colors";
import Color from "color";
import { toast } from "sonner";

export const CardColorBase = ({ point }: { point: ColorPoint }) => {
  const item = Color(point.color);
  const hex = item.hex();
  const rgb = item.rgb().string();
  const cmyk = item.cmyk().string();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="bg-card overflow-hidden rounded-lg border">
      {/* Color preview bar */}
      <div className="relative flex h-24 w-full items-center justify-between px-6" style={{ backgroundColor: hex }}>
        <h3 className="text-lg font-medium" style={{ color: item.isDark() ? "white" : "black" }}>
          {point.name}
        </h3>
      </div>

      {/* Color values */}
      <div className="space-y-3 p-4">
        <button
          onClick={() => copyToClipboard(hex)}
          className="bg-muted border-muted hover:border-primary flex w-full cursor-pointer items-center justify-between rounded-md border p-3 transition-colors"
        >
          <div className="text-left">
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">HEX</div>
            <div className="font-mono text-sm font-medium">{hex}</div>
          </div>
        </button>

        <button
          onClick={() => copyToClipboard(rgb)}
          className="bg-muted border-muted hover:border-primary flex w-full cursor-pointer items-center justify-between rounded-md border p-3 transition-colors"
        >
          <div className="text-left">
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">RGB</div>
            <div className="font-mono text-sm font-medium">{rgb}</div>
          </div>
        </button>

        <button
          onClick={() => copyToClipboard(cmyk)}
          className="bg-muted border-muted hover:border-primary flex w-full cursor-pointer items-center justify-between rounded-md border p-3 transition-colors"
        >
          <div className="text-left">
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">CMYK</div>
            <div className="truncate font-mono text-sm font-medium">{cmyk}</div>
          </div>
        </button>
      </div>
    </div>
  );
};
