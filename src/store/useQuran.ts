import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Surah } from "@/lib/api";

interface QuranState {
  selectedSurah: number;
  surahs: Surah[];
  arabicSize: number;
  translationSize: number;
  arabicFont: string;
  setSelectedSurah: (id: number) => void;
  setSurahs: (surahs: Surah[]) => void;
  setArabicSize: (size: number) => void;
  setTranslationSize: (size: number) => void;
  setArabicFont: (font: string) => void;
}

export const useQuran = create<QuranState>()(
  persist(
    (set) => ({
      selectedSurah: 1,
      surahs: [],
      arabicSize: 38,
      translationSize: 16,
      arabicFont: "KFGQPC Uthman Taha Naskh",
      setSelectedSurah: (id) => set({ selectedSurah: id }),
      setSurahs: (surahs) => set({ surahs }),
      setArabicSize: (size) => set({ arabicSize: size }),
      setTranslationSize: (size) => set({ translationSize: size }),
      setArabicFont: (font) => set({ arabicFont: font }),
    }),
    {
      name: "quran-settings",
      partialize: (state) => ({ 
        selectedSurah: state.selectedSurah, 
        arabicSize: state.arabicSize, 
        translationSize: state.translationSize,
        arabicFont: state.arabicFont,
      }),
    }
  )
);

