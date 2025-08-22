import { Columns } from "@/app/_components/columns";
import { Hero } from "@/components/hero";
import { PaginationControls } from "@/components/pagination-controls";
import { getClient } from "@/lib/apollo-client";
import {
  GET_CATEGORIES,
  GET_PALETTE_LIST,
  type CategoriesResponse,
  type PaletteListResponse,
} from "@/query/palette";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pageSize = 24;

const getCategory = async (name: string) => {
  const res = await getClient().query<CategoriesResponse>({
    query: GET_CATEGORIES,
    variables: {
      filters: {
        name: {
          containsi: decodeURIComponent(name),
        },
      },
    },
  });

  const category = res.data.categories[0];
  if (!category) {
    return notFound();
  }

  return category;
};

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
    <>
      <div className="px-4 lg:px-0">
        <Hero
          title={decodeURIComponent(name)}
          description={` ${palettes_connection.pageInfo.total} color palettes in ${decodeURIComponent(name)} category`}
        />

        <div className="mx-auto max-w-screen-xl space-y-24">
          <Columns palettes={palettes} />
          <PaginationControls {...pageInfo} />
        </div>
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
  const categoryName = decodeURIComponent(name);
  const category = await getCategory(categoryName);

  const images = category?.cover ? [category.cover.url] : [];

  return {
    title: `${categoryName} Color Palettes - Page ${page} | AniColors`,
    description: `Browse more color palettes from ${categoryName}, page ${page}.`,
    openGraph: { images },
    twitter: { images },
    alternates: {
      canonical: `/category/${categoryName}${page > 1 ? `?page=${page}` : ""}`,
    },
  };
}
