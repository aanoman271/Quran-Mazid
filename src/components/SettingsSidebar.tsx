"use client";

import React, { useEffect } from "react";
import { useSettings } from "@/store/useSettings";
import { useQuran } from "@/store/useQuran";

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SettingsSidebar component that slides in from the right.
 * Provides controls for theme, reading preferences, and font sizes.
 */
const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = React.useState<"main" | "font-selector">("main");
  const { theme, setTheme } = useSettings();
  const {
    arabicSize, setArabicSize,
    translationSize, setTranslationSize,
    arabicFont, setArabicFont
  } = useQuran();

  // Reset view when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setActiveView("main"), 300);
    }
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const arabicFonts = [
    { name: "KFGQPC Uthman Taha Naskh", family: "'KFGQPC Uthman Taha Naskh', serif" },
    { name: "Amiri", family: "'Amiri', serif" },
    { name: "Scheherazade New", family: "'Scheherazade New', serif" },

  ];

  return (
    <>
      {/* Semi-transparent dark overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Settings Side Panel */}
      <aside
        id="settings-panel"
        className={`fixed top-0 right-0 w-[380px] h-screen bg-surface-container-low border-l border-outline-variant/20 z-[101] flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            {activeView !== "main" && (
              <button
                onClick={() => setActiveView("main")}
                className="p-2 -ml-2 rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
            )}
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                {activeView === "main" ? "settings" : "font_download"}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-on-surface">
                {activeView === "main" ? "Settings" : "Arabic Font"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-highest transition-all duration-200 text-on-surface-variant hover:text-on-surface group"
            aria-label="Close settings"
          >
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">close</span>
          </button>
        </div>

        {/* View Container with Transitions */}
        <div className="flex-1 relative overflow-hidden">
          {/* Main View */}
          <div
            className={`absolute inset-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${activeView === "main" ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar space-y-10">
              {/* Section: Display Mode */}
              {/* <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  <h3 className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Display Mode</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(["light", "dark", "system"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTheme(mode)}
                      className={`flex flex-col items-center gap-3 py-5 rounded-2xl border-2 transition-all duration-300 ${theme === mode
                        ? "bg-primary/5 border-primary text-primary shadow-sm"
                        : "bg-surface-container-high/40 border-transparent text-on-surface-variant hover:border-outline-variant/30"
                        }`}
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {mode === "light" ? "light_mode" : mode === "dark" ? "dark_mode" : "settings_brightness"}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{mode}</span>
                    </button>
                  ))}
                </div>
              </section> */}

              {/* Section: Font Settings */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  <h3 className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Font Settings</h3>
                </div>

                <div className="space-y-4">


                  {/* Size Sliders */}
                  <div className="space-y-4 p-5">
                    {/* rounded-2xl bg-surface-container-highest/20 border border-outline-variant/5 */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-ms font-bold text-on-surface-variant uppercase tracking-wider">Arabic Font Size</label>
                        {/* font-black bg-primary/10  px-3 py-1 rounded-full */}
                        <span className="text-ms text-primary">{arabicSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="64"
                        value={arabicSize}
                        onChange={(e) => setArabicSize(parseInt(e.target.value))}
                        className="range bg-container text-primary range-xs h-2"
                      />
                    </div>

                    <div className="pt-4 border-t border-outline-variant/5 space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-ms font-bold text-on-surface-variant uppercase tracking-wider">Translation Size</label>
                        <span className="text-ms text-primary">{translationSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="14"
                        max="28"
                        value={translationSize}
                        onChange={(e) => setTranslationSize(parseInt(e.target.value))}
                        className="range bg-container text-primary range-xs h-2"
                      />
                    </div>
                  </div>
                  {/* Arabic Font Face Selector Trigger */}
                  <button
                    onClick={() => setActiveView("font-selector")}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/5 hover:bg-surface-container-highest/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {/* <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">font_download</span>
                      </div> */}
                      <div className="text-left">
                        <span className="block text-sm font-semibold text-on-surface">Arabic Font Face</span>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-primary">{arabicFont}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Font Selector View */}
          <div
            className={`absolute inset-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${activeView === "font-selector" ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                <h3 className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Select Arabic Font</h3>
              </div>
              <div className="space-y-3">
                {arabicFonts.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => {
                      setArabicFont(font.name);
                      setActiveView("main");
                    }}
                    className={`w-full flex flex-col items-start gap-2 px-5 py-2 rounded-2xl border-2 transition-all duration-300 text-left ${arabicFont === font.name
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "bg-surface-container-high/40 border-transparent hover:border-outline-variant/30"
                      }`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <span className={`text-sm font-semibold ${arabicFont === font.name ? "text-primary" : "text-on-surface"}`}>
                        {font.name}
                      </span>
                      {arabicFont === font.name && (
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                      )}
                    </div>
                    <div
                      className="w-full text-2xl py-2 text-right dir-rtl leading-relaxed opacity-80"
                      style={{ fontFamily: font.family }}
                    >
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="p-6 border-t border-outline-variant/10 bg-surface-container-low/80 backdrop-blur-sm">
          <button
            onClick={onClose}
            className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            Save Preferences
          </button>
        </div>
      </aside>
    </>
  );
};

export default SettingsSidebar;
