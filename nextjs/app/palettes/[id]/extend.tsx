import { Palette } from "@/query/palette";

export const Extend = ({ palette }: { palette: Palette }) => {
  if (!palette.extend) {
    return null;
  }

  return (
    <div className="bg-muted/50 rounded-md px-4">
      <h2 className="pt-8">💡 Color Meanings</h2>
      <ul>
        {palette.extend.colorMeanings.map((meaning, index) => (
          <li key={index}>{meaning}</li>
        ))}
      </ul>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div>
          <h2 className="text-green-600">🎨 Suitable Use</h2>
          <ul>
            {palette.extend.suitableUse.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-red-600">🚫 Unsuitable Use</h2>
          <ul>
            {palette.extend.unsuitableUse.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
