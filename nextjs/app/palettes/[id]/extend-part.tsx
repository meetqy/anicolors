import { Palette } from "@/query/palette";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const _parts = ["eye", "hair"];

export const ExtendPart = ({ palette }: { palette: Palette }) => {
  const extend = palette.extend;

  if (!extend) return null;

  return (
    <div className="mx-auto max-w-screen-lg mt-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Part</TableHead>
            <TableHead>Color Name</TableHead>
            <TableHead>Hex</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {_parts.map((item) => {
            const part = extend[item as keyof typeof extend] as { name: string; color: string };

            return (
              <TableRow key={item}>
                <TableCell className="capitalize">{item}</TableCell>
                <TableCell>{part?.name}</TableCell>
                <TableCell>{part?.color}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
