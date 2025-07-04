import { ColorPoint } from "@/components/palette/picker-colors";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export type Topic = {
  name: string;
  category: string;
  createdAt: string;
  image: { url: string };
  like: number;
  palettes: { points: ColorPoint[] }[];
};

export const getData = async (id: string) => {
  const res = await getClient().query({
    query: gql`
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
    `,
    variables: {
      documentId: id,
    },
  });

  return res.data.topic as Topic;
};
