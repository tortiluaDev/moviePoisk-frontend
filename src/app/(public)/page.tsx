"use client";
import { Movies, TrendsSlider } from "@/widgets";
import {
  Filters,
  FiltersContextProvider,
  PagesContextProvider,
  SearchMovies,
} from "@/features";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTokenRefresh } from "@/shared/api";

export default function Home() {
  const page = Number(useSearchParams().toString().slice(5));
  const [currPage, setCurrPage] = useState(page || 1);
  const [filter, setFilter] = useState({ id: -1, name: "all" });
  useTokenRefresh();

  return (
    <PagesContextProvider value={{ currPage, setCurrPage }}>
      <FiltersContextProvider value={{ filter, setFilter }}>
        <div>
          <SearchMovies />
          <TrendsSlider />
          <Filters />
          <Movies />
        </div>
      </FiltersContextProvider>
    </PagesContextProvider>
  );
}
