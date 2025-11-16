import { UserPreferences } from "@/entities";
import { useDeletePreferenceMutation } from "@/features/deleteUserPreference/model/useDeletePreferenceMutation";

interface Props {
  preferences: { id: number; name: string }[];
}

export function ManagePreferences({ preferences }: Props) {
  const { mutate } = useDeletePreferenceMutation();

  const handleRemovePreference = (genreId: string) => mutate(genreId + "");

  return (
    <UserPreferences
      preferences={preferences}
      onRemovePreference={handleRemovePreference}
    />
  );
}
