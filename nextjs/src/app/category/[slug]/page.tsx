import { Columns } from "@/components/columns";
import { Hero } from "@/components/hero";
import { PaginationControls } from "@/components/pagination-controls";
import { getClient } from "@/lib/apollo-client";
import {
  GET_CATEGORY_BY_SLUG,
  type GetCategoryBySlugResponse,
} from "@/query/category";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pageSize = 24;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

const getCategory = async ({ params, searchParams }: CategoryPageProps) => {
  const { slug } = await params;
  const page = parseInt((await searchParams).page ?? "1");

  const res = await getClient().query<GetCategoryBySlugResponse>({
    query: GET_CATEGORY_BY_SLUG,
    variables: {
      filters: {
        slug: {
          eq: slug,
        },
      },
      palettesConnectionFilters2: {
        categoryExtend: {
          slug: {
            eq: slug,
          },
        },
      },
      pagination: {
        pageSize,
        page,
      },
    },
  });

  const { categories, palettes_connection } = res.data;
  const category = categories?.[0];

  if (!category) {
    notFound();
  }

  return { category, palettes_connection };
};

export default async function CategoryPage(props: CategoryPageProps) {
  const { category, palettes_connection } = await getCategory(props);

  const { nodes: palettes, pageInfo } = palettes_connection;

  return (
    <>
      <div className="px-4 lg:px-0">
        <Hero
          title={category.name}
          description={` ${palettes_connection.pageInfo.total} color palettes in ${category.name} category`}
        />

        <div className="mx-auto max-w-screen-xl space-y-24">
          <Columns palettes={palettes} />
          <PaginationControls {...pageInfo} />
        </div>
      </div>
    </>
  );
}

export async function generateMetadata(
  props: CategoryPageProps,
): Promise<Metadata> {
  const { category, palettes_connection } = await getCategory(props);
  const { pageInfo } = palettes_connection;

  const images = category?.cover ? [category.cover.url] : [];

  return {
    title: `${category.name} Color Palettes - Page ${pageInfo.page} | AniColors`,
    description: `Browse more color palettes from ${category.name}, page ${pageInfo.page}.`,
    openGraph: { images },
    twitter: { images },
    alternates: {
      canonical: `/category/${category.name}${pageInfo.page > 1 ? `?page=${pageInfo.page}` : ""}`,
    },
  };
}
