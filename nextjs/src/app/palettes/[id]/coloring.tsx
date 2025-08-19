"use client";

import { getAssetUrl } from "@/lib/utils";
import type { Palette } from "@/query/palette";
import { ColumnsPhotoAlbum } from "react-photo-album";

export const Coloring = ({ palette }: { palette: Palette }) => {
  if (!palette.coloring?.length) return null;

  return (
    <>
      <h2>Coloring Pages for {palette.name}</h2>
      <p>
        Try coloring {palette.name} with your own style using this free line art
        sheet.
      </p>
      <div className="not-prose">
        <ColumnsPhotoAlbum
          photos={palette.coloring?.map((item) => {
            return {
              src: item.url,
              width: item.width,
              height: item.height,
            };
          })}
          render={{
            image: (props) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={props.src as string}
                className="group relative"
                download
              >
                <img
                  src={getAssetUrl(props.src as string, 512)}
                  alt={`${palette.name} coloring page #${props.id}`}
                  className="group-hover:border-border rounded-md border border-transparent transition-all"
                />
              </a>
            ),
          }}
        />
      </div>
    </>
  );
};
