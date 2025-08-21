"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, UploadIcon } from "lucide-react";
import { getColorName } from "@/lib/nearest";
import { SaveableContent } from "./content";
import { getPaletteWithPercentsFromImage, type ColorData } from "../utils";

export const Generator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorData>([]);
  const [loading, setLoading] = useState(false);

  // 提取颜色
  const extractColors = useCallback((file: File) => {
    setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    img.onerror = () => {
      toast.error("Failed to load image");
      setLoading(false);
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
    <div className="mx-auto w-full max-w-4xl space-y-4 px-4 py-8">
      {image && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={copyColors}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy Colors Array
          </Button>
        </div>
      )}

      <div
        className={cn(
          "bg-background w-full overflow-hidden rounded-lg border",
          { "aspect-[4/3]": !image },
        )}
      >
        {!image ? (
          /* 上传区域 - 不需要保存功能 */
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
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
};
