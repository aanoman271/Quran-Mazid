"use client";

import React from "react";

interface AyahCardProps {
  number: string;
  arabic: string;
  translation: string;
}

const AyahCard: React.FC<AyahCardProps> = ({ number, arabic, translation }) => {
  return (
    <article className="bg-surface-container rounded-xl p-6 space-y-4 hover:ring-1 hover:ring-primary/20 transition">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-1 rounded">
            {number}
          </div>
          <span className="material-symbols-outlined cursor-pointer text-on-surface-variant hover:text-primary transition">
            play_circle
          </span>
          <span className="material-symbols-outlined cursor-pointer text-on-surface-variant hover:text-primary transition">
            bookmark
          </span>
        </div>
      </div>

      <p className="text-right text-2xl md:text-3xl leading-loose font-quran text-on-surface">
        {arabic}
      </p>

      <p className="text-sm text-on-surface-variant border-t border-outline-variant pt-2">
        {translation}
      </p>
    </article>
  );
};

export default AyahCard;
