import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchMovies } from "@/features";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

export function TestMoviesSearch() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchMovies />
    </QueryClientProvider>
  );
}
