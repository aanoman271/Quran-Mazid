"use client";

import React, { useEffect, useState } from "react";
import { fetchSurahs } from "@/lib/api";
import { useQuran } from "@/store/useQuran";

interface SurahCardProps {
  index: number;
  name: string;
  arabic: string;
  active?: boolean;
  type: string;
  ayahs: number;
  englishNameTranslation: string
  onClick: () => void;
}
const SurahCard: React.FC<SurahCardProps> = ({ index, name, arabic, active, type, ayahs, englishNameTranslation, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group  px-2 py-4  rounded-xl cursor-pointer transition-all duration-300 border   ${active
        ? "bg-primary/10  border-primary/50 shadow-sm"
        : "bg-surface-container-low/50  border-primary/50  hover:bg-primary/10 border-primary/50 shadow-sm"
        }`}
    >
      <div className="flex justify-between items-center px-2">
        <div className="flex gap-4 items-center">
          <div className={`w-8 h-8 flex items-center justify-center rounded-lg transform rotate-45 transition-colors ${active ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'} group-hover:bg-primary group-hover:text-on-primary`}>
            <span className="-rotate-45 font-bold text-xs">{index}</span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-sm tracking-tight">{name}</h4>
            <p className="text-[10px] text-on-surface-variant/50 font-medium uppercase tracking-wider">{englishNameTranslation}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-quran">{arabic}</p>
        </div>
      </div>
    </div>
  );
};

const SurahList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { selectedSurah, setSelectedSurah, surahs, setSurahs } = useQuran();
  useEffect(() => {
    if (surahs.length === 0) {
      fetchSurahs().then((data) => {
        setSurahs(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [surahs.length, setSurahs]);

  return (
    <section className="hidden lg:flex flex-col w-[320px] border-r border-outline-variant bg-surface-container-low h-screen">
      <div className="p-4 space-y-6">
        {/* <div className="flex items-center justify-between">
          <h2 className="text-headline-md text-primary font-bold">Quran Mazid</h2>
        </div> */}

        {/* Navigation Tabs */}
        <div className="flex bg-surface-container-highest/50 p-1 rounded-xl">
          <button className="flex-1 py-2 text-sm font-bold rounded-lg bg-surface-container-low text-primary shadow-sm">Surah</button>
          <button className="flex-1 py-2 text-sm font-medium text-on-surface-variant/60 hover:text-on-surface transition-colors">Juz</button>
          <button className="flex-1 py-2 text-sm font-medium text-on-surface-variant/60 hover:text-on-surface transition-colors">Page</button>
        </div>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">search</span>
          <input
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/30 outline-none transition-all duration-200"
            placeholder="Search Surah"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          surahs.map((surah) => (
            <SurahCard
              key={surah.number}
              index={surah.number}
              name={surah.englishName}
              arabic={surah.name}
              type={surah.revelationType}
              ayahs={surah.numberOfAyahs}
              active={surah.number === selectedSurah}
              englishNameTranslation={surah.englishNameTranslation}
              onClick={() => setSelectedSurah(surah.number)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default SurahList;
