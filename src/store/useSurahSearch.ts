import { create } from 'zustand';

interface SurahSearchState {
  searchQuery: string;
  filteredSurahs: any[]; // Surah objects from API
  setSearchQuery: (query: string) => void;
  setFilteredSurahs: (results: any[]) => void;
  resetSearch: () => void;
}

export const useSurahSearch = create<SurahSearchState>((set) => ({
  searchQuery: '',
  filteredSurahs: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilteredSurahs: (results) => set({ filteredSurahs: results }),
  resetSearch: () => set({ searchQuery: '', filteredSurahs: [] }),
}));
