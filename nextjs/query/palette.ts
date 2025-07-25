import { ColorPoint } from "@/components/palette/picker-colors";
import { gql } from "@apollo/client";

/**
 * Fetches a specific palette by its document ID, including its details and gallery images.
 */
export const GET_PALETTE = gql`
  query Palette($documentId: ID!, $pagination: PaginationArg) {
    palette(documentId: $documentId) {
      category
      gallery(pagination: $pagination) {
        width
        url
        height
        name
      }
      likes
      image {
        url
      }
      points
      name
      publishedAt
      cover {
        url
      }
      extend
    }
  }
`;

export type Palette = {
  name: string;
  category: string;
  publishedAt: string;
  image: { url: string };
  likes: number;
  extend?: {
    suitableUse: string[];
    colorMeanings: string[];
    unsuitableUse: string[];
  };
  points: ColorPoint[];
  cover: { url: string };
  gallery: { url: string; width: number; height: number; name: string }[];
};

/**
 * Fetches a list of palettes with their basic information.
 */
export const GET_PALETTE_LIST = gql`
  query Palettes_connection($pagination: PaginationArg, $sort: [String], $filters: PaletteFiltersInput) {
    palettes_connection(pagination: $pagination, sort: $sort, filters: $filters) {
      nodes {
        likes
        name
        category
        points
        image {
          url
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

export type PaletteListItem = {
  name: string;
  category: string;
  likes: number;
  image: { url: string };
  points: ColorPoint[];
  documentId: string;
  publishedAt: string;
  createdAt: string;
};

export type PaletteListResponse = {
  palettes_connection: {
    nodes: PaletteListItem[];
    pageInfo: PageInfo;
  };
};

export type PageInfo = {
  total: number;
  pageCount: number;
  page: number;
  pageSize: number;
};
