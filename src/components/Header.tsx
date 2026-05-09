"use client";

import { useQuran } from "@/store/useQuran";
import { useSearch } from "@/store/useSearch";
import { useThemeStore } from "@/store/useThemeStore";
import React, { useState, useEffect, Fragment } from "react";
import { Menu, Heart } from "lucide-react";
import MobileDrawer from "./MobileDrawer";

interface IconBtnProps {
  icon: string;
  onClick?: () => void;
}

const IconBtn: React.FC<IconBtnProps> = ({ icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-on-surface-variant hover:text-primary transition p-2 rounded-full hover:bg-surface-container-high flex items-center justify-center shrink-0"
    >
      <span className="material-symbols-outlined text-[22px]">{icon}</span>
    </button>
  );
};

interface HeaderProps {
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const { surahs } = useQuran();
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } =
    useSearch();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <Fragment>
      <header className="sticky top-0 z-30 flex items-center justify-between w-full border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md px-4 md:px-0">
        {/* Left Section: Menu & Branding */}
        <div className="flex items-center gap-3 md:w-[320px] md:px-6 py-4 md:border-r md:border-outline-variant/30">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="md:hidden p-2 -ml-2 text-on-surface-variant hover:text-primary transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-none text-on-surface">
              Quran Mazid
            </h1>
            <p className="hidden md:block text-[10px] text-on-surface-variant/50 font-medium uppercase mt-1.5 tracking-wider">
              Read, Study, and Learn
            </p>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-6 px-2 md:px-6 py-3">
          {/* Search Bar Logic */}
          <div className="flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-surface-container-high rounded-full px-3 py-1.5 animate-in slide-in-from-right-5 duration-300">
                <span className="material-symbols-outlined text-sm text-on-surface-variant/50 mr-2">
                  search
                </span>
                <input
                  autoFocus
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-28 sm:w-40 md:w-64 text-on-surface placeholder:text-on-surface-variant/30"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setInputValue("");
                    setSearchQuery("");
                  }}
                  className="material-symbols-outlined text-sm text-on-surface-variant/50 hover:text-error ml-2"
                >
                  close
                </button>
              </div>
            ) : (
              <IconBtn icon="search" onClick={() => setIsSearchOpen(true)} />
            )}
          </div>

          {/* Tools Group */}
          <div className="flex items-center gap-1 md:gap-3 pr-2 md:pr-6 md:border-r md:border-outline-variant/20">
            <IconBtn
              icon={theme === "dark" ? "light_mode" : "dark_mode"}
              onClick={toggleTheme}
            />
            <IconBtn icon="settings" onClick={onSettingsClick} />
          </div>

          {/* Support Button (Hidden on small mobile) */}
          <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-4 md:px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg shadow-primary/20 active:scale-95">
            <span className="hidden md:inline">Support Us</span>
            <Heart size={14} fill="currentColor" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Integration */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Fragment>
  );
};

export default Header;
