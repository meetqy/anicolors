import { ColorPoint } from "@/components/palette/picker-colors";
import { gql } from "@apollo/client";

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
