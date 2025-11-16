"use client";

import styles from "./filters.module.scss";
import cn from "clsx";
import { Button, useGenresQuery, useHorizontallyScroll } from "@/shared";
import { useFiltersContext } from "@/features";
import { useRef } from "react";

export function Filters() {
  const { filter, setFilter } = useFiltersContext();
  const { data } = useGenresQuery();
  const sliderRef = useRef(null);
  useHorizontallyScroll(sliderRef);

  return (
    <div className={styles.filters} ref={sliderRef}>
      <Button
        onClick={() => setFilter({ id: -1, name: "all" })}
        className={cn(filter.name === "all" && styles.active)}
      >
        All
      </Button>
      {data &&
        data.data?.map((genre) => (
          <Button
            key={genre.id}
            onClick={() => setFilter(genre)}
            className={cn(filter?.id === genre.id && styles.active)}
          >
            {genre.name}
          </Button>
        ))}
    </div>
  );
}
