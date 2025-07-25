"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { getColorName } from "@/lib/nearest";
import Color from "color";
import { ChooseImage } from "./choose-image";
import { PickerPalette } from "./picker-palette";
import { ColorPoint, PickerColorsRefs } from "./picker-colors";

type GeneratorProps = { initialPoints?: ColorPoint[]; onColorsChangeEnter?: (points: ColorPoint[]) => void; initialImage?: string; onImageChange?: (image: string) => void };

export function Generator({ initialPoints = [], onColorsChangeEnter, initialImage, onImageChange }: GeneratorProps) {
  const [image, setImage] = useState<string>();
  const [points, setPoints] = useState<ColorPoint[]>([]);
  const pickerRef = useRef<PickerColorsRefs>(null);

  useEffect(() => {
    if (initialPoints.length > 0) {
      setPoints(initialPoints);
    }
  }, [initialPoints]);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    }
  }, [initialImage]);

  useEffect(() => {
    onColorsChangeEnter?.(
      points.map((item) => {
        return {
          ...item,
          name: getColorName(Color(item.color).hex())?.name,
        };
      })
    );
  }, [points, onColorsChangeEnter]);

  const deletePoint = useCallback((id: number) => {
    setPoints((prev) => prev.filter((point) => point.id !== id));
  }, []);

  const handleImageUpload = (newImage: string) => {
    setImage(newImage);
    setPoints(pickerRef.current?.extractMainColors(5) || []);
    onImageChange?.(newImage);
  };

  console.log(points);

  return (
    <div className="px-4 xl:px-0">
      <ChooseImage onChange={handleImageUpload} image={image}>
        {image && <PickerPalette ref={pickerRef} points={points} onDeleteColor={deletePoint} image={image} onColorsChangeEnter={setPoints} />}
      </ChooseImage>
    </div>
  );
}
