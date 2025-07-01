import { Maker } from "./components/maker";

export default function Page() {
  return (
    <div className="py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left">Make Your Own 5-Color Color Palette</h1>
        <p className="p">
          Upload an image or start from a blank canvas. Click or drag to pick 5 colors that best express your vision. Once finished, you can save,
          share, or explore how others have interpreted the same image.
        </p>
      </div>
      <Maker />
    </div>
  );
}
