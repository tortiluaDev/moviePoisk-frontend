"use client";

import styles from "@/shared/ui/components/auth.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Field } from "@/shared/ui/components/Field";
import { LoginData, LoginSchema } from "@/features/auth/model/auth.types";
import { useLogIn } from "@/features/auth/login/model/useLogIn";
import { ChangeAuthMode } from "@/features/auth/ui/ChangeAuthMode";

export function LogInForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useLogIn();

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate({ ...data, preferences: [] });
    reset();
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <Button
        className={styles.exit}
        title="Leave from the page"
        onClick={() => router.replace("/")}
      >
        <X />
      </Button>
      <p className={styles.title}>Log in</p>

      <Field
        errorMessage={errors.email?.message || ""}
        name="email"
        register={register}
        type="email"
      />

      <Field
        errorMessage={errors.password?.message || ""}
        name="password"
        register={register}
        type="password"
      />

      <ChangeAuthMode currMode="login" />

      <button>Log In</button>
    </form>
  );
}
