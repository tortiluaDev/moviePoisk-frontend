"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/shared";
import { Dispatch, SetStateAction } from "react";

type PreferencesForUpdate = { id: number; name: string }[];

interface Props {
  preferences: PreferencesForUpdate;
  setPickedGenres: Dispatch<SetStateAction<number[]>>;
}

export function useUpdatePreferencesMutation({
  preferences,
  setPickedGenres,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      client.PATCH("/preferences", {
        body: { preferences },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setPickedGenres([]);
    },
  });
}
