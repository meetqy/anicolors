"use client";

import React, { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { getColorName } from "@/lib/nearest";
import Color from "color";
import { extractMainColors, getPixelColor, updateCanvas, getNormalizedPosition, getConstrainedPosition, getDisplayPosition, updateMagnifier } from "./color-extractor";

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

const PickerColors = forwardRef<
  PickerColorsRefs,
  PickerColorsProps & {
    classNames?: {
      image?: string;
    };
  }
>(({ image, onImageLoaded, points, onColorsChange, classNames, onColorsChangeEnter }, ref) => {
  const [colorPoints, setColorPoints] = useState<ColorPoint[]>([]);
  const [draggedPoint, setDraggedPoint] = useState<number | null>(null);
  const [showMagnifier, setShowMagnifier] = useState<number | null>(null);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setColorPoints(points || []);
  }, [points]);

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
    []
  );

  useEffect(() => {
    if (!imageLoading) {
      updateCanvas(canvasRef.current, imageRef.current);
    }
  }, [imageLoading]);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, pointId: number) => {
    e.preventDefault();
    setDraggedPoint(pointId);
    setShowMagnifier(pointId);

    const container = containerRef.current;
    if (!imageRef.current || !container) return;

    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    setMagnifierPos({
      x,
      y,
    });

    setTimeout(() => {
      updateMagnifier(canvasRef.current, magnifierCanvasRef.current, imageRef.current, x, y);
    }, 0);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!imageRef.current || !containerRef.current || (!draggedPoint && !showMagnifier)) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      setMagnifierPos({
        x,
        y,
      });

      if (showMagnifier) {
        updateMagnifier(canvasRef.current, magnifierCanvasRef.current, imageRef.current, x, y);
      }

      if (draggedPoint) {
        // 约束点位在图片可见区域
        const constrainedPos = getConstrainedPosition(imageRef.current, x, y, container);
        const normalizedPos = getNormalizedPosition(imageRef.current, constrainedPos.x, constrainedPos.y, container);
        const newColor = getPixelColor(canvasRef.current, imageRef.current, constrainedPos.x, constrainedPos.y);

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
    [draggedPoint, showMagnifier]
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
      <div ref={containerRef} className="relative flex-1 overflow-hidden size-full">
        <img
          fetchPriority="high"
          onLoad={() => {
            updateCanvas(canvasRef.current, imageRef.current);
            setColorPoints(points || []);
            onImageLoaded?.();
            setImageLoading(false);
          }}
          ref={imageRef}
          src={image}
          crossOrigin="anonymous"
          alt="Color picker"
          className={cn("object-contain size-full", classNames?.image)}
          draggable={false}
        />

        <canvas ref={canvasRef} className="hidden" />
        <canvas ref={magnifierCanvasRef} className="hidden" />

        {!imageLoading &&
          colorPoints.map((point) => {
            const displayPos = getDisplayPosition(imageRef.current, containerRef.current, point.x, point.y);
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
