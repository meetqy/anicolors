"use client";

import type { PaletteListItem } from "@/query/palette";
import { ColumnsPhotoAlbum } from "react-photo-album";
import { PaletteCard } from "@/app/palettes/components/palette-card";
import "react-photo-album/columns.css";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider } from "react-photo-view";

export const Columns = ({ palettes }: { palettes: PaletteListItem[] }) => {
  const photos = palettes.map((palette, index) => {
    let width = 1;
    let height = 1;
    if (palette.type === "fragment") {
      width = palette.cover.width;
      height = palette.cover.height;
    }

    return {
      src: palette.image?.url || "", // 假设 palette 有 image.url
      width,
      height,
      key: `${palette.documentId}-${index}`,
      palette, // 传递原始数据用于渲染
    };
  });

  return (
    <PhotoProvider>
      <ColumnsPhotoAlbum
        photos={photos}
        columns={(containerWidth) => {
          if (containerWidth < 768) return 2;
          if (containerWidth < 1280) return 3;
          return 4;
        }}
        render={{
          photo: (props, context) => {
            return (
              <PaletteCard
                key={context.photo.key}
                palette={context.photo.palette}
              />
            );
          },
        }}
      />
    </PhotoProvider>
  );
};
