"use client";

import { Search } from "lucide-react";
import styles from "./search.module.scss";
import { useState } from "react";
import { useDebounce, useMoviesQuery } from "@/shared";
import Link from "next/link";
import { useSearchMovies } from "../model/hooks/useSearchMovies";

export function SearchMovies() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 150);
  const { data } = useMoviesQuery();

  const searchedMovies = useSearchMovies(debouncedQuery, data?.data);

  return (
    <div className={styles.search}>
      <p>What do you want to watch?</p>
      <div className={styles.searchField}>
        <input
          type="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className={styles.icon} />
      </div>
      {searchedMovies && searchedMovies.length > 0 && (
        <div className={styles.searchMenu} data-testid="listOfSearchedMovies">
          {searchedMovies?.map((movie) => (
            <Link
              title={movie.overview}
              href={`/movies/${movie.title}`}
              key={movie.id}
            >
              {movie.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
