"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/shared";

export function useGenresQuery() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => client.GET("/genres"),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
