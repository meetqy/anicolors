import { ColorBaseInfo } from "@/app/palettes/[id]/color-base-info";
import { Generator } from "@/components/palette/generator";
import { Button } from "@/components/ui/button";
import { PaletteActions } from "./actions";
import { getClient } from "@/lib/apollo-client";
import { getAssetUrl } from "@/lib/utils";
import { Gallery } from "./gallery";
import { GET_PALETTE, Palette } from "@/query/palette";
import { Metadata } from "next";
import Link from "next/link";
import { Shapes } from "lucide-react";
import { MoreList } from "./more-list";
import Color from "color";

const getPaletteData = async (id: string) => {
  const res = await getClient().query({
    query: GET_PALETTE,
    variables: {
      documentId: id,
      pagination: {
        pageSize: 24,
        page: 1,
      },
    },
  });

  return res.data.palette as Palette;
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const { id } = await params;
  const palette = await getPaletteData(id);
  const imageUrl = getAssetUrl(palette.cover.url, 960);

  const hexs = palette.points.map((item) => Color(item.color).hex()).join(" ");

  return {
    title: `${palette.name} Color Palette: ${hexs}`,
    description: `Explore the ${palette.name} color palette with shades like ${hexs}. Drag colors to create your palette.`,
    openGraph: {
      images: [{ url: imageUrl }],
    },
    twitter: {
      images: [imageUrl],
    },
  };
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const palette = await getPaletteData(id);
  const points = palette.points;
  const image = getAssetUrl(palette.image.url, 960);

  return (
    <div className="mx-auto py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left capitalize">
          {palette.category} {palette.name} Color Palette
        </h1>
        <p className="p">
          Click and drag the color points on the image to select five colors you feel best represent <b>{palette.name}</b>. Everyone sees colors differently — express your version of this character
          through your own custom palette!
        </p>
      </div>
      <Generator initialPoints={points} initImage={image} />

      <PaletteActions id={id} palette={palette} />

      <div className="grid gap-2 grid-cols-5 max-w-screen-md mx-auto px-4 lg:px-0 mt-24">
        {points.map((item, index) => (
          <ColorBaseInfo point={item} key={index} />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-4 max-w-screen-md mx-auto px-4 lg:px-0 mt-12 lg:justify-center">
        <Button variant="outline" className="rounded-full capitalize" size="sm" asChild>
          <Link href={`/category/${palette.category}`}>
            <Shapes className="size-4" />
            {palette.category}
          </Link>
        </Button>
        {points.map((item, index) => (
          <Button variant="outline" className="rounded-full" key={index} size="sm">
            <div className="size-4 rounded-full" style={{ backgroundColor: item.color }}></div>
            {item.name}
          </Button>
        ))}
      </div>

      <div className="max-w-screen-xl prose mx-auto px-4 lg:px-0 mt-24">
        <h2>Color Palette Gallery</h2>
        <Gallery palette={palette} />
        <h2>More</h2>
        <MoreList category={palette.category} colors={points.map((item) => item.name!)} />
      </div>
    </div>
  );
}
