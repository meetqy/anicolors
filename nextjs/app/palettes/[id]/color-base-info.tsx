"use client";

import { ColorPoint } from "@/components/palette/picker-colors";
import Color from "color";
import { toast } from "sonner";

export const ColorBaseInfo = ({ point }: { point: ColorPoint }) => {
  const item = Color(point.color);
  const hex = item.hex();
  const rgb = item.rgb().string();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="bg-card overflow-hidden rounded-lg flex justify-center">
      <div className="flex-col flex justify-center items-center gap-x-2 gap-y-4">
        <div className="size-12 rounded-full" style={{ backgroundColor: hex }}></div>
        <p onClick={() => copyToClipboard(hex)}>{hex}</p>
        <p className="lg:block hidden text-sm" onClick={() => copyToClipboard(rgb)}>
          {rgb}
        </p>
      </div>
    </div>
  );
};
