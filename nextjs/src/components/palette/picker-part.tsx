"use client";

import { useCallback, useEffect, useState } from "react";
import useEyeDropper from "use-eye-dropper";
import { getColorName } from "@/lib/nearest";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { type PartColors } from "@/query/palette";
import { cn, partsConstant } from "@/lib/utils";

const baseParts = [
  "hair", // Hair Color
  "eye", // Eye Color
  "skin", // Skin Color
  "shirt", // Shirt or inner clothing
  "pants", // Pants or trousers
  "shoes", // Footwear
  "socks", // Socks or stockings
] as const;

interface PickerPartProps {
  className?: string;
  colors?: PartColors;
  onColorsChange?: (parts: PartColors) => void;
}

export const PickerPart = ({
  onColorsChange,
  className,
  colors,
}: PickerPartProps) => {
  const { open, isSupported } = useEyeDropper();
  const [parts, setParts] = useState<
    Record<
      string,
      {
        color: string;
        name: string;
      }
    >
  >(
    partsConstant.reduce(
      (acc, part) => {
        acc[part] = { color: "transparent", name: "" };
        return acc;
      },
      {} as Record<string, { color: string; name: string }>,
    ),
  );

  const [showAll, setShowAll] = useState(false);

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
            [part]: {
              color: color.sRGBHex,
              name: getColorName(color.sRGBHex)?.name ?? "Unknown",
            },
          };
          setParts(newParts);
          onColorsChange?.(newParts);
        } catch (error) {
          console.error("Error picking color:", error);
        }
      };
      void openPicker();
    },
    [open, parts, onColorsChange],
  );

  const copy = async () => {
    // 排除 透明色
    const filteredParts = Object.fromEntries(
      Object.entries(parts).filter(
        ([, value]) => value.color !== "transparent",
      ),
    );
    await navigator.clipboard.writeText(JSON.stringify(filteredParts));
    toast.success("Colors copied to clipboard!");
  };

  // 控制显示的部位
  const displayParts = showAll ? partsConstant : baseParts;

  return (
    <div className={`mb-4 ${className}`}>
      <div
        className={cn("mx-auto flex max-w-screen-lg transition-all", {
          "items-center": !showAll,
        })}
        suppressHydrationWarning
      >
        <div className="flex flex-1 flex-wrap gap-3">
          {displayParts.map((part) => (
            <button
              key={part}
              onClick={() => pickColor(part)}
              disabled={!isSupported}
              className="bg-background border-input hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-md border px-4 py-1 transition-colors disabled:opacity-50"
            >
              <div
                className="border-border h-6 w-6 rounded-full border"
                style={{ backgroundColor: parts[part]?.color }}
              />
              <div className="text-left">
                <p className="text-sm font-medium capitalize">{part}</p>
                <p className="text-muted-foreground font-mono text-xs">
                  {parts[part]?.color === "transparent"
                    ? "none"
                    : parts[part]?.color}
                </p>
              </div>
            </button>
          ))}
        </div>
        <Button onClick={copy} size={"lg"}>
          Copy
        </Button>
      </div>
      <div className="mt-2 text-center">
        {partsConstant.length > baseParts.length && (
          <button
            className="text-primary text-sm underline"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Collapse" : "Show All"}
          </button>
        )}
      </div>
      {!isSupported && (
        <p className="text-muted-foreground mt-2 text-center text-xs">
          Eye dropper not supported in this browser
        </p>
      )}
    </div>
  );
};
