"use client";

import { CardColor1 } from "@/components/card/color/1";
import { CardColorGradientLighten } from "@/components/card/color/gradient";
import { CardPalette1 } from "@/components/card/palette/1";
import { CardPalette2 } from "@/components/card/palette/2";
import { CardPalette3 } from "@/components/card/palette/3";
import { SaveableCardRef } from "@/components/card/with-save";
import { ColorPoint } from "@/components/palette/picker-colors";
import { Button } from "@/components/ui/button";
import { CSSProperties, useRef, useMemo } from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";

export interface DomGalleryRef {
  saveAsImage: () => Promise<void>;
}

export const DomGallery = ({ image, points, id }: { image: string; points: ColorPoint[]; id?: string }) => {
  // 使用 Map 来管理多个 palette refs
  const myRefs = useRef<Map<string, SaveableCardRef>>(new Map());

  // 创建 photo album 数据
  const photos = useMemo(() => {
    return [
      {
        src: "palette1",
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
        src: "palette2",
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
      {
        src: "palette3",
        width: 1,
        height: 1,
        component: (props: { style?: CSSProperties; className?: string }) => (
          <CardPalette3
            ref={(ref) => {
              if (ref) myRefs.current.set("palette3", ref);
            }}
            points={points}
            image={image}
            {...props}
          />
        ),
      },
      ...points.map((e) => ({
        src: `color1-${e.id}`,
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
  }, [points, image]);

  const saveAsImage = async () => {
    const name = id ? `${id}-` : "";

    // 遍历所有 refs 并保存
    myRefs.current.forEach((ref, key) => {
      ref?.saveAsImage(`${name}${key}.png`);
    });
  };

  return (
    <div className="prose mx-auto mt-12 max-w-screen-xl px-4 xl:px-0">
      <Button size={"lg"} onClick={saveAsImage}>
        Download All Assets
      </Button>
      <h2>Colors</h2>
      <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {points.map((item, index) => (
          <CardColor1
            ref={(ref) => {
              if (ref) myRefs.current.set(`color-${index}`, ref);
            }}
            className="w-full"
            key={index}
            point={item}
            index={index}
          />
        ))}
      </div>

      <h2>Color Palette Gallery</h2>
      <div className="not-prose">
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
      </div>
    </div>
  );
};
