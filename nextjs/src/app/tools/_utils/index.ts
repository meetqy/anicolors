import { getClient } from "@/lib/apollo-client";
import { GET_TOOL, type ToolResponse } from "@/query/tool";

export const getToolData = async (slug: string) => {
  const res = await getClient().query<ToolResponse>({
    query: GET_TOOL,
    variables: {
      filters: {
        slug: { eq: slug },
      },
    },
  });

  return res.data.tools[0]!;
};
