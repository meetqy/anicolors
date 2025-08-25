"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SelectAspectRatioProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const presetRatios = [
  { label: "1:1", value: "1/1" },
  { label: "4:3", value: "4/3" },
  { label: "3:2", value: "3/2" },
  { label: "16:9", value: "16/9" },
  { label: "9:16", value: "9/16" },
];

export const SelectAspectRatio: React.FC<SelectAspectRatioProps> = ({
  value,
  onChange,
  className = "",
  defaultValue = "1/1",
}) => {
  const [internalValue, setInternalValue] = useState(value || defaultValue);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  // 使用受控或非受控模式
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [value, onChange],
  );

  // 自动更新自定义比例
  useEffect(() => {
    if (customWidth && customHeight) {
      const customRatio = `${customWidth}/${customHeight}`;
      handleValueChange(customRatio);
    }
  }, [customWidth, customHeight, handleValueChange]);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {/* 预设比例按钮 */}
        {presetRatios.map((ratio) => (
          <Button
            key={ratio.value}
            size="sm"
            variant={currentValue === ratio.value ? "default" : "outline"}
            onClick={() => handleValueChange(ratio.value)}
            className="h-8 px-3"
          >
            {ratio.label}
          </Button>
        ))}
      </div>

      {/* 自定义比例输入 */}
      <div className="flex items-center gap-1">
        <Input
          type="number"
          placeholder="width"
          value={customWidth}
          onChange={(e) => setCustomWidth(e.target.value)}
          className="h-8 max-w-20 text-sm"
          min="1"
        />
        <span className="text-muted-foreground text-sm">:</span>
        <Input
          type="number"
          placeholder="height"
          value={customHeight}
          onChange={(e) => setCustomHeight(e.target.value)}
          className="h-8 max-w-20 text-sm"
          min="1"
        />
      </div>
    </div>
  );
};
