import { create } from "zustand";
import { Movie } from "@/shared";
import { persist } from "zustand/middleware";

type Favorite = Movie;

interface Store {
  favorites: Favorite[];
  addToFavorite: (newFavorite: Favorite) => void;
  removeFavorite: (id: string) => void;
}

export const useFavorites = create<Store>()(
  persist(
    (set) => ({
      favorites: [] as Favorite[],
      addToFavorite: (newFavorite) =>
        set((state) => ({ favorites: [...state.favorites, newFavorite] })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites.filter((fav) => fav.id !== +id)],
        })),
    }),
    {
      name: "Favorites",
    },
  ),
);
