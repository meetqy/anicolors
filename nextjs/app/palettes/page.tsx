import { Metadata } from "next";
import { PaletteCard } from "./components/palette-card";
import { EmptyState } from "./components/empty-state";
import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE_LIST, PaletteListResponse } from "@/query/palette";
import { PaginationControls } from "@/components/pagination-controls";

const pageSize = 24;

const getPalettesList = async (page = 1) => {
  const res = await getClient().query<PaletteListResponse>({
    query: GET_PALETTE_LIST,
    variables: {
      pagination: { page, pageSize },
      sort: ["publishedAt:desc"],
    },
  });

  return res.data;
};
interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export const generateMetadata = async ({ searchParams }: PageProps): Promise<Metadata> => {
  const params = await searchParams;
  const page = parseInt(params.page || "1");

  return {
    title: `Discover Beautiful Color Palettes from Anime, Games & Art – Page ${page}`,
    description: `Explore a curated collection of color palettes inspired by anime, games, and illustrations. Find aesthetic combinations extracted from your favorite characters and scenes. Page ${page}.`,
  };
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");

  const { palettes_connection } = await getPalettesList(page);
  const { nodes: palettes, pageInfo } = palettes_connection;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {!palettes?.length ? (
        <EmptyState />
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold capitalize mb-2">HiColors Palettes</h1>
            <p className="text-muted-foreground">Extracted from Genshin Impact, Studio Ghibli, fashion, UI and more. Visual color inspiration at your fingertips.</p>
          </div>

          <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mb-12">
              {palettes.map((palette, index) => (
                <PaletteCard key={`${palette.name}-${index}`} palette={palette} />
              ))}
            </div>

            <PaginationControls {...pageInfo} />
          </div>
        </>
      )}
    </div>
  );
}
