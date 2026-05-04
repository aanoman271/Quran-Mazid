"use client";

import React from "react";
import LogoIcon from "../shared/LogoIcon";

interface NavItemProps {
  icon: string;
  label?: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-3 w-full cursor-pointer transition ${active
        ? "text-primary border-l-2 border-primary bg-primary/10"
        : "text-outline hover:text-primary hover:bg-surface-container-high"
        }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label && <span className="text-xs mt-1">{label}</span>}
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-20 h-screen bg-surface-container-lowest border-r border-outline-variant fixed">
      <div className="flex flex-col items-center py-4 gap-8">
        <div className="text-primary font-bold text-xl"><LogoIcon /></div>

        <nav className="flex flex-col gap-6 items-center">
          <NavItem icon="menu_book" label="Read" active />
          <NavItem icon="format_list_bulleted" label="Surahs" />
          <NavItem icon="bookmark" label="Bookmarks" />
          <NavItem icon="search" label="Search" />
        </nav>

        <div className="mt-auto pb-6">
          <NavItem icon="settings" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
