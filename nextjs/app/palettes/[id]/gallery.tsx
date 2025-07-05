"use client";
import { getAssetUrl } from "@/lib/utils";
import { Palette } from "@/query/palette";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

export const Gallery = ({ palette }: { palette: Palette }) => {
  return (
    <div className="max-w-screen-xl prose mx-auto px-4 lg:px-0 mt-24">
      <h2>Color Palette Gallery</h2>

      <div className="not-prose">
        <ColumnsPhotoAlbum
          columns={(containerWidth) => {
            if (containerWidth < 768) return 2;
            if (containerWidth < 1024) return 3;
            return 4;
          }}
          photos={palette.gallery.map((item) => ({
            src: getAssetUrl(item.url),
            width: item.width,
            height: item.height,
            alt: palette.name,
          }))}
        />
      </div>
    </div>
  );
};
