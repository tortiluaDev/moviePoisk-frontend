"use client";

import styles from "./sidebar.module.scss";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useState } from "react";
import cn from "clsx";
import { useAnimatedMount } from "@/widgets/sidebar/model/useAnimatedMount";
import { SidebarNav } from "./components/SidebarNav";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAnimating, isRendering } = useAnimatedMount({
    isVisible: isOpen,
    duration: 200,
  });

  return (
    <aside className={cn(styles.sidebar, isAnimating && styles.openSidebar)}>
      {!isRendering && (
        <CircleChevronRight
          className={styles.toggleSidebar}
          onClick={() => setIsOpen(true)}
        />
      )}
      {isRendering && (
        <>
          <h1>MoviePoisk</h1>
          <CircleChevronLeft
            className={styles.toggleSidebar}
            onClick={() => setIsOpen(false)}
          />
          <SidebarNav />
        </>
      )}
    </aside>
  );
}
