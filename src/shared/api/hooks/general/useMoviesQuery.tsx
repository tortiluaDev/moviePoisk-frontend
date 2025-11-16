"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/shared";

export function useMoviesQuery() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: () => client.GET("/movies"),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
