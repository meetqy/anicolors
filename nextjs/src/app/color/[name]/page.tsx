import { Columns } from "@/components/columns";
import { Hero } from "@/components/hero";
import { PaginationControls } from "@/components/pagination-controls";
import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE_LIST, type PaletteListResponse } from "@/query/palette";
import type { Metadata } from "next";

const pageSize = 24;

const getPalettesList = async (name: string, page = 1) => {
  const res = await getClient().query<PaletteListResponse>({
    query: GET_PALETTE_LIST,
    variables: {
      filters: { colors: { name: { containsi: decodeURIComponent(name) } } },
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
    <>
      <Hero
        title={decodeURIComponent(name) + " color palettes"}
        description={` ${palettes_connection.pageInfo.total} color palettes in "${decodeURIComponent(name)}" color name.`}
      />

      <div className="container space-y-24">
        <Columns palettes={palettes} />
        <PaginationControls {...pageInfo} />
      </div>
    </>
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { name } = await params;
  const page = parseInt((await searchParams).page ?? "1");
  const { palettes_connection } = await getPalettesList(name, page);
  const categoryName = decodeURIComponent(name);

  return {
    title: `${categoryName} Color Palettes – Page ${page} | AniColors`,
    description: `Page ${page} of beautiful ${categoryName} color palettes.`,
    alternates: {
      canonical: `/color/${categoryName}${page > 1 ? `?page=${page}` : ""}`,
    },
    robots: {
      index: palettes_connection.pageInfo.total > 24,
      follow: true,
    },
  };
}
