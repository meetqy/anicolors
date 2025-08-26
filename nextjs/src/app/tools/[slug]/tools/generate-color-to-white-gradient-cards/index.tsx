"use client";
import { aspectRatios } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withSave, type SaveableCardRef } from "@/components/card/with-save";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ChromePicker = dynamic(
  () => import("react-color").then((mod) => mod.ChromePicker),
  { ssr: false },
);

const GradientCard = withSave<{
  selectedColor: string;
  selectedRatio: string;
  selectedRatioInfo: (typeof aspectRatios)[number];
}>(({ selectedColor, selectedRatio }) => {
  return (
    <div
      className="max-w-full rounded-md border border-gray-200"
      style={{
        aspectRatio: selectedRatio,
        width: 375,
        background: `linear-gradient(to bottom, ${selectedColor}, white)`,
      }}
    />
  );
});

const Generator = () => {
  const downRef = useRef<SaveableCardRef>(null);
  const [selectedColor, setSelectedColor] = useState("#ff6b6b");
  const [selectedRatio, setSelectedRatio] = useState("9/16");

  const selectedRatioInfo = aspectRatios.find(
    (r) => r.value === selectedRatio,
  )!;

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        {/* Left Side - Controls */}
        <div className="flex w-full flex-1 flex-col space-y-6">
          {/* Color Picker */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Choose Color</h3>
            <ChromePicker
              color={selectedColor}
              onChange={(color) => setSelectedColor(color.hex)}
              disableAlpha
              className="!w-full overflow-hidden !rounded-md border !shadow-none"
            />
          </div>

          {/* Aspect Ratio Selector */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Select Aspect Ratio</h3>
            <Select value={selectedRatio} onValueChange={setSelectedRatio}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                {aspectRatios.map((ratio) => (
                  <SelectItem key={ratio.value} value={ratio.value}>
                    {ratio.label} - {ratio.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={async () => {
              await downRef.current?.saveAsImage();
              toast.success("Download success");
            }}
          >
            Download
          </Button>
        </div>

        {/* Right Side - Preview Card */}
        <div className="flex w-full flex-1 flex-col items-center space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Preview Card</h3>
            <p className="mt-1 text-sm text-gray-600">
              {selectedRatioInfo?.label} - {selectedRatioInfo?.description}
            </p>
          </div>

          <div className="flex w-full justify-center">
            <GradientCard
              selectedColor={selectedColor}
              selectedRatio={selectedRatio}
              selectedRatioInfo={selectedRatioInfo}
              ref={downRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
