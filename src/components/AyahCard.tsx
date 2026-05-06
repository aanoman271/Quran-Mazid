"use client";

import React from "react";
import { useQuran } from "@/store/useQuran";

interface AyahCardProps {
  number: string;
  arabic: string;
  translation: string;
}

const AyahCard: React.FC<AyahCardProps> = ({ number, arabic, translation }) => {
  const { arabicSize, translationSize } = useQuran();

  return (
    <article className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group">
      <div className="flex gap-8">
        {/* Left Actions Column */}
        <div className="flex flex-col items-center gap-6 pt-2">
          <div className="text-primary font-bold text-sm tracking-tighter">
            {number}
          </div>
          <div className="flex flex-col gap-4 text-on-surface-variant/60">
            <button className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">
              play_arrow
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
            className="text-right font-quran text-on-surface dir-rtl"
            style={{ 
              fontSize: `${arabicSize}px`,
              lineHeight: `${arabicSize * 1.8}px`
            }}
          >
            {arabic}
          </p>

          <div className="space-y-3">
            <p className="text-[10px] font-bold text-on-surface-variant/40 tracking-widest uppercase">
              SAHEEH INTERNATIONAL
            </p>
            <p 
              className="text-on-surface-variant/90 leading-relaxed"
              style={{ fontSize: `${translationSize}px` }}
            >
              {translation}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AyahCard;
