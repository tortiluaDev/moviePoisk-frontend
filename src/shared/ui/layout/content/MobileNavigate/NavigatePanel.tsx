"use client";
import { Bookmark, Home, Star, User } from "lucide-react";
import Link from "next/link";
import styles from "./navigate.module.scss";
import { useState } from "react";
import cn from "clsx";

export function NavigatePanel() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <header className={styles.mobileHeader}>
      <nav className={styles.navBar}>
        <Link
          href="/"
          className={cn(activeTab === 1 && styles.active)}
          onClick={() => setActiveTab(1)}
        >
          <Home />
          Home
        </Link>
        <Link
          href="/favorites"
          className={cn(activeTab === 2 && styles.active)}
          onClick={() => setActiveTab(2)}
        >
          <Star />
          Favorites
        </Link>
        <Link
          href="/watchlist"
          className={cn(activeTab === 3 && styles.active)}
          onClick={() => setActiveTab(3)}
        >
          <Bookmark />
          Watch list
        </Link>
        <Link
          href="/profile"
          className={cn(activeTab === 4 && styles.active)}
          onClick={() => setActiveTab(4)}
        >
          <User />
          Profile
        </Link>
      </nav>
    </header>
  );
}
