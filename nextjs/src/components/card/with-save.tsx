"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ComponentType,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import domtoimage from "dom-to-image";
import { cn } from "@/lib/utils";

export interface SaveableCardRef {
  saveAsImage: (filename?: string, scale?: number) => Promise<void>;
  getImageBlob: (scale?: number) => Promise<Blob>;
  id?: string;
}

interface WithSaveProps {
  id?: string;
  className?: string;
  maskExtra?: React.ReactNode;
}

export function withSave<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithSaveComponent = forwardRef<SaveableCardRef, P & WithSaveProps>(
    (props, ref) => {
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
          const aspectRatio =
            targetElement.offsetHeight / targetElement.offsetWidth;
          const targetWidth = 1080;
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

      const handleDownload = async ({
        fileName,
        scale,
        mask = true,
      }: {
        fileName?: string;
        scale?: number;
        mask?: boolean;
      }) => {
        try {
          const targetElement = getTargetElement();
          const options = createOptions(targetElement, scale);
          const className = targetElement.className;
          if (!mask) {
            const logoMask = targetElement.querySelector("#logo-mask");
            if (logoMask) targetElement.removeChild(logoMask);
          }
          targetElement.classList.remove(
            "rounded-md",
            "overflow-hidden",
            "border",
            "rounded-lg",
          );
          const dataUrl = await domtoimage.toPng(targetElement, options);
          const link = document.createElement("a");
          link.download = fileName ?? `palette-${props.id ?? Date.now()}.png`;
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
            await handleDownload({ fileName: filename, scale });
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
          className={cn("group relative", props.className)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <WrappedComponent {...(props as P)} />

          {/* Hover Mask */}
          {isHovering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all duration-200">
              <div className="grid space-y-2 text-center">
                {props.id && (
                  <div className="font-mono text-sm text-white opacity-80">
                    ID: {props.id}
                  </div>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload({ mask: false })}
                  className="border-white/20 bg-white/20 text-white hover:bg-white/30"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                {props.maskExtra}
              </div>
            </div>
          )}
        </div>
      );
    },
  );

  WithSaveComponent.displayName = `withSave(${WrappedComponent.displayName ?? WrappedComponent.name})`;

  return WithSaveComponent;
}
