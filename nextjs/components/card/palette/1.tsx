"use client";

import { ColorPoint } from "@/components/palette/picker-colors";
import Color from "color";
import { forwardRef, useImperativeHandle, useRef } from "react";
import domtoimage from "dom-to-image";

export interface CardPalette1Ref {
  saveAsImage: (filename?: string, scale?: number) => Promise<void>;
  getImageBlob: (scale?: number) => Promise<Blob>;
}

interface CardPalette1Props {
  points: ColorPoint[];
  image: string;
}

export const CardPalette1 = forwardRef<CardPalette1Ref, CardPalette1Props>(({ points }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const end = Color(points[points.length - 1].color);

  useImperativeHandle(ref, () => ({
    saveAsImage: async (filename = "palette.png", scale = 1) => {
      if (!cardRef.current) return;

      try {
        const options = {
          width: cardRef.current.offsetWidth * scale,
          height: cardRef.current.offsetHeight * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: cardRef.current.offsetWidth + "px",
            height: cardRef.current.offsetHeight + "px",
          },
        };

        const dataUrl = await domtoimage.toPng(cardRef.current, options);
        const link = document.createElement("a");
        link.download = filename;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error saving image:", error);
      }
    },
    getImageBlob: async (scale = 1) => {
      if (!cardRef.current) throw new Error("Card ref not available");

      try {
        const options = {
          width: cardRef.current.offsetWidth * scale,
          height: cardRef.current.offsetHeight * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: cardRef.current.offsetWidth + "px",
            height: cardRef.current.offsetHeight + "px",
          },
        };

        return await domtoimage.toBlob(cardRef.current, options);
      } catch (error) {
        console.error("Error getting image blob:", error);
        throw error;
      }
    },
  }));

  return (
    <div ref={cardRef} className="w-[375px] aspect-[3/4] flex flex-col relative rounded-md overflow-hidden">
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
});

CardPalette1.displayName = "CardPalette1";
