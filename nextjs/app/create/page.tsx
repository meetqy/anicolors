import { Metadata } from "next";
import { Maker } from "./components/maker";

export const metadata: Metadata = {
  title: "Create Your Own 5-Color Palette",
  description: "Pick 5 colors from your image to create a custom palette. Save and share your color combinations with the world.",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;
  return (
    <div className="py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left">Create Your Own 5-Color Palette</h1>
        <p className="p">Pick 5 colors from your image to create a custom palette. Save and share your color combinations with the world.</p>
      </div>
      <Maker topicId={id} />
    </div>
  );
}
