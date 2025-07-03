import { CardColorBase } from "@/components/card/color/base";
import { Generator } from "@/components/palette/generator";
import { ColorPoint } from "@/components/palette/picker-colors";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const getData = async (id: string) => {
  const res = await getClient().query({
    query: gql`
      query ExampleQuery($documentId: ID!) {
        topic(documentId: $documentId) {
          image {
            url
          }
          name
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

  return res.data.topic as {
    name: string;
    category: string;
    image: { url: string };
    palettes: { points: ColorPoint[] }[];
  };
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const topic = await getData(id);
  return {
    title: `Color Palette by ${topic.name} | HiColors`,
    description: `Create a custom color palette for ${topic.name} from the ${topic.category} category.`,
    openGraph: {
      images: [
        {
          url: "http://localhost:1337" + topic.image.url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = await getData(id);
  const points = topic.palettes[0].points;

  return (
    <div className="mx-auto py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left capitalize">
          {topic.category} {topic.name} Color Palette Maker
        </h1>
        <p className="p">
          Click and drag the color points on the image to select five colors you feel best represent <b>{topic.name}</b>. Everyone sees colors differently — express your version of this character
          through your own custom palette!
        </p>
      </div>
      <Generator initialPoints={points} initImage={"http://localhost:1337" + topic.image.url} />

      <div className="prose mx-auto mt-12 max-w-screen-xl px-4 xl:px-0">
        <h2>Colors</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 not-prose">
          {points.map((item, index) => (
            <CardColorBase point={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
