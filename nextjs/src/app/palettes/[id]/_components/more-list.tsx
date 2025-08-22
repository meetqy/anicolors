"use client";

import { useQuery } from "@apollo/client";
import {
  GET_PALETTE_LIST,
  type PaletteListResponse,
  type PaletteListItem,
} from "@/query/palette";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useIntersectionObserver } from "usehooks-ts";
import { Columns } from "@/components/columns";

export const MoreList = ({
  category,
  colors,
}: {
  category: string;
  colors: string[];
}) => {
  const [page, setPage] = useState(1);
  const [allPalettes, setAllPalettes] = useState<PaletteListItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, error, data, fetchMore } = useQuery<PaletteListResponse>(
    GET_PALETTE_LIST,
    {
      variables: {
        pagination: {
          pageSize: 24,
          page: 1,
        },
        sort: ["publishedAt:desc"],
        filters: {
          or: [
            {
              colors: {
                or: colors.map((color) => ({
                  name: { containsi: color },
                })),
              },
            },
            { category: { containsi: category } },
          ],
        },
      },
    },
  );

  // Handle initial data loading
  useEffect(() => {
    if (data?.palettes_connection) {
      setAllPalettes(data.palettes_connection.nodes);
      setHasMore(1 < data.palettes_connection.pageInfo.pageCount);
    }
  }, [data]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || isLoadingMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const { data: newData } = await fetchMore({
        variables: {
          pagination: {
            pageSize: 24,
            page: nextPage,
          },
        },
      });

      if (newData?.palettes_connection?.nodes) {
        setAllPalettes((prev) => [
          ...prev,
          ...newData.palettes_connection.nodes,
        ]);
        setPage(nextPage);
        setHasMore(nextPage < newData.palettes_connection.pageInfo.pageCount);
      }
    } catch (error) {
      console.error("Error loading more palettes:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, loading, isLoadingMore, fetchMore, page]);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
  });

  // Trigger load more when the element is visible
  useEffect(() => {
    if (isIntersecting && hasMore && !loading && !isLoadingMore) {
      loadMore().catch((error) => {
        console.error("Error in intersection observer loadMore:", error);
      });
    }
  }, [isIntersecting, hasMore, loading, isLoadingMore, loadMore]);

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading palettes: {error.message}
      </div>
    );
  }

  return (
    <>
      <h2>Explore More Color Palettes</h2>
      <div className="not-prose">
        <Columns palettes={allPalettes} />

        {(loading || isLoadingMore) && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading more palettes...</span>
          </div>
        )}

        {!loading && !isLoadingMore && hasMore && (
          <div className="flex justify-center py-8">
            <Button onClick={loadMore} variant="outline">
              Load More
            </Button>
          </div>
        )}

        {!hasMore && allPalettes.length > 0 && (
          <div className="text-muted-foreground py-8 text-center">
            No more palettes to load
          </div>
        )}

        {/* Intersection Observer Target */}
        <div ref={ref} className="h-4" />
      </div>
    </>
  );
};
