"use client";

import React, { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";
import { getColorName } from "@/lib/nearest";
import Color from "color";
import { extractMainColors } from "./color-extractor";

export interface ColorPoint {
  id: number;
  x: number;
  y: number;
  color: string;
  name?: string;
}

export interface PickerColorsProps {
  image?: string;
  points?: ColorPoint[];
  onColorsChange?: (points: ColorPoint[]) => void;
  onColorsChangeEnter?: (points: ColorPoint[]) => void;
  onImageLoaded?: () => void;
}

export type PickerColorsRefs = {
  extractMainColors: (count?: number) => ColorPoint[];
};

const PickerColors = forwardRef<PickerColorsRefs, PickerColorsProps & { classNames?: { image?: string } }>(function PickerColors(
  { image, points, onColorsChange, onImageLoaded, classNames, onColorsChangeEnter },
  ref
) {
  const [colorPoints, setColorPoints] = useState<ColorPoint[]>([]);
  const [draggedPoint, setDraggedPoint] = useState<number | null>(null);
  const [showMagnifier, setShowMagnifier] = useState<number | null>(null);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState(true);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColorPoints(points || []);
  }, [points, setColorPoints]);

  useImperativeHandle(
    ref,
    () => ({
      extractMainColors: (count: number = 5) => {
        const result = extractMainColors(canvasRef.current!, imageRef.current!, count);
        onColorsChange?.(result);
        onColorsChangeEnter?.(result);
        setColorPoints(result);

        return result;
      },
    }),
    [setColorPoints, onColorsChange, onColorsChangeEnter]
  );

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
  }, [imageRef, canvasRef]);

  useEffect(() => {
    if (!imageLoading) {
      updateCanvas();
    }
  }, [imageLoading, updateCanvas]);

  // Convert display coordinates to normalized coordinates
  const getNormalizedPosition = useCallback((displayX: number, displayY: number) => {
    if (!imageRef.current) return { x: displayX, y: displayY };

    const rect = imageRef.current.getBoundingClientRect();
    const aspectRatio = imageRef.current.naturalHeight / imageRef.current.naturalWidth;
    return {
      x: (displayX / rect.width) * 384,
      y: (displayY / (rect.width * aspectRatio)) * 384,
    };
  }, []);

  const getConstrainedPosition = useCallback((x: number, y: number) => {
    if (!imageRef.current) return { x, y };

    const rect = imageRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(x, rect.width)),
      y: Math.max(0, Math.min(y, rect.height)),
    };
  }, []);

  // Convert normalized coordinates to actual display coordinates
  const getDisplayPosition = useCallback((normalizedX: number, normalizedY: number) => {
    if (!imageRef.current || !containerRef.current) return { x: 0, y: 0 };

    const imageRect = imageRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Check if dimensions are valid
    if (!imageRect.width || !imageRect.height || !imageRef.current.naturalWidth || !imageRef.current.naturalHeight) {
      return { x: 0, y: 0 };
    }

    // Calculate position relative to container
    const imageOffsetX = imageRect.left - containerRect.left;
    const imageOffsetY = imageRect.top - containerRect.top;

    const x = imageOffsetX + (normalizedX / 384) * imageRect.width;
    const y = imageOffsetY + (normalizedY / 384) * (imageRect.width * (imageRef.current.naturalHeight / imageRef.current.naturalWidth));

    // Ensure values are finite numbers
    return {
      x: isFinite(x) ? x : 0,
      y: isFinite(y) ? y : 0,
    };
  }, []);

  const updateMagnifier = useCallback((x: number, y: number) => {
    if (!canvasRef.current || !magnifierCanvasRef.current || !imageRef.current) return;

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
      const sourceRegionX = Math.max(0, Math.min(sourceX - halfRegion, sourceCanvas.width - regionSize));
      const sourceRegionY = Math.max(0, Math.min(sourceY - halfRegion, sourceCanvas.height - regionSize));

      // 将10x10像素区域放大到150x150
      magnifierCtx.drawImage(sourceCanvas, sourceRegionX, sourceRegionY, regionSize, regionSize, 0, 0, magnifierCanvas.width, magnifierCanvas.height);

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

    const rect = imageRef.current?.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (rect && containerRect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 设置放大镜位置相对于容器
      setMagnifierPos({
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top,
      });

      setTimeout(() => {
        updateMagnifier(x, y);
      }, 0);
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!imageRef.current || (!draggedPoint && !showMagnifier)) return;

      const rect = imageRef.current.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (containerRect) {
        setMagnifierPos({
          x: e.clientX - containerRect.left,
          y: e.clientY - containerRect.top,
        });
      }

      if (showMagnifier) {
        updateMagnifier(x, y);
      }

      if (draggedPoint) {
        const constrainedPos = getConstrainedPosition(x, y);
        const normalizedPos = getNormalizedPosition(constrainedPos.x, constrainedPos.y);
        const newColor = getPixelColor(constrainedPos.x, constrainedPos.y);

        setColorPoints((prev) =>
          prev.map((point) =>
            point.id === draggedPoint
              ? {
                  ...point,
                  x: normalizedPos.x,
                  y: normalizedPos.y,
                  color: newColor,
                }
              : point
          )
        );
      }
    },
    [draggedPoint, showMagnifier, getPixelColor, updateMagnifier, getConstrainedPosition, getNormalizedPosition]
  );

  const handleMouseUp = useCallback(() => {
    setDraggedPoint(null);
    setShowMagnifier(null);

    // 在鼠标弹起时触发 onColorsChangeEnter 回调
    if (onColorsChangeEnter) {
      onColorsChangeEnter(
        colorPoints.map((item) => {
          return {
            ...item,
            name: getColorName(Color(item.color).hex())?.name || "unknown",
          };
        })
      );
    }
  }, [onColorsChangeEnter, colorPoints]);

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
      onColorsChange(colorPoints);
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
    image && (
      <div ref={containerRef} className="relative overflow-hidden">
        <picture>
          <img
            fetchPriority="high"
            onLoad={() => {
              updateCanvas();
              setColorPoints(points || []);
              onImageLoaded?.();
              setImageLoading(false);
            }}
            ref={imageRef}
            src={image}
            crossOrigin="anonymous"
            alt="Color picker"
            className={cn("mx-auto lg:max-h-[512px]", classNames?.image)}
            draggable={false}
          />
        </picture>

        <canvas ref={canvasRef} className="hidden" />
        <canvas ref={magnifierCanvasRef} className="hidden" />

        {!imageLoading &&
          colorPoints.map((point) => {
            const displayPos = getDisplayPosition(point.x, point.y);
            return (
              <div
                key={point.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transform cursor-move transition-transform hover:scale-125"
                style={{
                  left: displayPos.x,
                  top: displayPos.y,
                }}
                onMouseDown={(e) => handleMouseDown(e, point.id)}
              >
                {/* Outer glow ring */}
                <div className="absolute -inset-2 animate-pulse rounded-full bg-white/30 blur-sm" />
                {/* White border ring */}
                <div className="relative h-8 w-8 rounded-full border-3 border-white shadow-2xl">
                  {/* Color fill */}
                  <div className="h-full w-full rounded-full border-2 border-black/20" style={{ backgroundColor: point.color }} />
                  {/* Center dot for precision */}
                  <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm" />
                </div>
                {/* Point number label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-2 py-1 text-xs font-medium text-white">{point.id}</div>
              </div>
            );
          })}

        {showMagnifier && (
          <div style={getMagnifierStyle()}>
            <canvas ref={magnifierCanvasRef} className="h-full w-full rounded-full" style={{ imageRendering: "pixelated" }} />
          </div>
        )}
      </div>
    )
  );
});

export default PickerColors;
PickerColors.displayName = "PickerColors";
