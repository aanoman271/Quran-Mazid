"use client";

import { useQuran } from "@/store/useQuran";
import { useSearch } from "@/store/useSearch";
import { useThemeStore } from "@/store/useThemeStore";
import React, { useState, useEffect, useRef } from "react";

interface IconBtnProps {
  icon: string;
  onClick?: () => void;
}


const IconBtn: React.FC<IconBtnProps> = ({ icon, onClick }) => {
  return (
    <button onClick={onClick} className="text-on-surface-variant hover:text-primary transition p-1 rounded-full hover:bg-surface-container-high flex items-center justify-center">
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
};

interface HeaderProps {
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const { selectedSurah, surahs } = useQuran();
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch();
  const [inputValue, setInputValue] = useState(searchQuery);
  const currentSurah = surahs.find((s) => s.number === selectedSurah);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  // Sync internal state if search is reset externally
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const theme = useThemeStore((s) => s.theme);
  return (
    <header className="grid grid-cols-[320px_1fr] border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md">
      {/* Column 1: Branding (Aligned with SurahList) */}
      <div className="px-6 py-4 border-r border-outline-variant/30 flex flex-col justify-center">
        <h1 className="text-headline-md transition-colors font-bold tracking-tight leading-none">Quran Mazid</h1>
        <p className="text-[10px] text-on-surface-variant/50 font-medium uppercase mt-1.5 tracking-wider">Read, Study, and Learn the Quran</p>
      </div>

      {/* Column 2: Reader Info & Actions (Aligned with Reader Area) */}
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Info section (currently hidden by user) */}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 pr-6 border-r border-outline-variant/20">
            <div className="flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-surface-container-high rounded-full px-3 py-1 animate-in fade-in zoom-in duration-200">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant/50 mr-2">search</span>
                  <input
                    autoFocus
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search ayah..."
                    className="bg-transparent border-none outline-none text-xs w-32 md:w-48 text-on-surface placeholder:text-on-surface-variant/30"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setInputValue("");
                      setSearchQuery("");
                    }}
                    className="material-symbols-outlined text-sm text-on-surface-variant/50 hover:text-error transition-colors ml-2"
                  >
                    close
                  </button>
                </div>
              ) : (
                <IconBtn icon="search" onClick={() => setIsSearchOpen(true)} />
              )}
            </div>

            <IconBtn
              icon={theme === "dark" ? "light_mode" : "dark_mode"}
              onClick={toggleTheme}
            />
            <IconBtn icon="settings" onClick={onSettingsClick} />
          </div>

          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg shadow-primary/20">
            <span>Support Us</span>
            <span className="material-symbols-outlined text-xs">favorite</span>
          </button>
        </div>
      </div>
    </header>
  );
};


export default Header;
