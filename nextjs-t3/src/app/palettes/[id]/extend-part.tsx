import { type Palette } from "@/query/palette";
import { partsConstant } from "@/lib/utils";

export const ExtendPart = ({ palette }: { palette: Palette }) => {
  const extend = palette.extend;

  if (!extend) return null;

  return (
    <div className="prose mx-auto mt-12 max-w-screen-lg px-4 lg:px-0">
      <table>
        <thead>
          <tr>
            <th>Part</th>
            <th>ColorName</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {partsConstant.map((item) => {
            const part = extend.parts?.[item];
            if (!part) return null;

            return (
              <tr key={item}>
                <td className="capitalize">{item}</td>
                <td>{part?.name}</td>
                <td className="flex items-center gap-1 font-mono uppercase">
                  <div
                    className="size-4 rounded-full"
                    style={{ backgroundColor: part?.color }}
                  ></div>
                  {part?.color}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
