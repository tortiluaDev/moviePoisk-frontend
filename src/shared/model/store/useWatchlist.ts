import { create } from "zustand";
import { Movie } from "@/shared";
import { persist } from "zustand/middleware";

type Watchlist = Movie;

interface Store {
  watchlist: Watchlist[];
  addToWatchlist: (newMovie: Watchlist) => void;
  deleteFromWatchlist: (id: string) => void;
}

export const useWatchlist = create<Store>()(
  persist(
    (set) => ({
      watchlist: [],
      addToWatchlist: (newMovie) =>
        set((state) => ({ watchlist: [...state.watchlist, newMovie] })),
      deleteFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((fav) => fav.id !== +id),
        })),
    }),
    {
      name: "Watchlist",
    },
  ),
);
