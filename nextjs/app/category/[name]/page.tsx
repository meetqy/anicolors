import { PaletteCard } from "@/app/palettes/components/palette-card";
import { PaginationControls } from "@/components/pagination-controls";
import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE_LIST, PaletteListItem } from "@/query/palette";

const getPalettesList = async (name: string, page: number = 1, pageSize: number = 24) => {
  try {
    const { data } = await getClient().query<{
      palettes: {
        data: PaletteListItem[];
        meta: {
          pagination: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
          };
        };
      };
    }>({
      query: GET_PALETTE_LIST,
      variables: {
        filters: { category: { containsi: name } },
        pagination: { page, pageSize },
        sort: ["createdAt:desc"],
      },
      fetchPolicy: "no-cache",
    });

    return {
      palettes: data.palettes.data,
      meta: data.palettes.meta,
    };
  } catch (error) {
    console.error("Error fetching palettes:", error);
    return {
      palettes: [],
      meta: { pagination: { total: 0, page: 1, pageSize, pageCount: 0 } },
    };
  }
};

interface CategoryPageProps {
  params: {
    name: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { name } = params;
  const page = parseInt(searchParams.page || "1");
  const pageSize = 24;

  const { palettes, meta } = await getPalettesList(name, page, pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize mb-2">{decodeURIComponent(name)} Palettes</h1>
        <p className="text-muted-foreground">
          {meta.pagination.total} color palettes in {decodeURIComponent(name)} category
        </p>
      </div>

      {palettes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {palettes.map((palette) => (
            <PaletteCard key={palette.documentId} palette={palette} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No palettes found in this category.</p>
        </div>
      )}

      <PaginationControls currentPage={meta.pagination.page} totalPages={meta.pagination.pageCount} basePath={`/category/${encodeURIComponent(name)}`} />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.name);

  return {
    title: `${categoryName} Color Palettes - HiColors`,
    description: `Explore beautiful ${categoryName} color palettes and find inspiration for your next design project.`,
  };
}
