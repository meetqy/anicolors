"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { LuUpload } from "react-icons/lu";

interface ChooseImageProps {
  onChange: (image: string) => void;
  image?: string;
  children?: React.ReactNode;
}

export function ChooseImage({ onChange, image, children }: ChooseImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = e.target?.result as string;
          onChange(newImage);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
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

      {image ? (
        children
      ) : (
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
      )}
    </div>
  );
}
