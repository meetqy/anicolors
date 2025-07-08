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
          componentsProps={{
            image: {
              className: "rounded-md overflow-hidden",
            },
          }}
          photos={palette.gallery.map((item) => {
            const ratio = item.width / item.height;

            return {
              src: getAssetUrl(item.url, 300),
              srcSet: [
                { width: 300, height: 300 / ratio, src: getAssetUrl(item.url, 300) },
                { width: 600, height: 600 / ratio, src: getAssetUrl(item.url, 600) },
                { width: 1200, height: 1200 / ratio, src: getAssetUrl(item.url, 1200) },
              ],
              width: item.width,
              height: item.height,
              alt: palette.name,
            };
          })}
        />
      </div>
    </div>
  );
};
