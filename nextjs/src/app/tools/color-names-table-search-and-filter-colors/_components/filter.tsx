"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { hexToCategory } from "../utils";
import type { Color } from "./columns";
import { useState } from "react";
import { EllipsisVerticalIcon } from "lucide-react";

interface FilterProps {
  search: string;
  setSearch: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  data: Color[];
}

export function FilterBar({
  search,
  setSearch,
  color,
  setColor,
  data,
}: FilterProps) {
  // 动态获取所有出现过的分类，保证按钮和数据一致
  const allCategories = Array.from(
    new Set(
      data
        .map((item) => hexToCategory(item.hex))
        .filter((c) => c && c !== "Other"),
    ),
  ).sort();

  const [popoverOpen, setPopoverOpen] = useState(false);

  // 只展示前5个，剩下的放到 more
  const shownCategories = allCategories.slice(0, 5);
  const moreCategories = allCategories.slice(5);

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* 搜索框 */}
      <Input
        className="max-w-xs"
        placeholder="Search by name or HEX..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 筛选按钮 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={color === "" ? "default" : "outline"}
          size="sm"
          onClick={() => setColor("")}
        >
          All
        </Button>
        {shownCategories.map((c) => (
          <Button
            key={c}
            variant={color === c ? "default" : "outline"}
            size="sm"
            onClick={() => setColor(c)}
          >
            {c}
          </Button>
        ))}
        {moreCategories.length > 0 && (
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={moreCategories.includes(color) ? "default" : "outline"}
                size="sm"
              >
                {color && moreCategories.includes(color) ? color : "More"}{" "}
                <EllipsisVerticalIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-64 w-56 overflow-y-auto p-2">
              <div className="grid grid-cols-2 gap-2">
                {moreCategories.map((c) => (
                  <Button
                    key={c}
                    variant={color === c ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setColor(c);
                      setPopoverOpen(false);
                    }}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
