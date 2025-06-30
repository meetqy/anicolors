"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import PickerColors, { type ColorPoint } from "./components/picker-colors";

const initialPoints: ColorPoint[] = [
  {
    id: 1,
    x: 187,
    y: 139,
    color: "rgb(188, 99, 114)",
  },
  {
    id: 2,
    x: 90,
    y: 129,
    color: "rgb(22, 121, 149)",
  },
  {
    id: 3,
    x: 237,
    y: 271,
    color: "rgb(165, 121, 205)",
  },
  {
    id: 4,
    x: 238,
    y: 314,
    color: "rgb(223, 188, 219)",
  },
  {
    id: 5,
    x: 312,
    y: 208,
    color: "rgb(205, 160, 162)",
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
    <div className="mx-auto w-full max-w-screen-lg rounded-md border">
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
        <div className="bg-muted/50 w-1/2 min-w-96">
          <PickerColors
            initialPoints={initialPoints}
            image={image}
            onColorsChange={handleColorsChange}
          />
        </div>
      )}
    </div>
  );
}
