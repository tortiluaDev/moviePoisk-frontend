import { InputHTMLAttributes } from "react";
import styles from "./auth.module.scss";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}

export function Field<T extends FieldValues>({
  errorMessage,
  name,
  register,
  ...attributes
}: Props<T>) {
  return (
    <>
      {errorMessage.length !== 0 && <span>{errorMessage}</span>}
      <div className={styles.field}>
        <input id={name} {...attributes} {...register(name)} />
        <label htmlFor={name}>{name.toUpperCase()}</label>
      </div>
    </>
  );
}
