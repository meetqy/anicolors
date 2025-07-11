"use client";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PickerColors, { type ColorPoint } from "./picker-colors";
import Color from "color";
import { LuUpload } from "react-icons/lu";
import { getColorName } from "@/lib/nearest";

type GeneratorProps = { initialPoints?: ColorPoint[]; onColorsChangeEnter?: (points: ColorPoint[]) => void; initImage?: string; onImageChange?: (image: string) => void };

export function Generator({ initialPoints = [], onColorsChangeEnter, initImage, onImageChange }: GeneratorProps) {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorPoint[]>([]);

  useEffect(() => {
    if (!colors.length && initialPoints.length) {
      setColors(initialPoints);
    }
  }, [initialPoints, colors.length]);

  // 当 initImage 变化时更新图片
  useEffect(() => {
    setImage(initImage || null);
  }, [initImage, setImage]);

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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = e.target?.result as string;
          setImage(newImage);
          setColors([]); // 重置颜色标记
          onImageChange?.(newImage);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageChange, setImage, setColors]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
    noClick: !!image, // 当有图片时禁用点击，只允许拖拽
  });

  return (
    <div className="px-4 xl:px-0">
      <div
        {...getRootProps()}
        className={`mx-auto flex w-full max-w-screen-lg flex-col overflow-hidden rounded-md border lg:flex-row relative ${isDragActive ? "ring-2 ring-primary ring-offset-2" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary/10 backdrop-blur-sm rounded-md">
            <div className="text-center">
              <p className="text-lg font-medium">Drop to replace image</p>
              <p className="text-muted-foreground text-sm">This will reset all color markers</p>
            </div>
          </div>
        )}

        {!image ? (
          <div className="flex aspect-video w-full items-center justify-center p-8">
            <div className="relative flex size-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors border-muted-foreground/25 hover:border-muted-foreground/50">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-muted flex items-center justify-center rounded-full p-4">
                  <LuUpload className="text-muted-foreground size-8" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">Upload Image</p>
                  <p className="text-muted-foreground text-sm">Click or drag an image here</p>
                  <p className="text-muted-foreground text-xs">Supports PNG, JPG, GIF, WebP formats</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-muted flex aspect-[5/4] h-full w-full min-w-96 items-center justify-center p-4 lg:w-2/3 lg:border-r">
              <div className="min-w-96">
                <PickerColors
                  key={image} // 添加 key 确保组件重新渲染
                  initialPoints={colors.length ? colors : initialPoints}
                  image={image}
                  onColorsChangeEnter={setColors}
                  classNames={{
                    image: "crossOrigin-anonymous",
                  }}
                />
              </div>
            </div>

            <aside className="flex w-full flex-col p-4 lg:w-1/3">
              <div className="relative mb-6">
                <h2 className="text-lg font-semibold">Palette</h2>
                <p className="text-muted-foreground text-sm">Click and drag markers to adjust colors</p>
              </div>

              <div className="flex flex-row gap-2 lg:flex-col lg:gap-6">
                {colors.map((color) => (
                  <div
                    key={color.id}
                    style={{
                      background: color.color,
                      color: Color(color.color).isLight() ? "black" : "white",
                    }}
                    className="relative flex h-36 w-full items-center overflow-hidden rounded-lg lg:h-16"
                  >
                    <span className="absolute right-4 bottom-2 font-mono text-sm opacity-90">{Color(color.color).hex()}</span>
                  </div>
                ))}
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
