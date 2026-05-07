// store/useThemeStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
    theme: Theme;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            theme: "dark",

            toggleTheme: () => {
                const newTheme =
                    get().theme === "dark" ? "light" : "dark";

                set({ theme: newTheme });

                document.documentElement.classList.toggle(
                    "dark",
                    newTheme === "dark"
                );
            },
        }),
        {
            name: "theme-storage",
        }
    )
);