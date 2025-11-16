import { useQuery } from "@tanstack/react-query";
import { client } from "@/shared";

export function useMeQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => client.GET("/user"),
    retry: false,
  });
}
