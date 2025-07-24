"use client";
import { useState, useCallback, useEffect } from "react";
import { getColorName } from "@/lib/nearest";
import Color from "color";
import { ChooseImage } from "./choose-image";
import { PickerPalette } from "./picker-palette";
import { ColorPoint } from "./picker-colors";

type GeneratorProps = { initialPoints?: ColorPoint[]; autoExtract?: boolean; onColorsChangeEnter?: (points: ColorPoint[]) => void; initImage?: string; onImageChange?: (image: string) => void };

export function Generator({ initialPoints = [], onColorsChangeEnter, initImage, autoExtract, onImageChange }: GeneratorProps) {
  const [image, setImage] = useState<string>();
  const [colors, setColors] = useState<ColorPoint[]>([]);

  useEffect(() => {
    if (initialPoints.length > 0) {
      setColors(initialPoints);
    }
  }, [initialPoints]);

  useEffect(() => {
    if (initImage) {
      setImage(initImage);
    }
  }, [initImage]);

  useEffect(() => {
    onColorsChangeEnter?.(
      colors.map((item) => {
        return {
          ...item,
          name: getColorName(Color(item.color).hex())?.name,
        };
      })
    );
  }, [colors, onColorsChangeEnter]);

  const deleteColor = useCallback((id: number) => {
    setColors((prev) => prev.filter((color) => color.id !== id));
  }, []);

  const handleImageUpload = useCallback(
    (newImage: string) => {
      setImage(newImage);
      setColors([]);
      onImageChange?.(newImage);
    },
    [onImageChange]
  );

  return (
    <div className="px-4 xl:px-0">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col overflow-hidden rounded-md border lg:flex-row relative">
        <ChooseImage onChange={handleImageUpload} image={image} />

        {image && <PickerPalette autoExtract={autoExtract} colors={colors} onDeleteColor={deleteColor} image={image} onColorsChange={setColors} />}
      </div>
    </div>
  );
}
