"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "@/shared/api/client";

export function useMoviesByPageQuery(page: string) {
  return useQuery({
    queryKey: ["movies", page],
    queryFn: ({ signal }) =>
      client.GET("/movies/{page}", {
        params: {
          path: {
            page,
          },
        },
        signal,
      }),
    placeholderData: keepPreviousData,
  });
}
