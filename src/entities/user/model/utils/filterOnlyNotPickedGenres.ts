type GenresData = { id: number; name: string }[];

export function filterOnlyNotPickedGenres(
  allGenres: GenresData,
  preferences: GenresData,
) {
  return allGenres.filter(
    (genre) => !preferences.some((preference) => preference.id === genre.id),
  );
}
