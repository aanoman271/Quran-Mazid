"use client";

import React from "react";
import { useQuran } from "@/store/useQuran";
import { useAudio } from "@/store/useAudio";

interface AyahCardProps {
  number: string;
  arabic: string;
  translation: string;
  searchQuery?: string;
}

const AyahCard: React.FC<AyahCardProps> = ({ number, arabic, translation, searchQuery }) => {
  const { arabicSize, translationSize, arabicFont } = useQuran();
  const { currentAyahKey, isPlaying, playAyah } = useAudio();

  const fontClass = arabicFont === "Amiri" 
    ? "font-amiri" 
    : arabicFont === "Scheherazade New" 
    ? "font-scheherazade" 
    : "font-quran";

  const isCurrentPlaying = currentAyahKey === number && isPlaying;

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    // Escape special regex characters to prevent crashes
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          className="bg-primary/20 text-primary rounded-sm px-0.5 border-b border-primary/40 transition-colors"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handlePlayClick = () => {
    const [surah, ayah] = number.split(":").map(Number);
    playAyah(surah, ayah);
  };

  return (
    <article className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group">
      <div className="flex gap-8">
        {/* Left Actions Column */}
        <div className="flex flex-col items-center gap-6 pt-2">
          <div className="text-primary font-bold text-sm tracking-tighter">
            {number}
          </div>
          <div className="flex flex-col gap-4 text-on-surface-variant/60">
            <button 
              onClick={handlePlayClick}
              className={`material-symbols-outlined hover:text-primary transition-colors cursor-pointer ${
                isCurrentPlaying ? "text-primary fill-1" : ""
              }`}
            >
              {isCurrentPlaying ? "stop" : "play_arrow"}
            </button>
            <button className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">
              menu_book
            </button>
            <button className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">
              bookmark
            </button>
            <button className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">
              more_horiz
            </button>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="flex-1 space-y-8">
          <p 
            className={`text-right ${fontClass} text-on-surface dir-rtl`}
            style={{ 
              fontSize: `${arabicSize}px`,
              lineHeight: `${arabicSize * 1.8}px`
            }}
          >
            {highlightText(arabic, searchQuery || "")}
          </p>

          <div className="space-y-3">
            <p className="text-[10px] font-bold text-on-surface-variant/40 tracking-widest uppercase">
              SAHEEH INTERNATIONAL
            </p>
            <p 
              className="text-on-surface-variant/90 leading-relaxed"
              style={{ fontSize: `${translationSize}px` }}
            >
              {highlightText(translation, searchQuery || "")}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AyahCard;
