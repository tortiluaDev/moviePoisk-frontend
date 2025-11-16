import { PropsWithChildren } from "react";
import styles from "./content.module.scss";

export function Content({ children }: PropsWithChildren) {
  return <section className={styles.wrapper}>{children}</section>;
}
