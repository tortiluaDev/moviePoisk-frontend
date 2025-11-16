import { useQuery } from "@tanstack/react-query";
import { client } from "@/shared";

export function useFavoritesQuery() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => client.GET("/favorites"),
  });
}
