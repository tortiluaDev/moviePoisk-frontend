"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface PagesContextData {
  currPage: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
}

const PagesContext = createContext<PagesContextData | null>(null);

export const usePagesContext = () => {
  const data = useContext(PagesContext);

  if (!data) {
    throw new Error("Can not 'usePagesContext' outside of the 'PagesProvider'");
  }

  return data;
};

export const PagesContextProvider = PagesContext.Provider;
