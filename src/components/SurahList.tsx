"use client";

import React, { useEffect, useState } from "react";
import { fetchSurahs, Surah } from "@/lib/api";
import { useQuran } from "@/store/useQuran";

interface SurahCardProps {
  index: number;
  name: string;
  arabic: string;
  active?: boolean;
  type: string;
  ayahs: number;
  onClick: () => void;
}

const SurahCard: React.FC<SurahCardProps> = ({ index, name, arabic, active, type, ayahs, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition ${
        active
          ? "bg-primary/20 border border-primary/20"
          : "hover:bg-surface-container-high"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold">
            {index}
          </div>
          <div>
            <h4 className="font-semibold text-on-surface">{name}</h4>
            <p className="text-xs text-on-surface-variant">{type} • {ayahs} Ayahs</p>
          </div>
        </div>
        <span className="text-primary text-lg font-amiri">{arabic}</span>
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
    <section className="hidden lg:flex flex-col w-[320px] border-r border-outline-variant bg-surface-container-low h-screen sticky top-0">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-primary">Surahs</h2>
        <input
          className="w-full p-3 rounded-lg bg-surface-container-high text-on-surface outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Search Surah..."
        />
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
              onClick={() => setSelectedSurah(surah.number)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default SurahList;
