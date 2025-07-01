import { Generator } from "~/app/components/generator";

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
      <Generator />
    </div>
  );
}
