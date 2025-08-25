"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ImageIcon } from "lucide-react";
import { withSave } from "@/components/card/with-save";
import { SelectAspectRatio } from "@/components/select-aspect-ratio";
import { ImageUpload } from "@/components/image-upload";

const PreviewCard = ({
  image,
  aspect,
  blurIntensity = 40,
  brightness = 0.6,
  saturation = 1.2,
}: {
  image: string;
  aspect: string;
  blurIntensity?: number;
  brightness?: number;
  saturation?: number;
}) => {
  return (
    <div
      className="bg-background relative overflow-hidden rounded-lg border"
      style={{
        width: "375px",
        aspectRatio: aspect,
      }}
    >
      {/* 模糊背景 */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Blur background"
          fill
          className="scale-125 object-cover"
          style={{
            filter: `blur(${blurIntensity}px) brightness(${brightness}) saturate(${saturation})`,
          }}
          unoptimized
        />
      </div>

      {/* 居中原图 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt="Main image"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

// 使用 withSave 包装预览组件
const SaveablePreviewCard = withSave(PreviewCard);

export const Generator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [aspect, setAspect] = useState("1/1");
  const [blurIntensity, setBlurIntensity] = useState([40]);
  const [brightness, setBrightness] = useState([0.6]);
  const [saturation, setSaturation] = useState([1.2]);

  const handleImageChange = (imageDataUrl: string | null) => {
    setImage(imageDataUrl);
  };

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 左侧控制区域 */}
        <div className="space-y-6">
          {/* 比例选择 */}
          <Card>
            <CardContent>
              <div>
                <h3 className="h3">Aspect Ratio</h3>
                <p className="text-muted-foreground text-sm">
                  Choose the output dimensions for your image
                </p>
              </div>

              <div className="mt-6">
                <SelectAspectRatio value={aspect} onChange={setAspect} />
              </div>
            </CardContent>
          </Card>

          {/* 背景效果控制 */}
          {image && (
            <Card>
              <CardContent>
                <div>
                  <h3 className="h3">Background Effects</h3>
                  <p className="text-muted-foreground text-sm">
                    Adjust the blur background appearance
                  </p>
                </div>

                <div className="mt-6 space-y-6">
                  {/* 模糊强度 */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">
                        Blur Intensity
                      </label>
                      <span className="text-muted-foreground text-sm">
                        {blurIntensity[0]}px
                      </span>
                    </div>
                    <Slider
                      value={blurIntensity}
                      onValueChange={setBlurIntensity}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* 亮度 */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Brightness</label>
                      <span className="text-muted-foreground text-sm">
                        {Math.round(brightness[0]! * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={1}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* 饱和度 */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Saturation</label>
                      <span className="text-muted-foreground text-sm">
                        {Math.round(saturation[0]! * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={saturation}
                      onValueChange={setSaturation}
                      max={2}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 上传区域 */}
          <ImageUpload
            onImageChange={handleImageChange}
            dropzoneText="Drag and drop your image or click to browse"
            showRemoveButton={true}
          />
        </div>

        {/* 右侧预览区域 */}
        <Card>
          <CardContent>
            <h3 className="h3 mb-4">Preview</h3>
            <div className="flex justify-center">
              {image ? (
                <SaveablePreviewCard
                  image={image}
                  aspect={aspect}
                  blurIntensity={blurIntensity[0]}
                  brightness={brightness[0]}
                  saturation={saturation[0]}
                  id={`fill-aspect-${Date.now()}`}
                />
              ) : (
                <div
                  className="border-muted-foreground/25 bg-muted/50 flex items-center justify-center rounded-lg border-2 border-dashed"
                  style={{
                    width: "375px",
                    aspectRatio: aspect,
                  }}
                >
                  <div className="text-muted-foreground text-center">
                    <ImageIcon className="mx-auto mb-2 h-12 w-12" />
                    <p className="text-sm">Upload an image to preview</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
