"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ImageIcon } from "lucide-react";
import { withSave, type SaveableCardRef } from "@/components/card/with-save";
import { ImageUpload } from "@/components/image-upload";

const PreviewCard = ({
  image,
  purpleIntensity = 50,
  brightness = 0,
}: {
  image: string;
  purpleIntensity?: number;
  brightness?: number;
}) => {
  return (
    <div
      className="bg-background relative overflow-hidden rounded-lg border"
      style={{
        width: "320px",
        height: "320px",
      }}
    >
      {/* 主图片 */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Purple anime pfp"
          fill
          className="object-cover"
          style={{
            filter: `
              sepia(${purpleIntensity * 0.8}%) 
              hue-rotate(${240 + (purpleIntensity - 50) * 0.8}deg) 
              saturate(${100 + purpleIntensity * 2}%) 
              brightness(${100 + brightness}%) 
              contrast(${100 + purpleIntensity * 0.5}%)
            `,
          }}
          unoptimized
        />
      </div>

      {/* 整体紫色色调叠加 */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{
          backgroundColor: `hsl(280, ${40 + purpleIntensity * 0.6}%, 60%)`,
          opacity: purpleIntensity * 0.01,
        }}
      />

      {/* 紫色调整层 */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundColor: `hsl(270, ${50 + purpleIntensity * 0.5}%, ${45 + purpleIntensity * 0.3}%)`,
          opacity: purpleIntensity * 0.008,
        }}
      />
    </div>
  );
};

// 使用 withSave 包装预览组件
const SaveablePreviewCard = withSave(PreviewCard);

const Generator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [purpleIntensity, setPurpleIntensity] = useState([50]);
  const [brightness, setBrightness] = useState([0]);
  const saveableCardRef = useRef<SaveableCardRef>(null);

  const handleImageChange = (imageDataUrl: string | null) => {
    setImage(imageDataUrl);
  };

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {/* 左侧控制区域 */}
        <div className="space-y-6">
          {/* 上传区域 */}
          <Card>
            <CardContent>
              <div className="mb-4 space-y-2">
                <h3 className="text-lg font-semibold">Upload Image</h3>
                <p className="text-muted-foreground text-sm">
                  Upload your anime character image to create a purple-themed
                  profile picture
                </p>
              </div>

              <ImageUpload
                onImageChange={handleImageChange}
                dropzoneText="Drag and drop your anime image or click to browse"
                showRemoveButton={true}
              />
            </CardContent>
          </Card>

          {/* 紫色调整 */}
          {image && (
            <Card>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Purple Effects</h3>
                  <p className="text-muted-foreground text-sm">
                    Adjust the purple intensity and brightness of your image
                  </p>
                </div>
                <div className="mt-4 space-y-6">
                  {/* 紫色强度 */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">
                        Purple Intensity
                      </label>
                      <span className="text-muted-foreground text-sm">
                        {purpleIntensity[0]}%
                      </span>
                    </div>
                    <Slider
                      value={purpleIntensity}
                      onValueChange={setPurpleIntensity}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* 亮度调整 */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Brightness</label>
                      <span className="text-muted-foreground text-sm">
                        {brightness[0]! > 0 ? "+" : ""}
                        {brightness[0]}%
                      </span>
                    </div>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={50}
                      min={-50}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧预览区域 */}
        <div className="sticky top-24 space-y-6">
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <p className="text-muted-foreground text-sm">
                    {image
                      ? "Your purple anime profile picture"
                      : "Upload an image to see the preview"}
                  </p>
                </div>

                <div className="flex justify-center">
                  {image ? (
                    <SaveablePreviewCard
                      ref={saveableCardRef}
                      image={image}
                      purpleIntensity={purpleIntensity[0]}
                      brightness={brightness[0]}
                      id={`purple-anime-pfp-${Date.now()}`}
                    />
                  ) : (
                    <div
                      className="border-muted-foreground/25 bg-muted/50 flex items-center justify-center rounded-lg border-2 border-dashed"
                      style={{
                        width: "320px",
                        height: "320px",
                      }}
                    >
                      <div className="text-muted-foreground text-center">
                        <ImageIcon className="mx-auto mb-2 h-12 w-12" />
                        <p className="text-sm">Upload an anime image</p>
                        <p className="mt-1 text-xs">
                          to create your purple PFP
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Generator;
