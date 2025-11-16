import { z } from "zod";

export const AuthSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Not valid email",
    )
    .nonempty("Email is required"),
  password: z
    .string()
    .trim()
    .regex(
      /(?=^.{6,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password must contain 8 or more characters, including one uppercase letter, one lowercase letter, numbers, and special characters",
    )
    .nonempty("Password is required"),
});

export const RegisterSchema = AuthSchema.extend({
  name: z
    .string()
    .trim()
    .regex(/[a-z]/i, "Name must contain letters")
    .min(1)
    .max(30),
});

export const LoginSchema = AuthSchema.extend({});

export type Genre = {
  id: number;
  name: string;
};

type AuthData = z.infer<typeof AuthSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;

export interface User extends AuthData {
  preferences: Genre[];
}

export interface UserRegister extends RegisterData, User {}
