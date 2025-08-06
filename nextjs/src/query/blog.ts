import { gql } from "@apollo/client";
import type { Palette } from "./palette";

export const GET_BLOG = gql`
  query Query($documentId: ID!, $pagination: PaginationArg) {
    blog(documentId: $documentId) {
      title
      field
      description
      cover
      palettes(pagination: $pagination) {
        documentId
        extend
        name
        image {
          url
        }
        avatar {
          url
        }
      }
    }
  }
`;

export type BlogResponse = {
  blog: {
    title: string;
    field: string;
    description: string;
    cover: { url: string };
    palettes: {
      documentId: string;
      name: string;
      extend?: Palette["extend"];
      image: { url: string };
      avatar: { url: string };
    }[];
  };
};
