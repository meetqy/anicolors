/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface ColorPoint {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface PickerColorsProps {
  onColorsChange?: (colors: string[]) => void;
}

export default function PickerColors({ onColorsChange }: PickerColorsProps) {
  const [image, setImage] = useState<string | null>(null);
  const [colorPoints, setColorPoints] = useState<ColorPoint[]>([]);
  const [draggedPoint, setDraggedPoint] = useState<number | null>(null);
  const [showMagnifier, setShowMagnifier] = useState<number | null>(null);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setColorPoints([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPixelColor = useCallback((x: number, y: number): string => {
    if (!canvasRef.current || !imageRef.current) return "#ffffff";

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "#ffffff";

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = Math.floor(x * scaleX);
    const canvasY = Math.floor(y * scaleY);

    try {
      const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
      const [r, g, b] = imageData.data;
      return `rgb(${r}, ${g}, ${b})`;
    } catch {
      return "#ffffff";
    }
  }, []);

  const updateCanvas = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imageRef.current.naturalWidth;
    canvas.height = imageRef.current.naturalHeight;
    ctx.drawImage(imageRef.current, 0, 0);
  }, []);

  const handleImageLoad = () => {
    updateCanvas();
  };

  const getConstrainedPosition = (x: number, y: number) => {
    if (!imageRef.current) return { x, y };

    const rect = imageRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(x, rect.width)),
      y: Math.max(0, Math.min(y, rect.height)),
    };
  };

  // Initialize default color points
  useEffect(() => {
    if (image && colorPoints.length === 0) {
      // 延迟设置默认点，确保 canvas 已经更新
      setTimeout(() => {
        const defaultPoints: ColorPoint[] = Array.from(
          { length: 5 },
          (_, i) => {
            const x = 100 + i * 80;
            const y = 100 + i * 50;
            const color = getPixelColor(x, y);
            return {
              id: i + 1,
              x,
              y,
              color,
            };
          },
        );
        setColorPoints(defaultPoints);
      }, 100);
    }
  }, [image, colorPoints.length, getPixelColor]);

  const updateMagnifier = useCallback((x: number, y: number) => {
    if (!canvasRef.current || !magnifierCanvasRef.current || !imageRef.current)
      return;

    const sourceCanvas = canvasRef.current;
    const sourceCtx = sourceCanvas.getContext("2d");
    const magnifierCanvas = magnifierCanvasRef.current;
    const magnifierCtx = magnifierCanvas.getContext("2d");

    if (!sourceCtx || !magnifierCtx) return;

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = sourceCanvas.width / rect.width;
    const scaleY = sourceCanvas.height / rect.height;

    const sourceX = x * scaleX;
    const sourceY = y * scaleY;

    // 设置放大镜画布大小 - 缩小尺寸
    magnifierCanvas.width = 150;
    magnifierCanvas.height = 150;

    // 禁用图像平滑，显示像素化效果
    magnifierCtx.imageSmoothingEnabled = false;

    try {
      // 从源图像提取10x10像素区域
      const regionSize = 10;
      const halfRegion = regionSize / 2;

      // 获取源区域
      const sourceRegionX = Math.max(
        0,
        Math.min(sourceX - halfRegion, sourceCanvas.width - regionSize),
      );
      const sourceRegionY = Math.max(
        0,
        Math.min(sourceY - halfRegion, sourceCanvas.height - regionSize),
      );

      // 将10x10像素区域放大到150x150
      magnifierCtx.drawImage(
        sourceCanvas,
        sourceRegionX,
        sourceRegionY,
        regionSize,
        regionSize,
        0,
        0,
        magnifierCanvas.width,
        magnifierCanvas.height,
      );

      // 绘制网格线
      magnifierCtx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      magnifierCtx.lineWidth = 1;
      const gridSize = magnifierCanvas.width / regionSize;

      for (let i = 0; i <= regionSize; i++) {
        const pos = i * gridSize;
        magnifierCtx.beginPath();
        magnifierCtx.moveTo(pos, 0);
        magnifierCtx.lineTo(pos, magnifierCanvas.height);
        magnifierCtx.stroke();

        magnifierCtx.beginPath();
        magnifierCtx.moveTo(0, pos);
        magnifierCtx.lineTo(magnifierCanvas.width, pos);
        magnifierCtx.stroke();
      }

      // 绘制十字准星
      const centerX = magnifierCanvas.width / 2;
      const centerY = magnifierCanvas.height / 2;

      magnifierCtx.strokeStyle = "#ff0000";
      magnifierCtx.lineWidth = 2;

      // 垂直线
      magnifierCtx.beginPath();
      magnifierCtx.moveTo(centerX, centerY - 15);
      magnifierCtx.lineTo(centerX, centerY + 15);
      magnifierCtx.stroke();

      // 水平线
      magnifierCtx.beginPath();
      magnifierCtx.moveTo(centerX - 15, centerY);
      magnifierCtx.lineTo(centerX + 15, centerY);
      magnifierCtx.stroke();

      // 中心点
      magnifierCtx.fillStyle = "#ff0000";
      magnifierCtx.fillRect(centerX - 1, centerY - 1, 2, 2);
    } catch (error) {
      console.error("Error updating magnifier:", error);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent, pointId: number) => {
    e.preventDefault();
    setDraggedPoint(pointId);
    setShowMagnifier(pointId);

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMagnifierPos({ x, y });

      // 使用 setTimeout 确保状态更新后再调用
      setTimeout(() => {
        updateMagnifier(x, y);
      }, 0);
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || (!draggedPoint && !showMagnifier)) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMagnifierPos({ x, y });

      if (showMagnifier) {
        updateMagnifier(x, y);
      }

      if (draggedPoint) {
        const constrainedPos = getConstrainedPosition(x, y);
        const newColor = getPixelColor(constrainedPos.x, constrainedPos.y);

        setColorPoints((prev) =>
          prev.map((point) =>
            point.id === draggedPoint
              ? {
                  ...point,
                  x: constrainedPos.x,
                  y: constrainedPos.y,
                  color: newColor,
                }
              : point,
          ),
        );
      }
    },
    [draggedPoint, showMagnifier, getPixelColor, updateMagnifier],
  );

  const handleMouseUp = useCallback(() => {
    setDraggedPoint(null);
    setShowMagnifier(null);
  }, []);

  useEffect(() => {
    if (draggedPoint || showMagnifier) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggedPoint, showMagnifier, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (onColorsChange) {
      onColorsChange(colorPoints.map((point) => point.color));
    }
  }, [colorPoints, onColorsChange]);

  const getMagnifierStyle = () => {
    return {
      position: "absolute" as const,
      left: magnifierPos.x - 75,
      top: magnifierPos.y - 75,
      width: 150,
      height: 150,
      borderRadius: "50%",
      border: "3px solid white",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      pointerEvents: "none" as const,
      zIndex: 1000,
      overflow: "hidden" as const,
    };
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          上传图片
        </button>
      </div>

      {image && (
        <div
          ref={containerRef}
          className="relative inline-block overflow-hidden rounded-lg border border-gray-300"
        >
          <img
            ref={imageRef}
            src={image}
            alt="Color picker"
            onLoad={handleImageLoad}
            className="block h-auto max-w-full"
            style={{ maxWidth: "512px" }}
            draggable={false}
          />

          <canvas ref={canvasRef} className="hidden" />
          <canvas ref={magnifierCanvasRef} className="hidden" />

          {colorPoints.map((point) => (
            <div
              key={point.id}
              className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform cursor-move rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110"
              style={{
                left: point.x,
                top: point.y,
                backgroundColor: point.color,
              }}
              onMouseDown={(e) => handleMouseDown(e, point.id)}
            >
              <div className="h-full w-full rounded-full border border-gray-400" />
            </div>
          ))}

          {showMagnifier && (
            <div style={getMagnifierStyle()}>
              <canvas
                ref={magnifierCanvasRef}
                className="h-full w-full rounded-full"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          )}
        </div>
      )}

      {colorPoints.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold">选中的颜色:</h3>
          <div className="flex flex-wrap gap-2">
            {colorPoints.map((point) => (
              <div
                key={point.id}
                className="flex items-center gap-2 rounded border p-2"
              >
                <div
                  className="h-8 w-8 rounded border"
                  style={{ backgroundColor: point.color }}
                />
                <span className="font-mono text-sm">{point.color}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
