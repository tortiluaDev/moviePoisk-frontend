"use client";

import { client } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => client.POST("/auth/logout"),
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ["user"],
      });
    },
  });
}
