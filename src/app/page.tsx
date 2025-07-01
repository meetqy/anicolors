"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import PickerColors, { type ColorPoint } from "./components/picker-colors";

const initialPoints: ColorPoint[] = [
  {
    id: 1,
    x: 214.875,
    y: 96.31690140845072,
    color: "rgb(255, 211, 222)",
  },
  {
    id: 2,
    x: 110.0862676056338,
    y: 113.21830985915494,
    color: "rgb(245, 169, 255)",
  },
  {
    id: 3,
    x: 223.6637323943662,
    y: 212.59859154929578,
    color: "rgb(200, 174, 238)",
  },
  {
    id: 4,
    x: 117.52288732394366,
    y: 201.7816901408451,
    color: "rgb(149, 106, 33)",
  },
  {
    id: 5,
    x: 287.2130281690141,
    y: 217.330985915493,
    color: "rgb(236, 173, 241)",
  },
];

export default function Page() {
  const [image, setImage] = useState<string | null>(null);

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

  const handleColorsChange = (colors: ColorPoint[]) => {
    console.log("Selected colors:", colors);
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg overflow-hidden rounded-md border">
      {!image ? (
        <div className="flex min-h-[60vh] items-center justify-center p-8">
          <div
            {...getRootProps()}
            className={`relative w-full max-w-md cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted rounded-full p-4">
                <Upload className="text-muted-foreground h-8 w-8" />
              </div>
              {isDragActive ? (
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop files here</p>
                  <p className="text-muted-foreground text-sm">
                    Release to upload your image
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-medium">Upload Image</p>
                  <p className="text-muted-foreground text-sm">
                    Click or drag an image here
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Supports PNG, JPG, GIF, WebP formats
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-muted flex aspect-[5/4] h-full w-2/3 min-w-96 items-center justify-center border-r p-4">
          <div className="min-w-96">
            <PickerColors
              initialPoints={initialPoints}
              image={image}
              onColorsChange={handleColorsChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
