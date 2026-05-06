"use client";

/**
 * Sidebar Navigation Component
 * Provides vertical navigation for the Quran Mazid application.
 */

import React from "react";
import LogoIcon from "../shared/LogoIcon";

interface NavItemProps {
  icon: string;
  label?: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-4 w-full cursor-pointer transition-all duration-200 ${active
        ? "text-primary bg-primary/10 border-r-4 border-primary"
        : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
        }`}
    >
      <span className="material-symbols-outlined text-2xl">{icon}</span>
      {label && <span className="text-nav-item mt-1">{label}</span>}
    </div>
  );
};

interface SidebarProps {
  onSettingsClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSettingsClick }) => {
  return (
    <aside className="hidden md:flex flex-col w-20 h-screen bg-surface-container-lowest border-r border-outline-variant">
      <div className="flex flex-col items-center py-4 gap-8 h-full">
        <div className="text-primary font-bold text-xl"><LogoIcon /></div>

        <nav className="flex flex-col gap-6 items-center w-full">
          <NavItem icon="menu_book" label="Read" active />
          <NavItem icon="format_list_bulleted" label="Surahs" />
          <NavItem icon="bookmark" label="Bookmarks" />
          <NavItem icon="search" label="Search" />
        </nav>

        <div className="mt-auto pb-6 w-full">
          <NavItem icon="settings" onClick={onSettingsClick} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

