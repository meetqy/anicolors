"use client";

import { CardColor1 } from "@/components/card/color/1";
import { CardColorGradientLighten } from "@/components/card/color/gradient";
import { CardPalette1 } from "@/components/card/palette/1";
import { CardPalette2 } from "@/components/card/palette/2";
import { CardPalette3 } from "@/components/card/palette/3";
import { SaveableCardRef } from "@/components/card/with-save";
import { ColorPoint } from "@/components/palette/picker-colors";
import { Button } from "@/components/ui/button";
import { Palette } from "@/query/palette";
import { useSearchParams } from "next/navigation";
import { CSSProperties, useRef, useMemo } from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";

export interface DomGalleryRef {
  saveAsImage: () => Promise<void>;
}

const photosData = {
  palettes: [
    { aspect: "3/4", component: CardPalette1 },
    { aspect: "16/9", component: CardPalette2 },
    { aspect: "1/1", component: CardPalette3 },
  ],
};

export const DomGallery = ({ image, points, id, gallery }: { image: string; points: ColorPoint[]; id?: string; gallery: Palette["gallery"] }) => {
  // 使用 Map 来管理多个 palette refs
  const myRefs = useRef<Map<string, SaveableCardRef>>(new Map());
  const params = useSearchParams();
  const admin = !!params.get("admin");

  // 创建 photo album 数据
  const photos = useMemo(() => {
    if (!image || !points.length) return [];
    return [
      ...photosData.palettes.map((palette, index) => {
        const [width, height] = palette.aspect.split("/");
        const id = `palette-${index}`;
        return {
          src: id,
          width: parseInt(width, 10),
          height: parseInt(height, 10),
          component: (props: { style?: CSSProperties; className?: string }) => {
            const Component = palette.component;

            return (
              <Component
                ref={(ref) => {
                  if (ref) myRefs.current.set(id, ref);
                }}
                id={id}
                points={points}
                image={image}
                {...props}
              />
            );
          },
        };
      }),
      ...points.map((e) => ({
        src: `gradient-lighten-${e.id}`,
        width: 4,
        height: 5,
        component: (props: { style?: CSSProperties; className?: string }) => (
          <CardColorGradientLighten
            ref={(ref) => {
              if (ref) myRefs.current.set(`gradient-lighten-${e.id}`, ref);
            }}
            id={`gradient-lighten-${e.id}`}
            point={e}
            key={e.id}
            {...props}
          />
        ),
      })),
    ];
  }, [points, image]);

  const saveAllImage = async () => {
    const prefix = id ? `${id}-` : "";

    // 遍历所有 refs 并保存
    myRefs.current.forEach((ref) => {
      ref?.saveAsImage(`${prefix}${ref.id}.png`);
    });
  };

  const saveMissImage = () => {
    const prefix = id ? `${id}-` : "";
    const names = gallery.map((e) => e.name);

    // 遍历所有 refs 并保存
    myRefs.current.forEach((ref) => {
      const filename = `${prefix}${ref.id}.png`;
      if (names.includes(filename)) return;

      ref?.saveAsImage(filename);
    });
  };

  return (
    <div className="prose mx-auto mt-12 max-w-screen-xl px-4 xl:px-0 ">
      <div className="flex gap-4">
        <Button size={"lg"} onClick={saveAllImage}>
          Download All Assets
        </Button>
        {admin && (
          <Button size={"lg"} variant="outline" onClick={saveMissImage}>
            Download Missing Assets
          </Button>
        )}
      </div>
      <h2>Colors</h2>
      <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {points.map((item, index) => (
          <CardColor1
            ref={(ref) => {
              if (ref) myRefs.current.set(`color-${index}`, ref);
            }}
            className="w-full"
            id={`color-${index}`}
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
