import Image from "next/image";
import styles from "../moviePage.module.scss";
import {
  ActionMovieButton,
  useAddToFavoritesMutation,
  useAddToWatchlistMutation,
  useDeleteFromWatchlistMutation,
  useDeleteFromFavoritesMutation,
  useFavorites,
  useWatchlist,
  useFavoritesQuery,
} from "@/shared";
import { useState } from "react";

interface Props {
  imgSrc: string;
  title: string;
  withIcons?: boolean;
  movieId: string;
}

// НУЖЕН РЕФАКТОРИНГ!!
// улучшить композицию и переиспользуемость!!
// лучше вместо withIcons по клику ноунейма выкидывать модалку со входом
export function MovieBackground({ imgSrc, title, withIcons, movieId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const { mutate: favoritesAddMutate } = useAddToFavoritesMutation();
  const { mutate: watchlistAddMutate } = useAddToWatchlistMutation();
  const { mutate: favoritesDeleteMutate } = useDeleteFromFavoritesMutation();
  const { mutate: watchlistDeleteMutate } = useDeleteFromWatchlistMutation();

  const addToFavorite = useFavorites((state) => state.addToFavorite);
  const removeFavorite = useFavorites((state) => state.removeFavorite);
  const addToWatchlist = useWatchlist((state) => state.addToWatchlist);
  const deleteFromWatchlist = useWatchlist(
    (state) => state.deleteFromWatchlist,
  );

  const { data: favoritesData } = useFavoritesQuery();
  const movie = favoritesData?.data?.find((fav) => fav.id === +movieId);

  return (
    <>
      {withIcons && (
        <div className={styles.icons}>
          <ActionMovieButton
            isActive={isFavorite}
            btnType="favorite"
            onClick={() => {
              if (isFavorite) {
                favoritesDeleteMutate(movieId);
                addToFavorite(movie!);
              } else {
                favoritesAddMutate(movieId);
                removeFavorite(movieId);
              }
              setIsFavorite((prev) => !prev);
            }}
          />
          <ActionMovieButton
            isActive={isWatchlist}
            btnType="watchlist"
            onClick={() => {
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

      <div className={styles.backdropImgWrapper}>
        <Image
          src={imgSrc}
          alt={title}
          width={1280}
          height={400}
          objectFit="cover"
          className={styles.backdropImg}
        />
      </div>
    </>
  );
}
