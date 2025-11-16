import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

export function Button({ children, ...attributes }: Props) {
  return (
    <button {...attributes} type="button">
      {children}
    </button>
  );
}
