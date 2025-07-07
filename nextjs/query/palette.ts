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
  query Palettes($pagination: PaginationArg, $sort: [String]) {
    palettes(pagination: $pagination, sort: $sort) {
      likes
      cover {
        url
      }
      name
      category
      points
    }
  }
`;

export type PaletteList = {
  name: string;
  category: string;
  likes: number;
  cover: { url: string };
  points: ColorPoint[];
}[];
