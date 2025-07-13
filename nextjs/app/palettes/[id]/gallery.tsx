"use client";
import { getAssetUrl } from "@/lib/utils";
import { Palette } from "@/query/palette";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

export const Gallery = ({ palette }: { palette: Palette }) => {
  return (
    <div className="not-prose">
      <ColumnsPhotoAlbum
        columns={(containerWidth) => {
          if (containerWidth < 768) return 2;
          if (containerWidth < 1024) return 3;
          return 4;
        }}
        componentsProps={() => ({
          image: {
            className: "rounded-md overflow-hidden",
          },
        })}
        photos={palette.gallery.map((item) => {
          // 删除_和后面的部分
          // 例如: "image_123.jpg" -> "image"
          const alt = item.url.split("/").pop()?.split("_").slice(0, -1).join(" ");

          return {
            src: item.url,
            width: item.width,
            height: item.height,
            alt: palette.name + " " + alt,
          };
        })}
        render={{
          image: (props) => {
            const src = props.src as string;

            return (
              <img
                {...props}
                src={getAssetUrl(src, 320)}
                srcSet={`
              ${getAssetUrl(src, 320)} 1x,
              ${getAssetUrl(src, 640)} 2x,
              ${getAssetUrl(src, 960)} 3x
            `}
              />
            );
          },
        }}
      />
    </div>
  );
};
