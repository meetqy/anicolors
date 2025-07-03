"use client";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PickerColors, { type ColorPoint } from "./picker-colors";
import Color from "color";
import { LuUpload } from "react-icons/lu";

export function Generator({ initialPoints = [], onChange }: { initialPoints?: ColorPoint[]; onChange?: (points: ColorPoint[]) => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorPoint[]>(initialPoints);

  useEffect(() => {
    console.log(colors);
    onChange?.(colors);
  }, [colors, onChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
  });

  return (
    <div className="px-4 xl:px-0">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col overflow-hidden rounded-md border lg:flex-row">
        {!image ? (
          <div className="flex aspect-video w-full items-center justify-center p-8">
            <div
              {...getRootProps()}
              className={`relative flex size-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="bg-muted flex items-center justify-center rounded-full p-4">
                  <LuUpload className="text-muted-foreground size-8" />
                </div>
                {isDragActive ? (
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drop files here</p>
                    <p className="text-muted-foreground text-sm">Release to upload your image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Upload Image</p>
                    <p className="text-muted-foreground text-sm">Click or drag an image here</p>
                    <p className="text-muted-foreground text-xs">Supports PNG, JPG, GIF, WebP formats</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-muted flex aspect-[5/4] h-full w-full min-w-96 items-center justify-center p-4 lg:w-2/3 lg:border-r">
              <div className="min-w-96">
                <PickerColors initialPoints={initialPoints} image={image} onColorsChange={setColors} />
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
