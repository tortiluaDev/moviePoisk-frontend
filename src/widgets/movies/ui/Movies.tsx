"use client";
import { Movie } from "@/entities";
import styles from "./movies.module.scss";
import { convertImgPathToUrl, useMeQuery } from "@/shared";
import { MoviesPagination, useFiltersContext } from "@/features";
import { useSearchParams } from "next/navigation";
import { useMoviesByPageQuery } from "@/widgets/movies/model/useMoviesQuery";

export function Movies() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { filter } = useFiltersContext();

  const { data: userData } = useMeQuery();
  const { data, isLoading, isError } = useMoviesByPageQuery(page);

  if (isError) return <p>Error loading movies. Please reload the page.</p>;

  return (
    <div className={styles.movies}>
      <div className={styles.listOfMovies}>
        {isLoading && <p>Loading...</p>}
        {data?.data?.map(
          (movie) =>
            movie.poster_path &&
            (movie.genre_ids.includes(filter.id) || filter.name === "all") && (
              <Movie
                key={movie.id}
                movieId={movie.id + ""}
                imgUrl={convertImgPathToUrl({
                  path: movie?.poster_path as string,
                  size: "s",
                  type: "poster",
                })}
                title={movie.title}
                className={styles.movie}
                withIcons={!!userData?.data}
              />
            ),
        )}
      </div>
      <MoviesPagination />
    </div>
  );
}
