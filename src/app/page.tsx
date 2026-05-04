"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import SurahList from "@/components/SurahList";
import Header from "@/components/Header";
import AyahCard from "@/components/AyahCard";
import { useQuran } from "@/store/useQuran";
import { fetchVerses } from "@/lib/api";

export default function Home() {
  const { selectedSurah } = useQuran();
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchVerses(selectedSurah).then((data) => {
      // data[0] is Arabic, data[1] is English Asad translation
      const arabicVerses = data[0].ayahs;
      const translationVerses = data[1].ayahs;
      
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
    <div className="bg-background text-on-surface min-h-screen flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 md:ml-20">
        {/* Surah Selection Sidebar (Desktop) */}
        <SurahList />

        {/* Reader Section */}
        <section className="flex flex-col flex-1 bg-surface h-screen overflow-hidden">
          <Header />

          {/* Reader Content */}
          <div className="flex-1 overflow-y-auto px-4 md:px-10 py-8 max-w-4xl mx-auto w-full scroll-smooth">
            {/* Bismillah */}
            <div className="text-center mb-10">
              <p className="text-3xl md:text-5xl text-primary leading-relaxed font-quran">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </p>
            </div>

            {/* Ayahs List */}
            <div className="space-y-6">
              {loading ? (
                <div className="flex flex-col items-center gap-4 p-20">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="text-on-surface-variant animate-pulse">Loading verses...</p>
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
              <div className="pt-12 pb-8 text-center text-xs text-on-surface-variant">
                End of Surah Section
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
