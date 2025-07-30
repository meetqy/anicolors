import { PaletteCard } from "@/app/palettes/components/palette-card";
import { PaginationControls } from "@/components/pagination-controls";
import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE_LIST, type PaletteListResponse } from "@/query/palette";

const pageSize = 24;

const getPalettesList = async (name: string, page = 1) => {
  const res = await getClient().query<PaletteListResponse>({
    query: GET_PALETTE_LIST,
    variables: {
      filters: {
        category: {
          containsi: decodeURIComponent(name),
        },
      },
      pagination: { page, pageSize },
      sort: ["publishedAt:desc"],
    },
  });

  return res.data;
};

interface CategoryPageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { name } = await params;
  const page = parseInt((await searchParams).page ?? "1");

  const { palettes_connection } = await getPalettesList(name, page);
  const { nodes: palettes, pageInfo } = palettes_connection;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold capitalize">
          {decodeURIComponent(name)} Palettes
        </h1>
        <p className="text-muted-foreground">
          {palettes_connection.pageInfo.total} color palettes in{" "}
          {decodeURIComponent(name)} category
        </p>
      </div>

      {palettes.length > 0 ? (
        <div className="mb-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {palettes.map((palette) => (
            <PaletteCard key={palette.documentId} palette={palette} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No palettes found in this category.
          </p>
        </div>
      )}

      <PaginationControls {...pageInfo} />
    </div>
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps) {
  const { name } = await params;
  const page = parseInt((await searchParams).page ?? "1");
  const categoryName = decodeURIComponent(name);

  return {
    title: `${categoryName} Color Palettes - Page ${page} | AniColors`,
    description: `Browse more color palettes from ${categoryName}, page ${page}.`,
  };
}
