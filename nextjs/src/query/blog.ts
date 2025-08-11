import { gql } from "@apollo/client";
import type { Palette } from "./palette";

export const GET_BLOG = gql`
  query Query($documentId: ID!, $pagination: PaginationArg) {
    blog(documentId: $documentId) {
      title
      field
      description
      cover {
        url
      }
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

export const GET_BLOG_LIST = gql`
  query Query($pagination: PaginationArg, $sort: [String]) {
    blogs(pagination: $pagination, sort: $sort) {
      documentId
      title
      description
      cover {
        url
      }
      publishedAt
    }
  }
`;

export type BlogListResponse = {
  blogs: {
    documentId: string;
    title: string;
    description: string;
    cover: { url: string };
    publishedAt: string;
  }[];
};
