"use client";

import styles from "@/shared/ui/components/auth.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useGenresQuery } from "@/shared";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/shared/ui/components/Field";
import { PickPreferencesButton } from "@/shared/ui/components/PickPreferencesButton";
import { RegisterData, RegisterSchema } from "@/features/auth/model/auth.types";
import { generateUserWithPreferencesRegister } from "@/features/auth/register/model/generateUserWithPreferences.register";
import { useRegister } from "@/features/auth/register/model/useRegister";
import { ChangeAuthMode } from "@/features/auth/ui/ChangeAuthMode";

export function RegisterForm() {
  const [pickedGenres, setPickedGenres] = useState<number[]>([]);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useRegister();
  const { data: genresData, isLoading } = useGenresQuery();

  const onSubmit = (data: RegisterData) => {
    const userData = generateUserWithPreferencesRegister({
      data: data,
      genresData: genresData?.data,
      pickedGenres,
    });
    registerMutation.mutate(userData);
    setPickedGenres([]);
    reset();
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <Button
        className={styles.exit}
        title="Leave from the page"
        onClick={() => router.push("/")}
      >
        <X />
      </Button>
      <p className={styles.title}>Register</p>

      <Field
        errorMessage={errors.name?.message || ""}
        name="name"
        register={register}
        type="text"
      />

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

      <PickPreferencesButton
        isGenresLoading={isLoading}
        genresData={genresData?.data}
        pickedGenresState={{ pickedGenres, setPickedGenres }}
      />

      <ChangeAuthMode currMode="register" />

      <button>Register now</button>
    </form>
  );
}
