"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import data from "./data.json";
import { CombinationDisplay } from "./CombinationDisplay";

interface ColorCombination {
  name: string;
  colors: string[];
  playstyle: string;
  type: string;
}

// MTG 五色定义（正五角形顺序）
const MTG_COLORS = [
  { name: "White", color: "#F8F6E0", index: 0 },
  { name: "Blue", color: "#5D9CEB", index: 1 },
  { name: "Black", color: "#2F2F2F", index: 2 },
  { name: "Red", color: "#D64545", index: 3 },
  { name: "Green", color: "#3F9B4C", index: 4 },
];

export const Generator = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentCombination, setCurrentCombination] =
    useState<ColorCombination | null>(null);

  const findCombination = (colors: string[]) => {
    const colorHexes = colors
      .map((colorName) => MTG_COLORS.find((c) => c.name === colorName)?.color)
      .filter(Boolean);

    return data.find(
      (combo) =>
        combo.colors &&
        combo.colors.length === colorHexes.length &&
        combo.colors.every((hex) => colorHexes.includes(hex)),
    );
  };

  const handleColorClick = (colorName: string) => {
    let newSelected: string[];

    if (selectedColors.includes(colorName)) {
      newSelected = selectedColors.filter((c) => c !== colorName);
    } else if (selectedColors.length >= 5) {
      return;
    } else {
      newSelected = [...selectedColors, colorName];
    }

    setSelectedColors(newSelected);
    setCurrentCombination(
      newSelected.length > 0 ? findCombination(newSelected) || null : null,
    );
  };

  const handleReset = () => {
    setSelectedColors([]);
    setCurrentCombination(null);
  };

  const getPointPosition = (
    index: number,
    radius: number,
    centerX: number,
    centerY: number,
  ) => {
    const angle = (index * 72 - 90) * (Math.PI / 180);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return { x, y };
  };

  const generateConnectionLines = () => {
    if (selectedColors.length < 2) return [];

    const selectedIndices = selectedColors
      .map((colorName) => MTG_COLORS.find((c) => c.name === colorName)?.index)
      .filter((index) => index !== undefined)
      .sort((a, b) => a - b) as unknown as number[];

    const lines = [];
    const radius = 140;
    const centerX = 200;
    const centerY = 200;

    for (let i = 0; i < selectedIndices.length; i++) {
      for (let j = i + 1; j < selectedIndices.length; j++) {
        const pos1 = getPointPosition(
          selectedIndices[i]!,
          radius,
          centerX,
          centerY,
        );
        const pos2 = getPointPosition(
          selectedIndices[j]!,
          radius,
          centerX,
          centerY,
        );

        lines.push({
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y,
          key: `${selectedIndices[i]}-${selectedIndices[j]}`,
        });
      }
    }

    return lines;
  };

  const radius = 140;
  const centerX = 200;
  const centerY = 200;
  const connectionLines = generateConnectionLines();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 左侧 - 五角形颜色选择器 */}
        <div className="flex items-center justify-center">
          <svg
            width="100%"
            height="400"
            viewBox="0 0 400 400"
            className="max-w-md drop-shadow-sm"
          >
            {/* 连接线 */}
            {connectionLines.map((line) => (
              <line
                key={line.key}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#000000"
                strokeWidth="3"
                opacity="0.5"
              />
            ))}

            {/* 颜色点 */}
            {MTG_COLORS.map((color) => {
              const pos = getPointPosition(
                color.index,
                radius,
                centerX,
                centerY,
              );
              const isSelected = selectedColors.includes(color.name);

              return (
                <g key={color.name}>
                  {/* 选中外圈 */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="38"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      opacity="0.8"
                    />
                  )}

                  {/* 颜色圆点 */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="28"
                    fill={color.color}
                    stroke={
                      isSelected ? "hsl(var(--primary))" : "hsl(var(--border))"
                    }
                    strokeWidth={isSelected ? "5" : "3"}
                    className="cursor-pointer drop-shadow-lg"
                    onClick={() => handleColorClick(color.name)}
                  />

                  {/* 选中标记 */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="10"
                      fill="hsl(var(--primary))"
                      className="pointer-events-none"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* 右侧 - 组合信息和控制 */}
        <div className="space-y-6">
          <CombinationDisplay
            combination={currentCombination}
            selectedColors={selectedColors}
            onColorClick={handleColorClick}
          />

          <div className="flex justify-center gap-3">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
