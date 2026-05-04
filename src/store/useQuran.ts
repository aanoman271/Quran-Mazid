import { create } from "zustand";
import { Surah } from "@/lib/api";

interface QuranState {
  selectedSurah: number;
  surahs: Surah[];
  setSelectedSurah: (id: number) => void;
  setSurahs: (surahs: Surah[]) => void;
}

export const useQuran = create<QuranState>((set) => ({
  selectedSurah: 1,
  surahs: [],
  setSelectedSurah: (id) => set({ selectedSurah: id }),
  setSurahs: (surahs) => set({ surahs }),
}));
