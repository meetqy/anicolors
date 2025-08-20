"use client";

import { useState, useCallback } from "react";
import ColorThief from "colorthief";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { withSave } from "@/components/card/with-save";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, UploadIcon } from "lucide-react";
import Color from "color";
import { getColorName } from "@/lib/nearest";
import { sortColors } from "@/lib/sort-colors";

interface ColorData {
  rgb: [number, number, number];
}

// 图片和调色板展示组件
const PosterContent = ({
  image,
  colors,
  loading,
}: {
  image: string;
  colors: ColorData[];
  loading: boolean;
}) => {
  return (
    <div className="flex h-full flex-col gap-2 bg-white p-2">
      {/* 图片展示区域 - 占用上半部分 */}
      <div className="flex flex-1 justify-center">
        <img src={image} alt="Uploaded" className="object-contain" />
      </div>

      {/* 调色板区域 - 占用下半部分 */}
      <div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Extracting colors...</div>
          </div>
        ) : colors.length > 0 ? (
          <div className="space-y-3">
            {/* 颜色网格 */}
            <div className="grid grid-cols-6 gap-2 md:grid-cols-12">
              {sortColors(
                colors.map((e) =>
                  Color(`rgb(${e.rgb[0]}, ${e.rgb[1]}, ${e.rgb[2]})`).hex(),
                ),
              ).map((color, index) => {
                return (
                  <div key={index} className="group">
                    <div
                      className="aspect-[9/16] w-full cursor-pointer transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// 使用 withSave 包装图片和调色板组件
const SaveablePosterContent = withSave(PosterContent);

export const Generator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorData[]>([]);
  const [loading, setLoading] = useState(false);

  // 提取颜色
  const extractColors = useCallback((file: File) => {
    setLoading(true);
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 12); // 获取12种颜色

        const extractedColors: ColorData[] = palette.map(
          (rgb: [number, number, number]) => ({
            rgb,
          }),
        );

        setColors(extractedColors);
        toast.success(`Extracted ${extractedColors.length} colors from image`);
      } catch (error) {
        toast.error("Failed to extract colors from image");
        console.error(error);
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
      const colorInstance = Color.rgb(color.rgb[0], color.rgb[1], color.rgb[2]);
      const hex = colorInstance.hex();
      return {
        color: hex,
        name: getColorName(hex)?.name,
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
            <SaveablePosterContent
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
