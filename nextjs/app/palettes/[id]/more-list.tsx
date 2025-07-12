import { getClient } from "@/lib/apollo-client";
import { GET_PALETTE_LIST, PaletteListResponse } from "@/query/palette";
import { PaletteCard } from "../components/palette-card";
import { PaginationControls } from "@/components/pagination-controls";

export const MoreList = async ({ category, colors }: { category: string; colors: string[] }) => {
  const { data } = await getClient().query<PaletteListResponse>({
    query: GET_PALETTE_LIST,
    variables: {
      pagination: {
        pageSize: 24,
        page: 1,
      },
      filters: {
        or: [
          {
            category: { containsi: category },
          },
          {
            colors: {
              or: colors.map((color) => ({
                name: { containsi: color },
              })),
            },
          },
        ],
      },
    },
  });

  const { palettes_connection } = data;
  const { nodes: palettes, pageInfo } = palettes_connection;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 not-prose">
      {palettes.map((palette, index) => (
        <PaletteCard key={`${palette.name}-${index}`} palette={palette} />
      ))}

      <PaginationControls {...pageInfo} />
    </div>
  );
};
