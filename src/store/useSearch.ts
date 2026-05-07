import { create } from "zustand";

interface SearchState {
  searchQuery: string;
  isSearchOpen: boolean;
  filteredResults: any[];
  setSearchQuery: (query: string) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  setFilteredResults: (results: any[]) => void;
  resetSearch: () => void;
}

export const useSearch = create<SearchState>((set) => ({
  searchQuery: "",
  isSearchOpen: false,
  filteredResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setFilteredResults: (results) => set({ filteredResults: results }),
  resetSearch: () => set({ searchQuery: "", isSearchOpen: false, filteredResults: [] }),
}));
