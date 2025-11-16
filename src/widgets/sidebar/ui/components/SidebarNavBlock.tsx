import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: "Home" | "Profile" | "Favorites" | "Watchlist";
}

export function SidebarNavBlock({ children, name }: Props) {
  return (
    <div>
      <Link
        href={`/${name.toLowerCase() === "home" ? "" : name.toLowerCase()}`}
        title={name}
      >
        {name}
        {children}
      </Link>
    </div>
  );
}
