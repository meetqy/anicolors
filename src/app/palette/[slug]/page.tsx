import { Generator } from "~/components/palette/generator";
import type { ColorPoint } from "~/components/palette/picker-colors";

const initialPoints: ColorPoint[] = [
  {
    id: 1,
    x: 214.875,
    y: 96.31690140845072,
    color: "rgb(255, 211, 222)",
  },
  {
    id: 2,
    x: 110.0862676056338,
    y: 113.21830985915494,
    color: "rgb(245, 169, 255)",
  },
  {
    id: 3,
    x: 223.6637323943662,
    y: 212.59859154929578,
    color: "rgb(200, 174, 238)",
  },
  {
    id: 4,
    x: 117.52288732394366,
    y: 201.7816901408451,
    color: "rgb(149, 106, 33)",
  },
  {
    id: 5,
    x: 287.2130281690141,
    y: 217.330985915493,
    color: "rgb(236, 173, 241)",
  },
];

export default function Page() {
  return (
    <div className="mx-auto py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left">Genshin Impact Dori Color Palette Maker</h1>
        <p className="p">
          Click and drag the color points on the image to select five colors you feel best represent Dori. Everyone sees colors differently — express
          your version of this character through your own custom palette!
        </p>
      </div>
      <Generator initialPoints={initialPoints} />
    </div>
  );
}
