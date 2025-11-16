import { HTMLAttributes } from "react";
import Link from "next/link";
import styles from "./changeAuthMode.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  currMode: "login" | "register";
}

export function ChangeAuthMode({ currMode, ...attributes }: Props) {
  const answer = currMode === "login" ? "No account?" : "Already registered?";
  const newMode = currMode === "login" ? "register" : "login";

  return (
    <div {...attributes} className={styles.message}>
      <p>{answer}</p>
      <Link href={`/${newMode}`} replace>
        {newMode}
      </Link>
    </div>
  );
}
