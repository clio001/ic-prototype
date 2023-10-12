"use client";

import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext({
  searchTerm: "",
  setSearchTerm: () => null,
});

export const GlobalContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("Afrika");

  return (
    <GlobalContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
