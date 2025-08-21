import { getClient } from "@/lib/apollo-client";
import { getAssetUrl, capitalize } from "@/lib/utils";
import { GET_PALETTE, type Palette } from "@/query/palette";
import { type Metadata } from "next";
import { CharacterPage } from "./_components/character-page";
import { FragmentPage } from "./_components/fragement-page";

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

  const hexs = palette.points.map((item) => item.color).join(", ");

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
  const type = palette.type || "character";

  return type === "character" ? (
    <CharacterPage palette={palette} />
  ) : (
    <FragmentPage palette={palette} />
  );
}
