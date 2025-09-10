import { gql } from "@apollo/client";
import type { BlogListResponse } from "./blog";

export const GET_TOOL = gql`
  query Tool($filters: ToolFiltersInput) {
    tools(filters: $filters) {
      documentId
      slug
      name
      keywords
      description
      blogs {
        title
        slug
        description
        cover {
          url
        }
        publishedAt
      }
      cover {
        url
      }
    }
  }
`;

export type ToolResponse = {
  tools: {
    documentId: string;
    slug: string;
    name: string;
    keywords: string;
    description: string;
    cover: { url: string };
    blogs: BlogListResponse["blogs"];
  }[];
};

export const GET_TOOL_LIST = gql`
  query Tools($sort: [String], $pagination: PaginationArg) {
    tools(sort: $sort, pagination: $pagination) {
      slug
      name
      description
      cover {
        url
      }
      documentId
    }
  }
`;

export type ToolListResponse = {
  tools: {
    documentId: string;
    slug: string;
    name: string;
    description: string;
    cover: { url: string };
    publishedAt: string;
  }[];
};
