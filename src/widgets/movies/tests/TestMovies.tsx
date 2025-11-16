import { FiltersContextProvider, PagesContextProvider } from "@/features";
import { Movies } from "@/widgets";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

export function TestMovies() {
  const setCurrPage = vi.fn();
  const setFilter = vi.fn();

  return (
    <QueryClientProvider client={queryClient}>
      <PagesContextProvider value={{ currPage: 1, setCurrPage }}>
        <FiltersContextProvider
          value={{ filter: { id: -1, name: "all" }, setFilter }}
        >
          <Movies />
        </FiltersContextProvider>
      </PagesContextProvider>
    </QueryClientProvider>
  );
}
