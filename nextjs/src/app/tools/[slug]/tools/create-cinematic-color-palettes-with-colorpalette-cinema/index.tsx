"use client";

import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { getColorName } from "@/lib/nearest";
import { SaveableContent } from "./content";
import { getPaletteWithPercentsFromImage, type ColorData } from "./utils";
import { ImageUpload } from "@/components/image-upload";
import Empty from "@/components/empty";
import { AdminWrapper } from "./admin";
import type { SaveableCardRef } from "@/components/card/with-save";
import { strapiCreatePalette, strapiUpload } from "./admin/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateCinematicGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [colors, setColors] = useState<ColorData>([]);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>();
  const [objectFit, setObjectFit] = useState<string>();
  const [loading, setLoading] = useState(false);

  const paletteRef = useRef<SaveableCardRef>(null);

  // 提取颜色
  const extractColors = useCallback((imageDataUrl: string) => {
    const img = new Image();

    img.onload = async () => {
      try {
        setImageSize({ width: img.width, height: img.height });
        const palette = await getPaletteWithPercentsFromImage(img, 12);

        setColors(palette);
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
    (imageDataUrl: string | null, file: File | null) => {
      setImage(imageDataUrl);
      setImageFile(file);
      if (imageDataUrl) {
        extractColors(imageDataUrl);
      } else {
        setColors([]);
      }
    },
    [extractColors],
  );

  const upload = async () => {
    if (loading) return;
    setLoading(true);
    if (paletteRef.current) {
      const blob = await paletteRef.current.getImageBlob();
      if (!imageFile) {
        toast.error("No image file to upload");
        setLoading(false);
        return;
      }

      const [categorySlug, name] = imageFile.name.split("#");

      if (!categorySlug || !name) {
        toast.error("Image name must be in the format category#name.ext");
        setLoading(false);
        return;
      }

      const { data } = await strapiUpload([
        new File([blob], `${name}-palette.png`, { type: blob.type }),
        imageFile,
      ]);

      await strapiCreatePalette({
        name,
        categorySlug,
        points: colors.map((color) => {
          const hex = color.hex;
          return {
            color: hex,
            name: getColorName(hex)?.name || "Unknown",
            percent: color.percent,
          };
        }),
        imageIds: data.map((item: { id: number }) => item.id),
      });
      setLoading(false);
    }
    setLoading(false);
  };

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
      <div className="flex w-full max-w-sm flex-col justify-between pr-4">
        <ImageUpload onImageChange={handleImageChange} />

        <div className="space-y-3">
          <Select
            onValueChange={(value) => setObjectFit(value)}
            value={objectFit}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Object Fit" />
            </SelectTrigger>
            <SelectContent>
              {["cover", "contain"].map((fit) => (
                <SelectItem key={fit} value={fit}>
                  {fit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={copyColors} className="w-full gap-2">
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
            targetWidth={1920}
            image={image}
            colors={colors}
            objectFit={objectFit as "cover" | "contain"}
            ref={paletteRef}
          />
        ) : (
          <Empty
            title="No image uploaded"
            description="Please upload an image to extract colors."
          />
        )}
      </div>

      <AdminWrapper onSubmit={upload} disabled={loading} />
    </div>
  );
};

export default CreateCinematicGenerator;
