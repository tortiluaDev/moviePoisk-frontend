import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/shared";

export function useDeleteFromFavoritesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      client.DELETE("/favorites/{id}", {
        params: {
          path: {
            id,
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "favorites"],
      });
    },
  });
}
