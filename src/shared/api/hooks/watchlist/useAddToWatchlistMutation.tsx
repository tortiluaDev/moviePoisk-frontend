import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/shared";

export function useAddToWatchlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      client.POST("/watchlists/{id}", {
        params: {
          path: {
            id,
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "watchlist"],
      });
    },
  });
}
