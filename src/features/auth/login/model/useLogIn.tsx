import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/shared";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@/features/auth/model/auth.types";

export function useLogIn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: (data: User) => client.POST("/auth/log-in", { body: data }),
    onSuccess: (data) => {
      if (!data?.error?.message) {
        toast.success(`Successfully login! Glad to see you again!`);
        queryClient.invalidateQueries({
          queryKey: ["user"],
          refetchType: "all",
        });
        router.replace("/");
      }
      toast.error(`Invalid email or password`);
    },
  });
}
