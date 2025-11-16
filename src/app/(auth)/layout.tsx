import { PropsWithChildren } from "react";
import styles from "./authLayout.module.scss";

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className={styles.layout}>{children}</div>;
}
