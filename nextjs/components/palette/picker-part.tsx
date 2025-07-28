"use client";

import { useCallback, useEffect, useState } from "react";
import useEyeDropper from "use-eye-dropper";
import { getColorName } from "@/lib/nearest";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { PartColors } from "@/query/palette";
import { partsConstant } from "@/lib/utils";

interface PickerPartProps {
  className?: string;
  colors?: PartColors;
  onColorsChange?: (parts: PartColors) => void;
}

export const PickerPart = ({ onColorsChange, className, colors }: PickerPartProps) => {
  const { open, isSupported } = useEyeDropper();
  const [parts, setParts] = useState<{
    [key in string]: {
      color: string;
      name: string;
    };
  }>(
    partsConstant.reduce((acc, part) => {
      acc[part] = { color: "transparent", name: "" };
      return acc;
    }, {} as Record<string, { color: string; name: string }>)
  );

  useEffect(() => {
    setParts((prev) => ({
      ...prev,
      ...colors,
    }));
  }, [colors]);

  const pickColor = useCallback(
    (part: string) => {
      const openPicker = async () => {
        try {
          const color = await open();
          const newParts = {
            ...parts,
            [part]: { color: color.sRGBHex, name: getColorName(color.sRGBHex)?.name || "Unknown" },
          };
          setParts(newParts);
          onColorsChange?.(newParts);
        } catch (error) {
          console.error("Error picking color:", error);
        }
      };
      openPicker();
    },
    [open, parts, onColorsChange]
  );

  const copy = () => {
    // 排除 透明色
    const filteredParts = Object.fromEntries(Object.entries(parts).filter(([, value]) => value.color !== "transparent"));
    navigator.clipboard.writeText(JSON.stringify(filteredParts));
    toast.success("Colors copied to clipboard!");
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex mx-auto max-w-screen-lg" suppressHydrationWarning>
        <div className="flex-1 flex flex-wrap gap-3">
          {partsConstant.map((part) => (
            <button
              key={part}
              onClick={() => pickColor(part)}
              disabled={!isSupported}
              className="flex cursor-pointer items-center gap-2 px-4 py-1 bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
            >
              <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: parts[part]?.color }} />
              <div className="text-left">
                <p className="text-sm font-medium capitalize">{part}</p>
                <p className="text-xs text-muted-foreground font-mono">{parts[part]?.color}</p>
              </div>
            </button>
          ))}
        </div>
        <Button onClick={copy} size={"lg"}>
          Copy
        </Button>
      </div>
      {!isSupported && <p className="text-xs text-muted-foreground text-center mt-2">Eye dropper not supported in this browser</p>}
    </div>
  );
};
