import { SidebarNavBlock } from "./SidebarNavBlock";
import { BookHeart, BookMarked, House, User } from "lucide-react";

const NAV_TABS = {
  home: "Home",
  profile: "Profile",
  favorites: "Favorites",
  watchlist: "Watchlist",
} as const;

export function SidebarNav() {
  return (
    <nav>
      <SidebarNavBlock name={NAV_TABS.home}>
        <House />
      </SidebarNavBlock>

      <SidebarNavBlock name={NAV_TABS.profile}>
        <User />
      </SidebarNavBlock>

      <SidebarNavBlock name={NAV_TABS.favorites}>
        <BookHeart />
      </SidebarNavBlock>

      <SidebarNavBlock name={NAV_TABS.watchlist}>
        <BookMarked />
      </SidebarNavBlock>
    </nav>
  );
}
