"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  indicatorData: Record<string, unknown[]>;
  setIndicatorData: React.Dispatch<React.SetStateAction<Record<string, unknown[]>>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [indicatorData, setIndicatorData] = useState<Record<string, unknown[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        selectedFilters,
        setSelectedFilters,
        selectedCountries,
        setSelectedCountries,
        indicatorData,
        setIndicatorData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
