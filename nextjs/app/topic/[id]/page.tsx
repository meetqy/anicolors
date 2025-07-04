import { CardColorBase } from "@/components/card/color/base";
import { Generator } from "@/components/palette/generator";
import { Button } from "@/components/ui/button";
import { PaletteActions } from "./actions";
import { getTopicData } from "./fetch";
import { CardPalette1 } from "@/components/card/palette/1";
import { CardPalette2 } from "@/components/card/palette/2";

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const topic = await getTopicData(id);
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
  const topic = await getTopicData(id);
  const points = topic.palettes[0].points;
  const image = "http://localhost:1337" + topic.image.url;

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
      <Generator initialPoints={points} initImage={image} />

      <PaletteActions topic={topic} />

      <div className="grid gap-2 grid-cols-5 max-w-screen-md mx-auto px-4 lg:px-0 mt-24">
        {points.map((item, index) => (
          <CardColorBase point={item} key={index} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 max-w-screen-md mx-auto px-4 lg:px-0 mt-12 justify-center">
        {points.map((item, index) => (
          <Button variant="outline" className="rounded-full" key={index} size="sm">
            <div className="size-4 rounded-full" style={{ backgroundColor: item.color }}></div>
            {item.name}
          </Button>
        ))}
      </div>

      <div className="max-w-screen-lg prose mx-auto px-4 lg:px-0 mt-12">
        <h2>Palette Gallery</h2>

        <div className="not-prose grid gap-4">
          <CardPalette1 points={points} image={image} />
          <CardPalette2 points={points} image={image} />
        </div>
      </div>
    </div>
  );
}
