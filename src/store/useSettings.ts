import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  theme: "light" | "dark" | "system";
  fontSize: number;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setFontSize: (size: number) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      fontSize: 18,
      setTheme: (theme) => {
        set({ theme });
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.setAttribute("data-theme", "dark");
        } else if (theme === "light") {
          document.documentElement.classList.remove("dark");
          document.documentElement.setAttribute("data-theme", "light");
        } else {
          // System preference logic could go here
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: "quran-settings",
    }
  )
);
