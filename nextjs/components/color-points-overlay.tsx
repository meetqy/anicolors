import { ColorPoint } from "@/components/palette/picker-colors";
import { useState, useRef, useEffect } from "react";

interface ColorPointsOverlayProps {
  points: ColorPoint[];
  image: string;
  className?: string;
  imageClassName?: string;
}

export const ColorPointsOverlay = ({ points, image, className, imageClassName }: ColorPointsOverlayProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0, displayWidth: 0, displayHeight: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateImageDimensions = () => {
      if (imgRef.current && containerRef.current) {
        const img = imgRef.current;

        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
          displayWidth: img.offsetWidth,
          displayHeight: img.offsetHeight,
        });
      }
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
      updateImageDimensions();
    };

    const img = imgRef.current;
    if (img) {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
        return () => img.removeEventListener("load", handleImageLoad);
      }
    }
  }, [image]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <img ref={imgRef} src={image} className={`object-contain h-full mx-auto ${imageClassName}`} onLoad={() => setImageLoaded(true)} />

      {imageLoaded && (
        <div className="absolute inset-0">
          {points.map((point) => {
            // 计算图片在容器中的实际显示区域
            const containerRect = containerRef.current?.getBoundingClientRect();
            const imgRect = imgRef.current?.getBoundingClientRect();

            if (!containerRect || !imgRect) return null;

            // 计算图片相对于容器的偏移
            const imgOffsetX = imgRect.left - containerRect.left;
            const imgOffsetY = imgRect.top - containerRect.top;

            // 将标准化坐标转换为图片显示区域内的位置
            const relativeX = (point.x / 384) * imageDimensions.displayWidth;
            const relativeY = (point.y / 384) * imageDimensions.displayHeight;

            return (
              <div
                key={point.id}
                className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: imgOffsetX + relativeX,
                  top: imgOffsetY + relativeY,
                  backgroundColor: point.color,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
