"use client";

import { useCallback, useState } from "react";
import useEyeDropper from "use-eye-dropper";
import { getColorName } from "@/lib/nearest";

const _parts = ["eye", "hair"];

interface PickerPartProps {
  className?: string;
  onColorsChange?: (parts: { [key: string]: { color: string; name: string } }) => void;
}

export const PickerPart = ({ onColorsChange, className }: PickerPartProps) => {
  const { open, isSupported } = useEyeDropper();
  const [parts, setParts] = useState<{
    [key in string]: {
      color: string;
      name: string;
    };
  }>({
    eye: { color: "transparent", name: "Transparent" },
    hair: { color: "transparent", name: "Transparent" },
  });

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

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex gap-3 mx-auto max-w-screen-lg">
        {_parts.map((part) => (
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
      {!isSupported && <p className="text-xs text-muted-foreground text-center mt-2">Eye dropper not supported in this browser</p>}
    </div>
  );
};
