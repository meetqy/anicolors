"use client";
import { useState, useEffect, useCallback } from "react";

interface UseToggleLikeProps {
  paletteId: string;
  initialLikes: number;
}

export const useToggleLike = ({
  paletteId,
  initialLikes,
}: UseToggleLikeProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if palette is liked on mount
  useEffect(() => {
    const likedPalettes = JSON.parse(
      localStorage.getItem("likedPalettes") ?? "[]",
    );
    setIsLiked(likedPalettes.includes(paletteId));
  }, [paletteId]);

  const toggleLike = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    const wasLiked = isLiked;

    try {
      // Optimistic update
      setIsLiked(!wasLiked);
      setLikes((prev) => (wasLiked ? prev - 1 : prev + 1));

      // Update localStorage
      const likedPalettes = JSON.parse(
        localStorage.getItem("likedPalettes") ?? "[]",
      );
      const updatedLikes = wasLiked
        ? likedPalettes.filter((id: string) => id !== paletteId)
        : [...likedPalettes, paletteId];

      localStorage.setItem("likedPalettes", JSON.stringify(updatedLikes));

      // Only sync with server when liking (not when unliking)
      if (!wasLiked) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/palettes/${paletteId}/toggleLike`,
          {
            method: "POST",
          },
        );
      }
    } catch (error) {
      // Revert on error
      setIsLiked(wasLiked);
      setLikes((prev) => (wasLiked ? prev + 1 : prev - 1));
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLoading(false);
    }
  }, [paletteId, isLiked, isLoading]);

  return {
    likes,
    isLiked,
    isLoading,
    toggleLike,
  };
};
