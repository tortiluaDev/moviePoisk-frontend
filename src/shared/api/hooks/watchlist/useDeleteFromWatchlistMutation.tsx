import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/shared";

export function useDeleteFromWatchlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      client.DELETE("/watchlists/{id}", {
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
