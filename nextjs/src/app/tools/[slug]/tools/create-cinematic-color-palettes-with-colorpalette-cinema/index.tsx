"use client";

import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, UploadIcon } from "lucide-react";
import { getColorName } from "@/lib/nearest";
import { SaveableContent } from "./content";
import { getPaletteWithPercentsFromImage, type ColorData } from "./utils";

const CreateCinematicGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorData>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 提取颜色
  const extractColors = useCallback((file: File) => {
    const img = new Image();

    img.onload = async () => {
      try {
        const palette = await getPaletteWithPercentsFromImage(img, 12);

        setColors(palette);
        toast.success(`Extracted ${palette.length} colors from image`);
        return palette;
      } catch (error) {
        toast.error("Failed to extract colors from image");
        console.error("Vibrant error:", error);
      }
    };

    img.onerror = () => {
      toast.error("Failed to load image");
    };

    img.src = URL.createObjectURL(file);
  }, []);

  // 拖拽配置
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        extractColors(file);
      }
    },
    onDropRejected: () => {
      toast.error("Please drop a valid image file");
    },
  });

  // 复制颜色数组
  const copyColors = async () => {
    const hexColors = colors.map((color) => {
      const hex = color.hex;
      return {
        color: hex,
        name: getColorName(hex)?.name,
        percent: color.percent,
      };
    });

    const colorString = `${JSON.stringify(hexColors)}`;
    await navigator.clipboard.writeText(colorString);
    toast.success(`Copied ${hexColors.length} colors to clipboard`);
  };

  return (
    <div className="flex justify-between">
      <div className={"mx-auto w-full max-w-5xl space-y-4 px-4 py-8"}>
        <div
          className={cn("bg-background w-full overflow-hidden rounded-lg", {
            "aspect-[4/3]": !image,
          })}
        >
          {!image ? (
            <div
              {...getRootProps()}
              className={`flex h-full cursor-pointer items-center justify-center transition-colors ${
                isDragActive
                  ? "border-primary bg-accent/30"
                  : "hover:bg-accent/10"
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <UploadIcon />
                </div>
                <p className="mb-2 text-xl font-semibold">
                  {isDragActive ? "Drop image here" : "Upload Image"}
                </p>
                <p className="text-muted-foreground">
                  {isDragActive
                    ? "Release to upload"
                    : "Drag and drop your image here, or click to select"}
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Supports JPG, PNG, GIF, WebP formats
                </p>
              </div>
            </div>
          ) : (
            <>
              <SaveableContent
                id="color-extractor"
                image={image}
                colors={colors}
              />
            </>
          )}
        </div>
      </div>

      {image && (
        <div className="flex flex-1 flex-col-reverse justify-between gap-4 py-8">
          <Button
            variant={"outline"}
            onClick={copyColors}
            size={"lg"}
            className="gap2 w-full"
          >
            <Copy className="h-4 w-4" />
            Copy Colors
          </Button>
          <Button
            className="gap2 w-full"
            size={"lg"}
            onClick={() => inputRef.current?.click()}
          >
            <UploadIcon className="h-4 w-4" />
            Upload New Image
          </Button>
          <input
            {...getInputProps()}
            ref={inputRef}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateCinematicGenerator;
