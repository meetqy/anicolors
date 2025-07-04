import { getClient } from "@/lib/apollo-client";
import { GET_TOPIC, Topic } from "@/query/topic";

export const getTopicData = async (id: string) => {
  const res = await getClient().query({
    query: GET_TOPIC,
    variables: {
      documentId: id,
    },
  });

  return res.data.topic as Topic;
};
