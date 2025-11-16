import { Button, client } from "@/shared";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  deletedId: string;
}

export function DeletePreferenceButton({ deletedId, ...attributes }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
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
        queryKey: ["preferences"],
      });
    },
  });

  return (
    <Button onClick={() => mutate(deletedId)} {...attributes}>
      <Trash size={20} />
    </Button>
  );
}
