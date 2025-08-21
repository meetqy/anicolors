import { Generator } from "@/components/palette/generator";
import { PickerPart } from "@/components/palette/picker-part";
import { Button } from "@/components/ui/button";
import { Shapes } from "lucide-react";
import { PaletteActions } from "./actions";
import { Blogs } from "./blogs";
import { CharacterInfo } from "./character-info";
import { ColorBaseInfo } from "./color-base-info";
import { Coloring } from "./coloring";
import { Extend } from "./extend";
import { ExtendPart } from "./extend-part";
import { Gallery } from "./gallery";
import { MoreList } from "./more-list";
import type { Palette } from "@/query/palette";
import { getAssetUrl } from "@/lib/utils";
import Link from "next/link";

export const CharacterPage = ({ palette }: { palette: Palette }) => {
  const { points } = palette;
  const image = getAssetUrl(palette.image.url, 960);

  return (
    <div className="mx-auto py-12">
      <CharacterInfo palette={palette} />
      <PickerPart className="mb-6" colors={palette.extend?.parts} />
      <Generator initialPoints={points} initialImage={image} />

      <PaletteActions palette={palette} />
      <ColorBaseInfo palette={palette} />
      <ExtendPart palette={palette} />

      <div className="mx-auto mt-12 flex max-w-screen-md flex-wrap gap-x-2 gap-y-4 px-4 lg:justify-center lg:px-0">
        <Button
          variant="outline"
          className="rounded-full capitalize"
          size="sm"
          asChild
        >
          <Link href={`/category/${palette.category}`}>
            <Shapes className="size-4" />
            {palette.category}
          </Link>
        </Button>
        {points.map((item, index) => (
          <Button
            asChild
            variant="outline"
            className="rounded-full"
            key={index}
            size="sm"
          >
            <Link href={`/color/${item.name}`}>
              <div
                className="size-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </Link>
          </Button>
        ))}
      </div>

      <div className="prose mx-auto mt-24 max-w-screen-xl px-4">
        <Gallery palette={palette} />
        <Coloring palette={palette} />
        <Blogs palette={palette} />
        <Extend palette={palette} />
        <MoreList
          category={palette.category}
          colors={points.map((item) => item.name!)}
        />
      </div>
    </div>
  );
};
