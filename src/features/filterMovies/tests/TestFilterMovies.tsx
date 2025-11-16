import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Filters, FiltersContextProvider } from "@/features";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

export function TestFilterMovies() {
  const [filter, setFilter] = useState({ id: -1, name: "all" });
  return (
    <QueryClientProvider client={queryClient}>
      <FiltersContextProvider value={{ filter, setFilter }}>
        <Filters />
      </FiltersContextProvider>
    </QueryClientProvider>
  );
}
