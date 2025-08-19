"use client";
import { colornames } from "color-name-list";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { FilterBar } from "./_components/filter";
import { useState } from "react";
import { hexToCategory } from "./utils";

export const Generator = () => {
  const [search, setSearch] = useState("");
  const [color, setColor] = useState("");
  const filteredData = colornames.filter(
    (item) =>
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.hex.toLowerCase().includes(search.toLowerCase())) &&
      (color === "" || hexToCategory(item.hex) === color),
  );
  // Optionally, cast colornames to Color[] if needed
  return (
    <div className="w-full">
      <FilterBar
        search={search}
        setSearch={setSearch}
        color={color}
        setColor={setColor}
        data={colornames}
      />

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};
