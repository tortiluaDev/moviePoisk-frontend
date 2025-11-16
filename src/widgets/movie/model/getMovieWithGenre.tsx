import { Movie } from "@/shared";

interface Genre {
  id: number;
  name: string;
}

interface Data {
  movies: Movie[] | string;
  genres: Genre[] | string;
  movieTitle: string;
}

export function getMovieWithGenre({ movies, genres, movieTitle }: Data) {
  if (typeof movies === "string" || typeof genres === "string")
    return { err: true };

  const movie = movies.find((movie) => movie.title === movieTitle);
  const mainGenre = genres.find(
    (genre) => genre.id === movie?.genre_ids[0],
  )?.name;

  if (!movie) return { err: true };

  return {
    movie: { ...movie, mainGenre },
    err: false,
  };
}
