import { PropsWithChildren } from "react";
import { Content } from "@/shared/ui/layout/content/Content";
import { NavigatePanel } from "@/shared";
import { Sidebar } from "@/widgets";
import styles from "./layout.module.scss";

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Sidebar />
      <div className={styles.desktopLayout}>
        <div className={styles.sidebarPlace} />
        <main>
          <Content>{children}</Content>
        </main>
      </div>
      <NavigatePanel />
    </>
  );
}
