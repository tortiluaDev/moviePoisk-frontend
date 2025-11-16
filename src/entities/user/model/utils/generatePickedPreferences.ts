type GenresData = { id: number; name: string }[];

export function generatePickedPreferences(
  pickedGenresIds: number[],
  allGenres: GenresData,
) {
  const pickedPreferences = [] as { id: number; name: string }[];

  if (pickedGenresIds.length < 1) return [];

  for (const preferenceId of pickedGenresIds) {
    allGenres.forEach((genre) => {
      if (genre.id === preferenceId) pickedPreferences.push(genre);
    });
  }

  return pickedPreferences;
}
