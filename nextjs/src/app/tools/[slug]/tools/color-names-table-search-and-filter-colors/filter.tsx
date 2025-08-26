"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { hexToCategory } from "./utils";
import type { Color } from "./columns";
import { useState, useMemo, useCallback, useEffect } from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 构建 category 索引，避免每次都全量遍历
  const { allCategories } = useMemo(() => {
    const index: Record<string, Color[]> = {};
    data.forEach((item) => {
      const cat = hexToCategory(item.hex);
      if (cat && cat !== "Other") {
        if (!index[cat]) index[cat] = [];
        index[cat].push(item);
      }
    });
    const cats = Object.keys(index).sort();
    return { allCategories: cats, categoryIndex: index };
  }, [data]);

  // 初始化时根据 searchParams.name 设置默认选中
  useEffect(() => {
    const urlCategory = searchParams.get("name");
    if (urlCategory) {
      // 查找匹配的分类（忽略大小写）
      const matchedCategory = allCategories.find(
        (cat) => cat.toLowerCase() === urlCategory.toLowerCase(),
      );
      if (matchedCategory && matchedCategory !== color) {
        setColor(matchedCategory);
      }
    } else if (color !== "") {
      // URL 中没有分类参数，但当前有选中分类，则重置
      setColor("");
    }
  }, [searchParams, allCategories, color, setColor]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  // 只展示前5个，剩下的放到 more
  const shownCategories = allCategories.slice(0, 5);
  const moreCategories = allCategories.slice(5);

  // 创建带有 category 参数的 URL - 使用 useCallback 缓存
  const createCategoryUrl = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category) {
        params.set("name", category.toLowerCase());
      } else {
        params.delete("name");
      }
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname],
  );

  // 处理分类点击 - 使用 useCallback 缓存
  const handleCategoryClick = useCallback(
    (category: string, e: React.MouseEvent) => {
      e.preventDefault(); // 阻止默认跳转
      setColor(category);
      // 使用 requestAnimationFrame 延迟 URL 更新，避免阻塞 UI
      requestAnimationFrame(() => {
        window.history.pushState({}, "", createCategoryUrl(category));
      });
    },
    [setColor, createCategoryUrl],
  );

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
        <Link
          href={createCategoryUrl("")}
          onClick={(e) => handleCategoryClick("", e)}
        >
          <Button variant={color === "" ? "default" : "outline"} size="sm">
            All
          </Button>
        </Link>
        {shownCategories.map((c) => (
          <Link
            key={c}
            href={createCategoryUrl(c)}
            onClick={(e) => handleCategoryClick(c, e)}
          >
            <Button variant={color === c ? "default" : "outline"} size="sm">
              {c}
            </Button>
          </Link>
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
                  <Link
                    key={c}
                    href={createCategoryUrl(c)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(c, e);
                      setPopoverOpen(false);
                    }}
                  >
                    <Button
                      variant={color === c ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {c}
                    </Button>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
