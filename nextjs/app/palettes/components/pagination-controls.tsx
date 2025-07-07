"use client";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export const PaginationControls = ({ currentPage, pageSize, totalItems }: PaginationControlsProps) => {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/palettes?${params.toString()}`;
  };

  const hasPrevious = currentPage > 1;
  const hasNext = totalItems >= pageSize;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={hasPrevious ? createPageUrl(currentPage - 1) : undefined} className={!hasPrevious ? "pointer-events-none opacity-50" : ""} />
        </PaginationItem>

        {getVisiblePages().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={createPageUrl(page as number)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={hasNext ? createPageUrl(currentPage + 1) : undefined} className={!hasNext ? "pointer-events-none opacity-50" : ""} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
