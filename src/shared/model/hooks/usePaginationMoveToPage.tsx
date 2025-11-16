"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCreateQueryString } from "@/shared";
import { usePagesContext } from "@/features";

export const usePaginationMoveToPage = (lastPage: number) => {
  const { setCurrPage } = usePagesContext();
  const createQueryString = useCreateQueryString();
  const router = useRouter();

  return useCallback(
    (moveDirection: "forward" | "back" | number) =>
      setCurrPage((prev) => {
        if (moveDirection === "forward") {
          if (prev !== lastPage) {
            router.push(
              "/?" + createQueryString("page", (prev + 1).toString()),
            );
            return prev + 1;
          }
          return lastPage;
        } else if (moveDirection === "back") {
          if (prev !== 1) {
            router.push(
              "/?" + createQueryString("page", (prev - 1).toString()),
            );
            return prev - 1;
          }
          return 1;
        } else {
          setCurrPage(moveDirection);
          router.push(
            "/?" + createQueryString("page", moveDirection.toString()),
          );
          return moveDirection;
        }
      }),
    [createQueryString, lastPage, router, setCurrPage],
  );
};
