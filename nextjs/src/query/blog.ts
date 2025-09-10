import { gql } from "@apollo/client";
import type { Palette } from "./palette";
import type { ToolListResponse } from "./tool";

export const GET_BLOG = gql`
  query Query($filters: BlogFiltersInput, $pagination: PaginationArg) {
    blogs(filters: $filters, pagination: $pagination) {
      title
      field
      documentId
      description
      useTypes
      markdown
      content
      cover {
        url
      }
      tools {
        slug
        name
        description
        cover {
          url
        }
        documentId
      }
      blogs {
        title
        slug
        description
        cover {
          url
        }
        publishedAt
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
  blogs: {
    documentId: string;
    title: string;
    field: string;
    description: string;
    cover: { url: string };
    tools: ToolListResponse["tools"];
    blogs: BlogListResponse["blogs"];
    useTypes: string;
    markdown: string;
    content: string;
    palettes: {
      documentId: string;
      name: string;
      extend?: Palette["extend"];
      image: { url: string };
      avatar: { url: string };
    }[];
  }[];
};

export const GET_BLOG_LIST = gql`
  query Query($pagination: PaginationArg, $sort: [String]) {
    blogs(pagination: $pagination, sort: $sort) {
      title
      slug
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
    title: string;
    slug: string;
    description: string;
    cover: { url: string };
    publishedAt: string;
  }[];
};
