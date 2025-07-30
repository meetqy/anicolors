import { type ColorPoint } from "@/components/palette/picker-colors";
import { useState, useRef, useEffect } from "react";

interface ColorPointsOverlayProps {
  points: ColorPoint[];
  image: string;
  className?: string;
  imageClassName?: string;
}

export const ColorPointsOverlay = ({
  points,
  image,
  className,
  imageClassName,
}: ColorPointsOverlayProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
    displayWidth: 0,
    displayHeight: 0,
  });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateImageDimensions = () => {
      if (imgRef.current && containerRef.current) {
        const img = imgRef.current;
        const container = containerRef.current;

        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
          displayWidth: img.offsetWidth,
          displayHeight: img.offsetHeight,
        });

        setContainerSize({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      }
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
      // 延迟更新以确保布局完成
      setTimeout(updateImageDimensions, 0);
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

  // 添加 ResizeObserver 来监听容器尺寸变化
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (imageLoaded) {
        setTimeout(() => {
          if (imgRef.current && containerRef.current) {
            const img = imgRef.current;
            const container = containerRef.current;

            setImageDimensions((prev) => ({
              ...prev,
              displayWidth: img.offsetWidth,
              displayHeight: img.offsetHeight,
            }));

            setContainerSize({
              width: container.offsetWidth,
              height: container.offsetHeight,
            });
          }
        }, 0);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [imageLoaded]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <picture>
        <img
          ref={imgRef}
          alt="point image"
          src={image}
          className={`mx-auto h-full object-contain ${imageClassName}`}
          onLoad={() => setImageLoaded(true)}
        />
      </picture>

      {imageLoaded && imageDimensions.displayWidth > 0 && (
        <div className="absolute inset-0">
          {points.map((point) => {
            // 计算图片在容器中的居中位置
            const containerWidth = containerSize.width;
            const containerHeight = containerSize.height;
            const imgWidth = imageDimensions.displayWidth;
            const imgHeight = imageDimensions.displayHeight;

            // 计算图片在容器中的偏移（居中对齐）
            const imgOffsetX = (containerWidth - imgWidth) / 2;
            const imgOffsetY = (containerHeight - imgHeight) / 2;

            // 将标准化坐标转换为图片显示区域内的位置
            const relativeX = (point.x / 384) * imgWidth;
            const relativeY = (point.y / 384) * imgHeight;

            return (
              <div
                key={point.id}
                className="absolute z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white shadow-lg"
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
