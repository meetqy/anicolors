"use client";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export const PaginationControls = ({ currentPage, totalPages }: PaginationControlsProps) => {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

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

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={hasPrevious ? `?page=${currentPage - 1}` : undefined} className={!hasPrevious ? "pointer-events-none opacity-50" : ""} />
        </PaginationItem>

        {getVisiblePages().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={`?page=${page}`} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={hasNext ? `?page=${currentPage + 1}` : undefined} className={!hasNext ? "pointer-events-none opacity-50" : ""} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
