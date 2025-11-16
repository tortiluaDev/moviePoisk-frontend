"use client";

import { useMemo } from "react";
import { Movies } from "@/shared";

export function useSearchMovies(
  debouncedQuery: string,
  moviesData: Movies | undefined,
) {
  return useMemo(() => {
    if (debouncedQuery) {
      if (!moviesData) return [];

      return moviesData
        .filter((movie) =>
          movie.original_title
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase()),
        )
        .slice(0, 10);
    }
  }, [debouncedQuery, moviesData]);
}
