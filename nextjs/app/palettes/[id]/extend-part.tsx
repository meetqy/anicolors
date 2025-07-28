import { Palette } from "@/query/palette";
import { partsConstant } from "@/lib/utils";

export const ExtendPart = ({ palette }: { palette: Palette }) => {
  const extend = palette.extend;

  if (!extend) return null;

  return (
    <div className="mx-auto prose max-w-screen-lg mt-12">
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
                <td className="uppercase font-mono flex gap-1 items-center">
                  <div className="size-4 rounded-full" style={{ backgroundColor: part?.color }}></div>
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
