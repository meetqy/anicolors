"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { getColorName } from "@/lib/nearest";
import { SaveableContent } from "./content";
import { getPaletteWithPercentsFromImage, type ColorData } from "./utils";
import { ImageUpload } from "@/components/image-upload";
import Empty from "@/components/empty";

const CreateCinematicGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorData>([]);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>();

  // 提取颜色
  const extractColors = useCallback((imageDataUrl: string) => {
    const img = new Image();

    img.onload = async () => {
      try {
        setImageSize({ width: img.width, height: img.height });
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

    img.src = imageDataUrl;
  }, []);

  // 处理图片变化
  const handleImageChange = useCallback(
    (imageDataUrl: string | null) => {
      setImage(imageDataUrl);
      if (imageDataUrl) {
        extractColors(imageDataUrl);
      } else {
        setColors([]);
      }
    },
    [extractColors],
  );

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
    <div className="flex aspect-video w-full">
      <div className="flex max-w-sm flex-col justify-between pr-4">
        <ImageUpload onImageChange={handleImageChange} />

        <div className="space-y-3">
          <Button
            variant={"outline"}
            onClick={copyColors}
            size={"lg"}
            className="w-full gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy Colors
          </Button>
        </div>
      </div>

      <div className="bg-background flex h-full flex-1 items-center justify-center rounded-md border">
        {image ? (
          <SaveableContent
            id="color-extractor"
            imageSize={imageSize}
            image={image}
            colors={colors}
          />
        ) : (
          <Empty
            title="No image uploaded"
            description="Please upload an image to extract colors."
          />
        )}
      </div>
    </div>
  );
};

export default CreateCinematicGenerator;
