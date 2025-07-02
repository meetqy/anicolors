import { Maker } from "./components/maker";

export default function Page() {
  return (
    <div className="py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left">Create Your Own 5-Color Palette</h1>
        <p className="p">Pick 5 colors from your image to create a custom palette. Save and share your color combinations with the world.</p>
      </div>
      <Maker />
    </div>
  );
}
