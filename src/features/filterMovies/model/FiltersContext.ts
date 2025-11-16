"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface Filter {
  id: number;
  name: string;
}

interface FiltersCtx {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const FiltersContext = createContext<FiltersCtx | null>(null);

export const useFiltersContext = () => {
  const data = useContext(FiltersContext);

  if (!data) {
    throw new Error(
      "Can not 'useFiltersContext' outside of the 'FiltersProvider'",
    );
  }

  return data;
};

export const FiltersContextProvider = FiltersContext.Provider;
