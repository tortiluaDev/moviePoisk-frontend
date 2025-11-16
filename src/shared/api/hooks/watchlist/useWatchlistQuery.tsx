import { useQuery } from "@tanstack/react-query";
import { client } from "@/shared";

export function useWatchlistQuery() {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: () => client.GET("/watchlists"),
  });
}
