import { gql } from "@apollo/client";
import { type PaletteListResponse } from "./palette";

export const GET_CATEGORY_BY_SLUG = gql`
  query Categories(
    $filters: CategoryFiltersInput
    $palettesConnectionFilters2: PaletteFiltersInput
    $pagination: PaginationArg
  ) {
    categories(filters: $filters) {
      documentId
      name
      slug
      cover {
        url
      }
    }
    palettes_connection(
      filters: $palettesConnectionFilters2
      pagination: $pagination
    ) {
      nodes {
        likes
        name
        categoryExtend {
          name
          slug
        }
        points
        type
        image {
          url
        }
        cover {
          url
          width
          height
        }
        documentId
        publishedAt
        createdAt
      }
      pageInfo {
        total
        pageCount
        page
        pageSize
      }
    }
  }
`;

export type GetCategoryBySlugResponse = {
  palettes_connection: PaletteListResponse["palettes_connection"];
  categories: {
    documentId: string;
    name: string;
    slug: string;
    cover: { url: string };
  }[];
};
