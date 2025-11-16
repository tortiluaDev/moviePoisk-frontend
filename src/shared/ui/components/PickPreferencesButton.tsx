import styles from "./auth.module.scss";
import { Button } from "@/shared";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import cn from "clsx";
import { Genre } from "@/features/auth/model/auth.types";

interface Props {
  isGenresLoading: boolean;
  genresData: Genre[] | undefined;
  pickedGenresState: {
    pickedGenres: number[];
    setPickedGenres: Dispatch<SetStateAction<number[]>>;
  };
}

export function PickPreferencesButton({
  genresData,
  isGenresLoading,
  pickedGenresState,
}: Props) {
  const [isGenresModalOpen, setIsGenresModalOpen] = useState(false);
  const { pickedGenres, setPickedGenres } = pickedGenresState;

  return (
    <div className={styles.wrap}>
      <Button
        className={styles.getPreferencesBtn}
        onClick={() => setIsGenresModalOpen((prev) => !prev)}
      >
        Pick your preferences
        {isGenresModalOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Button>
      {isGenresModalOpen && (
        <div className={styles.preferences}>
          {isGenresLoading && <p>Loading genres...</p>}
          {genresData?.map((genre) => (
            <Button
              className={cn(
                styles.preference,
                pickedGenres.includes(genre.id) && styles.active,
              )}
              key={genre.id}
              onClick={() =>
                setPickedGenres((prev) => {
                  if (prev.includes(genre.id))
                    return prev.filter((id) => id !== genre.id);
                  return [...prev, genre.id];
                })
              }
            >
              {genre.name}
            </Button>
          ))}
          {pickedGenres.length > 0 && (
            <p>Picked {pickedGenres.length} genres</p>
          )}
        </div>
      )}
    </div>
  );
}
