import { gql } from "@apollo/client";

export const GET_TOOL = gql`
  query Tool($filters: ToolFiltersInput) {
    tools(filters: $filters) {
      slug
      name
      keywords
      description
      cover {
        url
      }
    }
  }
`;

export type ToolResponse = {
  tools: {
    slug: string;
    name: string;
    keywords: string;
    description: string;
    cover: { url: string };
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
