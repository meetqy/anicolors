import { type Metadata } from "next";
import { Maker } from "./components/maker";
import Introduction from "./components/introduction";
import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE, type Palette } from "@/query/palette";

type Props = {
  searchParams: Promise<{ id: string }>;
};

const getPalette = async (id: string) => {
  const res = await getClient().query<{ palette: Palette }>({
    query: GET_PALETTE,
    variables: {
      documentId: id,
      pagination: { pageSize: 100, page: 1 },
      skip: !id,
    },
  });

  return res.data.palette;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const { id } = await searchParams;
  const palette = await getPalette(id);

  return {
    title: palette
      ? `${palette.name} Color Palette Generator | AniColors`
      : "Anime Color Palette Generator | AniColors",
    description: `Drag color markers, or select colors from the corresponding areas, to generate the ${palette.name} color palette.`,
    alternates: { canonical: `/create?id=${id}` },
  };
};

export default async function Page({ searchParams }: Props) {
  const { id } = await searchParams;
  const palette = await getPalette(id);

  return (
    <div className="py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left">{palette.name} Color Palette Generator</h1>
        <p className="p">{`Drag color markers, or select colors from the corresponding areas, to generate the ${palette.name} color palette.`}</p>
      </div>
      <Maker palette={palette} />
      <Introduction />
    </div>
  );
}
