import { Palette } from "@/query/palette";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { partsConstant } from "@/lib/utils";

export const ExtendPart = ({ palette }: { palette: Palette }) => {
  const extend = palette.extend;

  if (!extend) return null;

  return (
    <div className="mx-auto max-w-screen-lg mt-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Part</TableHead>
            <TableHead>ColorName</TableHead>
            <TableHead>Hex</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partsConstant.map((item) => {
            const part = extend.parts?.[item];
            if (!part) return null;

            return (
              <TableRow key={item}>
                <TableCell className="capitalize">{item}</TableCell>
                <TableCell>{part?.name}</TableCell>
                <TableCell className="uppercase">{part?.color}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
