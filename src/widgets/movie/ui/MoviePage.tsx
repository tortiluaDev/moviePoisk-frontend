"use client";

import {
  useGenresQuery,
  useMeQuery,
  useMoviesQuery,
  useTokenRefresh,
} from "@/shared";
import { usePathname, useRouter } from "next/navigation";
import styles from "./moviePage.module.scss";
import { MovieBackground } from "@/widgets/movie/ui/components/MovieBackground";
import { MovieInfo } from "@/widgets/movie/ui/components/MovieInfo";
import { MovieAbout } from "@/widgets/movie/ui/components/MovieAbout";
import { convertPathnameToTitle } from "@/widgets/movie/model/convertPathnameToTitle";
import { getDefaultSrcUrls } from "@/widgets/movie/model/getDefaultSrcUrls";
import { getMovieWithGenre } from "@/widgets/movie/model/getMovieWithGenre";

export function Movie() {
  const router = useRouter();
  const { data, isError, isLoading } = useMoviesQuery();
  const { data: genresData } = useGenresQuery();
  const { data: userData } = useMeQuery();

  const movieTitle = convertPathnameToTitle(usePathname());

  useTokenRefresh();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  const { movie, err } = getMovieWithGenre({
    movies: data?.data || "",
    genres: genresData?.data || "",
    movieTitle,
  });

  if (err || !movie?.id) {
    setTimeout(() => router.replace("/"), 1000);
    return <p>Movie not found. Please wait for redirect to home page</p>;
  }

  const { posterSrc, backdropSrc } = getDefaultSrcUrls({
    backdrop: movie.backdrop_path,
    poster: movie.poster_path,
  });

  return (
    <>
      <div className={styles.wrapper}>
        <MovieBackground
          withIcons={!!userData?.data}
          imgSrc={backdropSrc}
          title={movie.title}
          movieId={movie.id + ""}
        />

        <MovieInfo
          imgSrc={posterSrc}
          title={movie.title}
          genre={movie.mainGenre || "Genre not defined"}
          releaseDate={movie.release_date}
          voteAvg={movie.vote_average}
        />

        <MovieAbout overview={movie.overview} />
      </div>
    </>
  );
}
