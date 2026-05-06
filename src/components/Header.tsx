"use client";

import { useQuran } from "@/store/useQuran";

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
  const currentSurah = surahs.find((s) => s.number === selectedSurah);

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
            <IconBtn icon="search" />
            <IconBtn icon="dark_mode" />
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
