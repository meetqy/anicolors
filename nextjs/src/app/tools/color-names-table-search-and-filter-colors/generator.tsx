import { colornames } from "color-name-list";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export const Generator = () => {
  // Optionally, cast colornames to Color[] if needed
  return (
    <div className="w-full overflow-y-auto">
      <DataTable columns={columns} data={colornames} />
    </div>
  );
};
