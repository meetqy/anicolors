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
      createdAt
      cover {
        url
      }
    }
  }
`;

export type Palette = {
  name: string;
  category: string;
  createdAt: string;
  image: { url: string };
  likes: number;
  points: ColorPoint[];
  cover: { url: string };
  gallery: { url: string; width: number; height: number; name: string }[];
};

/**
 * Fetches a list of palettes with their basic information.
 */
export const GET_PALETTE_LIST = gql`
  query Palettes($filters: PaletteFiltersInput, $pagination: PaginationArg, $sort: [String]) {
    palettes(filters: $filters, pagination: $pagination, sort: $sort) {
      likes
      name
      category
      points
      image {
        url
      }
      documentId
      createdAt
    }
    palettes_connection {
      pageInfo {
        total
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
  createdAt: string;
};

export type PaletteListResponse = {
  palettes: PaletteListItem[];
  palettes_connection: {
    pageInfo: { total: number };
  };
};
