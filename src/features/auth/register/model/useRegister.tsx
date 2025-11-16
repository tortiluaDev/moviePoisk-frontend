import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/shared";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserRegister } from "@/features/auth/model/auth.types";

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: (data: UserRegister) => client.POST("/auth", { body: data }),
    onSuccess: (data) => {
      if (!data?.error?.message) {
        toast.success(
          `Successfully register! You\`re welcome, ${data?.data?.name || "Anonymous"}`,
        );
        router.replace("/");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      }

      toast.error(`Error: ${data?.error?.message}`);
    },
  });
}
