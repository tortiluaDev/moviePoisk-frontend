"use client";

import { Button, useGenresQuery } from "@/shared";
import { Trash } from "lucide-react";
import styles from "@/app/(private)/profile/profile.module.scss";
import { PickPreferencesButton } from "@/shared/ui/components/PickPreferencesButton";
import { useState } from "react";
import { useUpdatePreferencesMutation } from "@/entities/user/model/hooks/useUpdatePreferencesMutation";

import { generatePickedPreferences } from "@/entities/user/model/utils/generatePickedPreferences";
import { filterOnlyNotPickedGenres } from "@/entities/user/model/utils/filterOnlyNotPickedGenres";

interface Props {
  preferences: { id: number; name: string }[];
  onRemovePreference: (genreId: string) => void;
}

export function UserPreferences({ preferences, onRemovePreference }: Props) {
  const { data: genresData, isLoading } = useGenresQuery();
  const [pickedGenres, setPickedGenres] = useState<number[]>([]);
  // тут каждое удаление/добавление = запрос на сервер, потом надо реализовать отправку изменений пакетами

  const pickedPreferences = generatePickedPreferences(
    pickedGenres,
    genresData?.data || [],
  );

  const { mutate } = useUpdatePreferencesMutation({
    preferences: [...preferences, ...pickedPreferences],
    setPickedGenres,
  });

  return (
    <div className={styles.preferencesList}>
      <p>Preferences:</p>
      <ul>
        {preferences?.map((preference) => (
          <li key={preference.id}>
            <p>{preference.name}</p>
            <Button onClick={() => onRemovePreference(preference.id + "")}>
              <Trash size={20} />
            </Button>
          </li>
        ))}
        <PickPreferencesButton
          isGenresLoading={isLoading}
          genresData={filterOnlyNotPickedGenres(
            genresData?.data || [],
            preferences,
          )}
          pickedGenresState={{ pickedGenres, setPickedGenres }}
        />
        <Button onClick={() => mutate()}>Add genres to preferences</Button>
      </ul>
    </div>
  );
}
