import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE_LIST, PaletteListResponse } from "@/query/palette";
import { PaletteCard } from "../components/palette-card";
import { PaginationControls } from "@/components/pagination-controls";

export const MoreList = async ({ category, colors, page = 1 }: { category: string; colors: string[]; page: number }) => {
  const { data } = await getClient().query<PaletteListResponse>({
    query: GET_PALETTE_LIST,
    variables: {
      pagination: {
        pageSize: 24,
        page,
      },
      filters: {
        or: [
          {
            colors: {
              or: colors.map((color) => ({
                name: { containsi: color },
              })),
            },
          },
          { category: { containsi: category } },
        ],
      },
    },
  });

  const { palettes_connection } = data;
  const { nodes: palettes, pageInfo } = palettes_connection;

  return (
    <div className="not-prose">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mb-12">
        {palettes.map((palette, index) => (
          <PaletteCard key={`${palette.name}-${index}`} palette={palette} />
        ))}
      </div>

      <PaginationControls {...pageInfo} />
    </div>
  );
};
