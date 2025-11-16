import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/shared";

export function useDeletePreferenceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      client.DELETE("/preferences/{id}", {
        params: {
          path: {
            id: id,
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}
