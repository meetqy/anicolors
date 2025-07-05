import { ColorBaseInfo } from "@/app/palettes/[id]/color-base-info";
import { Generator } from "@/components/palette/generator";
import { Button } from "@/components/ui/button";
import { PaletteActions } from "./actions";
import { getClient } from "@/lib/apollo-client";
import { getAssetUrl } from "@/lib/utils";
import { Gallery } from "./gallery";
import { GET_PALETTE, Palette } from "@/query/palette";

const getPaletteData = async (id: string) => {
  const res = await getClient().query({
    query: GET_PALETTE,
    variables: {
      documentId: id,
    },
  });

  return res.data.palette as Palette;
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const palette = await getPaletteData(id);
  return {
    title: `Color Palette by ${palette.name} | HiColors`,
    description: `Create a custom color palette for ${palette.name} from the ${palette.category} category.`,
    openGraph: {
      images: [
        {
          url: "http://localhost:1337" + palette.image.url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const palette = await getPaletteData(id);
  const points = palette.points;
  const image = getAssetUrl(palette.image.url);

  return (
    <div className="mx-auto py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left capitalize">
          {palette.category} {palette.name} Color Palette
        </h1>
        <p className="p">
          Click and drag the color points on the image to select five colors you feel best represent <b>{palette.name}</b>. Everyone sees colors differently — express your version of this character
          through your own custom palette!
        </p>
      </div>
      <Generator initialPoints={points} initImage={image} />

      <PaletteActions id={id} palette={palette} />

      <div className="grid gap-2 grid-cols-5 max-w-screen-md mx-auto px-4 lg:px-0 mt-24">
        {points.map((item, index) => (
          <ColorBaseInfo point={item} key={index} />
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

      <Gallery palette={palette} />
    </div>
  );
}
