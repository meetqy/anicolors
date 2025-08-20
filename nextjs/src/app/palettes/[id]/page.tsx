import { ColorBaseInfo } from "./_components/color-base-info";
import { Generator } from "@/components/palette/generator";
import { Button } from "@/components/ui/button";
import { PaletteActions } from "./_components/actions";
import { getClient } from "@/lib/apollo-client";
import { getAssetUrl, capitalize } from "@/lib/utils";
import { Gallery } from "./_components/gallery";
import { GET_PALETTE, type Palette } from "@/query/palette";
import { type Metadata } from "next";
import Link from "next/link";
import { Shapes } from "lucide-react";
import { MoreList } from "./_components/more-list";
import Color from "color";
import { Extend } from "./_components/extend";
import { ExtendPart } from "./_components/extend-part";
import { PickerPart } from "@/components/palette/picker-part";
import { Blogs } from "./_components/blogs";
import { Coloring } from "./_components/coloring";

const getPaletteData = async (id: string) => {
  const res = await getClient().query({
    query: GET_PALETTE,
    variables: {
      documentId: id,
      // 图片的分页
      pagination: { pageSize: 100, page: 1 },
    },
  });

  const palette = res.data.palette as Palette;

  return {
    ...palette,
    name: capitalize(palette.name),
    category: capitalize(palette.category),
  };
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;
  const palette = await getPaletteData(id);
  const imageUrl = getAssetUrl(palette.cover.url, 960);

  const hexs = palette.points.map((item) => Color(item.color).hex()).join(", ");

  return {
    title: `${palette.name} Color Palette - ${palette.category}`,
    description: `${palette.name} color palette by ${palette.category}, Colors ${hexs}.`,
    alternates: { canonical: `/palettes/${id}` },
    openGraph: { images: [{ url: imageUrl }] },
    twitter: { images: [imageUrl] },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const palette = await getPaletteData(id);
  const points = palette.points;
  const image = getAssetUrl(palette.image.url, 960);

  return (
    <>
      <div className="mx-auto py-12">
        <div className="prose mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
          <h1 className="text-left capitalize">
            {palette.name} Color Palette - {palette.category}
          </h1>
          {palette.points?.length ? (
            <>
              <p>
                This color palette is inspired by the character{" "}
                <b>{palette.name}</b> from{" "}
                <Link
                  className="capitalize underline"
                  href={`/category/${palette.category}`}
                >
                  {palette.category}
                </Link>
                . We've extracted these five iconic colors from the official
                character art. Want to create your own version? Hit the{" "}
                <b>"Custom Maker"</b> button below to get started!
              </p>

              <ul>
                <li>
                  {" "}
                  You can drag the markers to picker different colors, create
                  your own color palettes.
                </li>
                <li>
                  Free download {palette.category} {palette.name} transparent
                  background png HD.
                </li>
              </ul>
            </>
          ) : (
            <img
              className="mx-auto max-w-screen-md"
              src={palette.image.url}
              alt={palette.name + " color palette"}
            />
          )}
        </div>

        {palette.points?.length && (
          <>
            <PickerPart className="mb-6" colors={palette.extend?.parts} />
            <Generator initialPoints={points} initialImage={image} />
            <PaletteActions id={id} palette={palette} />
            <div className="mx-auto mt-24 flex max-w-screen-md justify-center gap-2 px-4 lg:px-0">
              {points.map((item, index) => (
                <ColorBaseInfo point={item} key={index} />
              ))}
            </div>
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
                    ></div>
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </>
        )}

        <div className="prose mx-auto mt-24 max-w-screen-xl px-4">
          <Gallery palette={palette} />
          <Coloring palette={palette} />
          <Blogs palette={palette} />
          <Extend palette={palette} />
          <MoreList
            category={palette.category}
            colors={points ? points.map((item) => item.name!) : []}
          />
        </div>
      </div>
    </>
  );
}
