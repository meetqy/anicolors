import { ColorPoint } from "@/components/palette/picker-colors";
import { gql } from "@apollo/client";

export const GET_PALETTE = gql`
  query Palette($documentId: ID!) {
    palette(documentId: $documentId) {
      category
      gallery {
        width
        url
        height
      }
      likes
      image {
        url
      }
      points
      name
      createdAt
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
  gallery: { url: string; width: number; height: number }[];
};
