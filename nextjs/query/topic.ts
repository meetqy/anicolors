import { ColorPoint } from "@/components/palette/picker-colors";
import { gql } from "@apollo/client";

export const GET_TOPIC = gql`
  query ExampleQuery($documentId: ID!) {
    topic(documentId: $documentId) {
      image {
        url
      }
      name
      like
      createdAt
      category
      palettes {
        points
      }
    }
  }
`;

export type Topic = {
  name: string;
  category: string;
  createdAt: string;
  image: { url: string };
  like: number;
  palettes: { points: ColorPoint[] }[];
};
