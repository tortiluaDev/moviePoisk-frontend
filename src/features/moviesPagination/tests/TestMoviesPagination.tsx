import {
  MoviesPagination,
  PagesContextProvider,
} from "@/features/moviesPagination";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

export function TestMoviesPagination() {
  const [currPage, setCurrPage] = useState(1);
  return (
    <QueryClientProvider client={queryClient}>
      <PagesContextProvider value={{ currPage, setCurrPage }}>
        <MoviesPagination />
      </PagesContextProvider>
    </QueryClientProvider>
  );
}
