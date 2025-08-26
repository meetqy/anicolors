"use client";
import { colornames } from "color-name-list";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { FilterBar } from "./_components/filter";
import { useState, useMemo } from "react";
import { hexToCategory } from "./utils";

export const ColorNameTableSearchGenerator = () => {
  const [search, setSearch] = useState("");
  const [color, setColor] = useState("");

  // 构建 category 索引，加速筛选
  const { categoryIndex } = useMemo(() => {
    const index: Record<string, typeof colornames> = {};
    colornames.forEach((item) => {
      const cat = hexToCategory(item.hex);
      if (cat && cat !== "Other") {
        if (!index[cat]) index[cat] = [];
        index[cat].push(item);
      }
    });
    return { categoryIndex: index };
  }, []);

  // 高效过滤
  const filteredData = useMemo(() => {
    const arr = color ? categoryIndex[color] || [] : colornames;
    return arr.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.hex.toLowerCase().includes(search.toLowerCase()),
    );
  }, [color, search, categoryIndex]);

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
