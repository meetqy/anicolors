import { Metadata } from "next";
import { PaletteCard } from "./components/palette-card";
import { PaginationControls } from "./components/pagination-controls";
import { EmptyState } from "./components/empty-state";
import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE_LIST, PaletteListItem } from "@/query/palette";

/**
 * Server-side function to fetch palettes list
 */
export const getPalettesList = async (page: number = 1, pageSize: number = 24, sort: string = "createdAt:desc") => {
  try {
    const { data } = await getClient().query<{ palettes: PaletteListItem[] }>({
      query: GET_PALETTE_LIST,
      variables: {
        pagination: { page, pageSize },
        sort: [sort],
      },
      fetchPolicy: "no-cache",
    });

    return data.palettes;
  } catch (error) {
    console.error("Error fetching palettes:", error);
    return [];
  }
};

export const metadata: Metadata = {
  title: "Color Palettes Gallery | HiColors",
  description: "Discover beautiful color palettes created by designers and artists. Find inspiration for your next creative project.",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    sort?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const pageSize = parseInt(params.pageSize || "24", 10);
  const sort = params.sort || "createdAt:desc";

  const palettes = await getPalettesList(page, pageSize, sort);

  return (
    <div className="py-12 w-full">
      {!palettes?.length ? (
        <EmptyState />
      ) : (
        <>
          <div className="mx-auto mb-12 max-w-screen-xl px-4 lg:px-0 flex justify-center flex-col items-center">
            <h1 className="h1 text-left mb-6">HiColors List</h1>
            <p className="text-xl text-muted-foreground max-w-3xl text-center">Extracted from Genshin Impact, Studio Ghibli, fashion, UI and more. Visual color inspiration at your fingertips.</p>
          </div>
          <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {palettes.map((palette, index) => (
                <PaletteCard key={`${palette.name}-${index}`} palette={palette} />
              ))}
            </div>

            <PaginationControls currentPage={page} pageSize={pageSize} totalItems={palettes.length} sort={sort} />
          </div>
        </>
      )}
    </div>
  );
}
