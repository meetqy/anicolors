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

interface ImageItem {
  file: File;
  dataUrl: string;
  colors: ColorData;
}

const CreateCinematicGenerator = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [objectFit, setObjectFit] = useState<string>("contain");
  const [loading, setLoading] = useState(false);

  const paletteRefs = useRef<(SaveableCardRef | null)[]>([]);

  // 提取颜色
  const extractColorsFromDataUrl = useCallback(
    async (imageDataUrl: string): Promise<ColorData> => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = async () => {
          try {
            const colors = await getPaletteWithPercentsFromImage(img, 12);
            resolve(colors);
          } catch (error) {
            console.error("Color extraction error:", error);
            reject(new Error("Failed to extract colors"));
          }
        };

        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };

        img.src = imageDataUrl;
      });
    },
    [],
  );

  // 处理批量图片处理
  const processImages = useCallback(
    async (imageDataUrls: string[], files: File[]) => {
      if (imageDataUrls.length === 0) {
        setImages([]);
        return;
      }

      const newImages: ImageItem[] = [];
      const errors: string[] = [];

      // 并行处理所有图片
      const promises = imageDataUrls.map(async (dataUrl, index) => {
        const file = files[index];
        if (!file || !dataUrl) return null;

        try {
          const colors = await extractColorsFromDataUrl(dataUrl);
          return { file, dataUrl, colors };
        } catch (error) {
          errors.push(file.name);
          console.error(`Failed to process file ${file.name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);

      // 过滤掉失败的结果
      results.forEach((result) => {
        if (result) newImages.push(result);
      });

      if (newImages.length > 0) {
        setImages(newImages);
        // 重置 refs 数组
        paletteRefs.current = new Array(newImages.length).fill(null);

        if (errors.length > 0) {
          toast.error(
            `Failed to process ${errors.length} files: ${errors.join(", ")}`,
          );
        }

        toast.success(`Successfully processed ${newImages.length} images`);
      } else {
        toast.error("No images could be processed");
      }
    },
    [extractColorsFromDataUrl],
  );

  // 处理多个文件上传
  const handleMultipleImagesChange = useCallback(
    async (imageDataUrls: string[], files: File[]) => {
      await processImages(imageDataUrls, files);
    },
    [processImages],
  );

  // 上传所有图片 - 使用 refs 批量获取
  const uploadAll = useCallback(async () => {
    if (loading || images.length === 0) return;

    setLoading(true);

    try {
      const uploadPromises = images.map(async (image, index) => {
        try {
          // 使用对应的 ref 获取 blob
          const paletteRef = paletteRefs.current[index];
          if (!paletteRef) {
            throw new Error(`Palette reference not found for image ${index}`);
          }

          const blob = await paletteRef.getImageBlob();

          const fileName = image.file.name;
          const [categorySlug, nameWithExt] = fileName.split("#");

          if (!categorySlug || !nameWithExt) {
            throw new Error(
              `Image name must be in the format category#name.ext: ${fileName}`,
            );
          }

          const name = nameWithExt.split(".")[0]!;

          const { data } = await strapiUpload([
            new File([blob], `${name}-palette.png`, { type: blob.type }),
            image.file,
          ]);

          await strapiCreatePalette({
            name,
            categorySlug,
            points: image.colors.map((color) => ({
              color: color.hex,
              name: getColorName(color.hex)?.name || "Unknown",
              percent: color.percent,
            })),
            imageIds: data.map((item: { id: number }) => item.id),
          });

          return { success: true, name };
        } catch (error) {
          console.error(`Upload error for ${image.file.name}:`, error);
          return {
            success: false,
            name: image.file.name,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      });

      const results = await Promise.all(uploadPromises);

      const successful = results.filter((r) => r.success);
      const failed = results.filter((r) => !r.success);

      if (successful.length > 0) {
        toast.success(`Successfully uploaded ${successful.length} images`);
      }

      if (failed.length > 0) {
        const errorMessages = failed
          .map((f) => `${f.name}: ${f.error}`)
          .join(", ");
        toast.error(
          `Failed to upload ${failed.length} images: ${errorMessages}`,
        );
      }
    } catch (error) {
      console.error("Batch upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setLoading(false);
    }
  }, [loading, images]);

  // 复制所有颜色数组
  const copyAllColors = useCallback(async () => {
    if (images.length === 0) return;

    const allColors = images.map((image, index) => ({
      index: index + 1,
      filename: image.file.name,
      colors: image.colors.map((color) => ({
        color: color.hex,
        name: getColorName(color.hex)?.name || "Unknown",
        percent: color.percent,
      })),
    }));

    const colorString = JSON.stringify(allColors, null, 2);
    await navigator.clipboard.writeText(colorString);
    toast.success(`Copied colors from ${images.length} images to clipboard`);
  }, [images]);

  return (
    <div className="flex aspect-video w-full">
      <div className="flex w-full max-w-sm flex-col justify-between pr-4">
        <ImageUpload
          multiple
          onMultipleImagesChange={handleMultipleImagesChange}
        />

        <div className="space-y-3">
          <Select onValueChange={setObjectFit} value={objectFit}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Object Fit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cover</SelectItem>
              <SelectItem value="contain">Contain</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={copyAllColors}
            className="w-full gap-2"
            disabled={images.length === 0}
          >
            <Copy className="h-4 w-4" />
            Copy All Colors
          </Button>
        </div>
      </div>

      <div className="bg-background flex h-full flex-1 items-center justify-center rounded-md border">
        {images.length > 0 ? (
          <div className="h-full w-full overflow-y-auto">
            <div className="space-y-2">
              {images.map((image, index) => (
                <SaveableContent
                  key={index}
                  id={`color-extractor-${index}`}
                  targetWidth={1920}
                  image={image.dataUrl}
                  colors={image.colors}
                  objectFit={objectFit as "cover" | "contain"}
                  ref={(el) => {
                    paletteRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <Empty
            title="No images uploaded"
            description="Please upload images to extract colors."
          />
        )}
      </div>

      <AdminWrapper
        onSubmit={uploadAll}
        disabled={loading || images.length === 0}
      />
    </div>
  );
};

export default CreateCinematicGenerator;
