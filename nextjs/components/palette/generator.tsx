"use client";
import { useState, useEffect, useRef } from "react";
import { getColorName } from "@/lib/nearest";
import Color from "color";
import { ChooseImage } from "./choose-image";
import { PickerPalette } from "./picker-palette";
import { ColorPoint, PickerColorsRefs } from "./picker-colors";
import { PickerPart } from "./picker-part";

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

  const handleImageUpload = (newImage: string) => {
    setImage(newImage);
    onImageChange?.(newImage);
  };

  return (
    <div className="px-4 xl:px-0">
      <PickerPart
        className="mb-6"
        onColorsChange={(e) => {
          console.log("Picked colors:", e);
        }}
      />
      <ChooseImage onChange={handleImageUpload} image={image}>
        <PickerPalette
          onImageLoaded={() => {
            if (!image?.startsWith("http")) {
              setPoints(pickerRef.current?.extractMainColors(5) || []);
            }
          }}
          ref={pickerRef}
          points={points}
          onDeleteColor={(id) => {
            setPoints((prev) => prev.filter((point) => point.id !== id));
          }}
          image={image}
          onColorsChangeEnter={setPoints}
        />
      </ChooseImage>
    </div>
  );
}
