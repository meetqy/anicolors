"use client";

import type { PaletteListItem } from "@/query/palette";
// import { ColumnsPhotoAlbum } from "react-photo-album";
// import "react-photo-album/columns.css";
import { PaletteCard } from "@/app/palettes/components/palette-card";

import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export const Columns = ({ palettes }: { palettes: PaletteListItem[] }) => {
  // const photos = palettes.map((palette, index) => {
  //   return {
  //     src: palette.image?.url || "", // 假设 palette 有 image.url
  //     width: 1,
  //     height: 1,
  //     key: `${palette.documentId}-${index}`,
  //     palette, // 传递原始数据用于渲染
  //   };
  // });

  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {palettes.map((palette) => (
          <PaletteCard key={palette.documentId} palette={palette} />
        ))}
      </div>
      {/* <ColumnsPhotoAlbum
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
      /> */}
    </PhotoProvider>
  );
};
