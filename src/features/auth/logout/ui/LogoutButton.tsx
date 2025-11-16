"use client";

import { Button } from "@/shared";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ButtonHTMLAttributes } from "react";
import { useLogoutMutation } from "@/features/auth/logout/model/useLogoutMutation";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function LogoutButton({ className }: Props) {
  const router = useRouter();

  const { mutate } = useLogoutMutation();

  return (
    <Button
      onClick={() => {
        router.push("/");
        toast.success("Successfully logout");
        mutate();
      }}
      className={className}
    >
      Log Out
    </Button>
  );
}
