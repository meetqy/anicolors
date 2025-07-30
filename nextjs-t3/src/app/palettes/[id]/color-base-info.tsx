"use client";

import { type ColorPoint } from "@/components/palette/picker-colors";
import Color from "color";
import { toast } from "sonner";

export const ColorBaseInfo = ({ point }: { point: ColorPoint }) => {
  const item = Color(point.color);
  const hex = item.hex();
  const rgb = item.rgb().string();

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="bg-card flex w-1/5 justify-center overflow-hidden rounded-lg">
      <div className="flex flex-col items-center justify-center gap-x-2 gap-y-4">
        <div
          className="size-12 rounded-full"
          style={{ backgroundColor: hex }}
        ></div>
        <p onClick={() => copyToClipboard(hex)}>{hex}</p>
        <p
          className="hidden text-sm lg:block"
          onClick={() => copyToClipboard(rgb)}
        >
          {rgb}
        </p>
      </div>
    </div>
  );
};
