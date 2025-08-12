import { type Metadata } from "next";
import { PaletteCard } from "./components/palette-card";
import { EmptyState } from "./components/empty-state";
import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE_LIST, type PaletteListResponse } from "@/query/palette";
import { PaginationControls } from "@/components/pagination-controls";
import { Hero } from "@/components/hero";

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

export const generateMetadata = async ({
  searchParams,
}: PageProps): Promise<Metadata> => {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");

  return {
    title: `Discover Beautiful Color Palettes from Anime, Games & Art – Page ${page}`,
    description: `Explore a curated collection of color palettes inspired by anime, games, and illustrations. Find aesthetic combinations extracted from your favorite characters and scenes. Page ${page}.`,
  };
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");

  const { palettes_connection } = await getPalettesList(page);
  const { nodes: palettes, pageInfo } = palettes_connection;

  return !palettes?.length ? (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <EmptyState />
    </div>
  ) : (
    <>
      <Hero
        title="Anime Colors Palettes"
        description="Explore a curated collection of color palettes inspired by anime, games, and illustrations."
      />

      <div className="mx-auto max-w-screen-xl px-4 pb-8 md:pb-16 lg:px-0 lg:pb-20">
        <div className="mb-12 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {palettes.map((palette, index) => (
            <PaletteCard key={`${palette.name}-${index}`} palette={palette} />
          ))}
        </div>

        <PaginationControls {...pageInfo} />
      </div>
    </>
  );
}
