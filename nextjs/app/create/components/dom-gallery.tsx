"use client";

import { CardColorGradientLighten } from "@/components/card/color/gradient";
import { CardPalette1 } from "@/components/card/palette/1";
import { CardPalette2 } from "@/components/card/palette/2";
import { SaveableCardRef } from "@/components/card/with-save";
import { ColorPoint } from "@/components/palette/picker-colors";
import { CSSProperties, useRef, useImperativeHandle, forwardRef, useMemo } from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";

export interface DomGalleryRef {
  saveAsImage: () => Promise<void>;
}

export const DomGallery = forwardRef<DomGalleryRef, { image: string; points: ColorPoint[]; topicId?: string }>(({ image, points, topicId }, ref) => {
  // 使用 Map 来管理多个 palette refs
  const myRefs = useRef<Map<string, SaveableCardRef>>(new Map());

  // 创建 photo album 数据
  const photos = useMemo(() => {
    return [
      {
        src: "1",
        width: 3,
        height: 4,
        component: (props: { style?: CSSProperties; className?: string }) => (
          <CardPalette1
            ref={(ref) => {
              if (ref) myRefs.current.set("palette1", ref);
            }}
            points={points}
            image={image}
            {...props}
          />
        ),
      },
      {
        src: "2",
        width: 16,
        height: 9,
        component: (props: { style?: CSSProperties; className?: string }) => (
          <CardPalette2
            ref={(ref) => {
              if (ref) myRefs.current.set("palette2", ref);
            }}
            points={points}
            image={image}
            {...props}
          />
        ),
      },
      ...points.map((e) => ({
        src: `3-${e.id}`,
        width: 4,
        height: 5,
        component: (props: { style?: CSSProperties; className?: string }) => (
          <CardColorGradientLighten
            ref={(ref) => {
              if (ref) myRefs.current.set(`gradient-lighten-${e.id}`, ref);
            }}
            point={e}
            key={e.id}
            {...props}
          />
        ),
      })),
    ];
  }, [points]);

  const saveAsImage = async () => {
    const topicName = topicId ? `${topicId}-` : "";

    // 遍历所有 refs 并保存
    myRefs.current.forEach((ref, key) => {
      ref?.saveAsImage(`${topicName}${key}.png`);
    });
  };

  useImperativeHandle(ref, () => ({
    saveAsImage,
  }));

  return (
    <ColumnsPhotoAlbum
      photos={photos}
      columns={(containerWidth) => {
        if (containerWidth < 768) return 2;
        if (containerWidth < 1024) return 3;
        return 4;
      }}
      render={{
        image: (props, context) => {
          const scale = context.width / 375;
          const Com = context.photo.component;

          return (
            <div
              {...props}
              style={{
                ...props.style,
                overflow: "hidden",
                width: context.width,
                height: context.height,
              }}
            >
              <Com
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  width: 375,
                  height: (context.photo.height / context.photo.width) * 375,
                }}
              />
            </div>
          );
        },
      }}
    />
  );
});

DomGallery.displayName = "DomGallery";
