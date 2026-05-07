"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeInitializer() {
    const theme = useThemeStore((s) => s.theme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            const root = window.document.documentElement;
            if (theme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }
    }, [theme, mounted]);

    if (!mounted) return null;

    return null;
}