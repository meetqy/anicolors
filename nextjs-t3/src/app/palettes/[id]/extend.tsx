import { type Palette } from "@/query/palette";

export const Extend = ({ palette }: { palette: Palette }) => {
  const extend = palette.extend;

  if (!extend) {
    return null;
  }

  return (
    <div className="bg-muted/50 rounded-md px-4">
      {extend.colorMeanings && extend.colorMeanings.length > 0 && (
        <>
          <h2 className="pt-8">💡 Color Meanings</h2>
          <ul>
            {extend.colorMeanings?.map((meaning, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{
                  __html: meaning.replace(/.*?\)/, "<b>$&</b>"),
                }}
              />
            ))}
          </ul>
        </>
      )}
      {extend.suitableUse &&
        extend.suitableUse.length > 0 &&
        extend.unsuitableUse &&
        extend.unsuitableUse.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <h2 className="text-green-600">🎨 Suitable Use</h2>
              <ul>
                {extend.suitableUse?.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-red-600">🚫 Unsuitable Use</h2>
              <ul>
                {extend.unsuitableUse?.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </div>
  );
};
