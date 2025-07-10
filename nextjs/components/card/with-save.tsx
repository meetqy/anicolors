"use client";

import { forwardRef, useImperativeHandle, useRef, ComponentType, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import domtoimage from "dom-to-image";

export interface SaveableCardRef {
  saveAsImage: (filename?: string, scale?: number) => Promise<void>;
  getImageBlob: (scale?: number) => Promise<Blob>;
  id?: string;
}

interface WithSaveProps {
  id?: string;
}

export function withSave<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithSaveComponent = forwardRef<SaveableCardRef, P & WithSaveProps>((props, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const getTargetElement = () => {
      if (!cardRef.current) throw new Error("Card ref not available");
      const targetElement = cardRef.current.firstElementChild as HTMLElement;
      if (!targetElement) throw new Error("No child element found");
      return targetElement;
    };

    const createOptions = (targetElement: HTMLElement, scale?: number) => {
      if (!scale) {
        // 没有传入 scale 时，使用固定宽度 1080，高度按比例缩放
        const aspectRatio = targetElement.offsetHeight / targetElement.offsetWidth;
        const targetWidth = 2160;
        const targetHeight = targetWidth * aspectRatio;

        return {
          width: targetWidth,
          height: targetHeight,
          style: {
            transform: `scale(${targetWidth / targetElement.offsetWidth})`,
            transformOrigin: "top left",
            width: targetElement.offsetWidth + "px",
            height: targetElement.offsetHeight + "px",
          },
        };
      }

      // 传入 scale 时按照 scale 缩放
      return {
        width: targetElement.offsetWidth * scale,
        height: targetElement.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: targetElement.offsetWidth + "px",
          height: targetElement.offsetHeight + "px",
        },
      };
    };

    const handleDownload = async () => {
      try {
        const targetElement = getTargetElement();
        const options = createOptions(targetElement);
        const className = targetElement.className;
        targetElement.classList.remove("rounded-md", "overflow-hidden", "border");
        const dataUrl = await domtoimage.toPng(targetElement, options);
        const link = document.createElement("a");
        link.download = `palette-${props.id || Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        targetElement.className = className;
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      saveAsImage: async (filename = "palette.png", scale?: number) => {
        try {
          const targetElement = getTargetElement();
          const options = createOptions(targetElement, scale);
          const className = targetElement.className;
          targetElement.classList.remove("rounded-md", "overflow-hidden", "border");
          const dataUrl = await domtoimage.toPng(targetElement, options);
          const link = document.createElement("a");
          link.download = filename;
          link.href = dataUrl;
          link.click();
          targetElement.className = className;
        } catch (error) {
          console.error("Error saving image:", error);
        }
      },
      getImageBlob: async (scale?: number) => {
        try {
          const targetElement = getTargetElement();
          const options = createOptions(targetElement, scale);
          return await domtoimage.toBlob(targetElement, options);
        } catch (error) {
          console.error("Error getting image blob:", error);
          throw error;
        }
      },
      id: props.id,
    }));

    return (
      <div 
        ref={cardRef}
        className="relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <WrappedComponent {...(props as P)} />
        
        {/* Hover Mask */}
        {isHovering && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-200">
            <div className="text-center text-white space-y-2">
              {props.id && (
                <div className="text-sm font-mono opacity-80">
                  ID: {props.id}
                </div>
              )}
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownload}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  });

  WithSaveComponent.displayName = `withSave(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithSaveComponent;
}
