"use client";

import React, { useEffect, useState } from "react";
import SurahList from "@/components/SurahList";
import Header from "@/components/Header";
import AyahCard from "@/components/AyahCard";
import { useQuran } from "@/store/useQuran";
import { fetchVerses } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import SettingsSidebar from "@/components/SettingsSidebar";
import Image from "next/image";
import masjid from "@/assets/madinah.webp";
import bismillah from "@/assets/bismillah.svg";

export default function Home() {
  const { selectedSurah } = useQuran();
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [surahDetail, setSurahDetail] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchVerses(selectedSurah).then((data) => {
      // data[0] is Arabic, data[1] is English Asad translation
      const arabicVerses = data[0].ayahs;
      const translationVerses = data[1].ayahs;
      setSurahDetail(data[0])
      const combined = arabicVerses.map((ayah: any, index: number) => ({
        number: `${selectedSurah}:${ayah.numberInSurah}`,
        arabic: ayah.text,
        translation: translationVerses[index].text,
      }));

      setVerses(combined);
      setLoading(false);
    });
  }, [selectedSurah]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] lg:grid-cols-[80px_320px_1fr] grid-rows-[auto_1fr] h-screen bg-background text-on-surface">
        {/* Left Sidebar (Spans both rows) */}
        <div className="row-span-2 hidden md:block">
          <Sidebar onSettingsClick={() => setIsSettingsOpen(true)} />
        </div>

        {/* Top Header (Two columns: Brand + Actions) */}
        <div className="col-span-1 lg:col-span-2">
          <Header onSettingsClick={() => setIsSettingsOpen(true)} />
        </div>

        {/* Surah Selection Sidebar (Below Header) */}
        <SurahList />

        {/* Main Reader Section (Below Header) */}
        <main className="flex flex-col h-full overflow-hidden ">
          {/* Reader Content Area */}
          <div className="flex-1 overflow-y-auto px-4 md:px-12 py-10 max-w-5xl mx-auto w-full scroll-smooth custom-scrollbar">
            {/* Bismillah */}
            <div className="text-center mb-10 flex justify-between items-center overflow-hidden relative">
              <Image
                src={masjid}
                alt="Madinah Silhouette"
                className="w-40 top-0 h-auto opacity-40 brightness-0 invert"
              />

              <div className="text-center relative z-10">
                <h1 className="text-4xl transition-colors font-bold tracking-tight text-inverse-primary">
                  {surahDetail?.englishName}
                </h1>
                <div className="mt-3">
                  <p className="text-secondary font-medium tracking-wide">
                    Ayah-{surahDetail?.numberOfAyahs} • {surahDetail?.revelationType}
                  </p>
                </div>
              </div>

              <div className="text-on-surface">
                <Image
                  src={bismillah}
                  alt="Bismillah"
                  className="w-48 h-auto opacity-50 brightness-0 invert"
                />
              </div>
            </div>

            {/* Ayahs List */}
            <div className="space-y-8">
              {loading ? (
                <div className="flex flex-col items-center gap-6 p-20">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="text-on-surface-variant animate-pulse font-medium">Loading verses...</p>
                </div>
              ) : (
                verses.map((ayah, i) => (
                  <AyahCard
                    key={i}
                    number={ayah.number}
                    arabic={ayah.arabic}
                    translation={ayah.translation}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            {!loading && (
              <div className="pt-20 pb-12 text-center text-label-caps text-on-surface-variant/30 tracking-widest uppercase">
                END OF SURAH SECTION
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Settings Sidebar Modal */}
      <SettingsSidebar isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}

