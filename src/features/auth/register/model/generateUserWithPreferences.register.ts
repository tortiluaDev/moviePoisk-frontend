import { Genre, RegisterData } from "@/features/auth/model/auth.types";

interface Data {
  genresData: Genre[] | undefined;
  data: RegisterData;
  pickedGenres: number[];
}

export function generateUserWithPreferencesRegister({
  genresData,
  data,
  pickedGenres,
}: Data) {
  const preferences: Genre[] = [];
  pickedGenres.forEach((genreId) => {
    if (genresData)
      preferences.push(genresData.find((genre) => genre.id === genreId)!);
  });
  return { ...data, preferences };
}
