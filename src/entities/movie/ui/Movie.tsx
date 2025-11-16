"use client";

import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import {
  ActionMovieButton,
  ImageSkeletonLoader,
  useDeleteFromFavoritesMutation,
  useAddToFavoritesMutation,
  useAddToWatchlistMutation,
  useDeleteFromWatchlistMutation,
  useFavoritesQuery,
  useWatchlist,
} from "@/shared";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/shared";

interface MovieProps extends HTMLAttributes<HTMLDivElement> {
  imgUrl: string;
  title: string;
  withIcons?: boolean;
  isEssential?: boolean;
  movieId: string;
}

// НУЖЕН РЕФАКТОРИНГ!!
// улучшить композицию и переиспользуемость!!
export function Movie({
  imgUrl,
  title,
  className,
  withIcons = true,
  isEssential = false,
  movieId,
}: MovieProps) {
  const router = useRouter();

  const addToFavorite = useFavorites((state) => state.addToFavorite);
  const removeFavorite = useFavorites((state) => state.removeFavorite);
  const addToWatchlist = useWatchlist((state) => state.addToWatchlist);
  const deleteFromWatchlist = useWatchlist(
    (state) => state.deleteFromWatchlist,
  );

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isWatchlist, setIsWatchlist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: favoritesData } = useFavoritesQuery();
  const movie = favoritesData?.data?.find((fav) => fav.id === +movieId);
  const { mutate: favoritesAddMutate } = useAddToFavoritesMutation();
  const { mutate: watchlistAddMutate } = useAddToWatchlistMutation();
  const { mutate: favoritesDeleteMutate } = useDeleteFromFavoritesMutation();
  const { mutate: watchlistDeleteMutate } = useDeleteFromWatchlistMutation();

  return (
    <div
      className={className}
      style={{ position: "relative" }}
      onClick={() => router.push(`/movies/${title}`)}
    >
      {isLoading && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <ImageSkeletonLoader />
        </div>
      )}
      <Image
        width={600}
        height={750}
        alt={title}
        src={imgUrl}
        priority={isEssential}
        loading={isEssential ? "eager" : "lazy"}
        onLoad={() => setIsLoading(false)}
      />
      {withIcons && (
        <div>
          <ActionMovieButton
            isActive={isFavorite}
            btnType="favorite"
            onClick={(event) => {
              event.stopPropagation();
              if (isFavorite) {
                favoritesDeleteMutate(movieId);
                addToFavorite(movie!);
              } else {
                favoritesAddMutate(movieId);
                removeFavorite(movieId);
              }
              // перенести в onSuccess мутации
              setIsFavorite((prev) => !prev);
            }}
          />
          <ActionMovieButton
            isActive={isWatchlist}
            btnType="watchlist"
            onClick={(event) => {
              event.stopPropagation();
              if (isWatchlist) {
                watchlistDeleteMutate(movieId);
                addToWatchlist(movie!);
              } else {
                watchlistAddMutate(movieId);
                deleteFromWatchlist(movieId);
              }
              setIsWatchlist((prev) => !prev);
            }}
          />
        </div>
      )}
    </div>
  );
}
