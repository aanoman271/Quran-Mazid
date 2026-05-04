import { useQuran } from "@/store/useQuran";

interface IconBtnProps {
  icon: string;
}

const IconBtn: React.FC<IconBtnProps> = ({ icon }) => {
  return (
    <button className="text-on-surface-variant hover:text-primary transition">
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
};

const Header: React.FC = () => {
  const { selectedSurah, surahs } = useQuran();
  const currentSurah = surahs.find((s) => s.number === selectedSurah);

  return (
    <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur border-b border-outline-variant px-4 py-3 flex justify-between items-center">
      <div>
        <h1 className="text-primary font-bold">
          {selectedSurah}. {currentSurah?.englishName || "Loading..."}
        </h1>
        <p className="text-xs text-on-surface-variant uppercase">
          {currentSurah?.revelationType} • {currentSurah?.numberOfAyahs} AYAHS
        </p>
      </div>

      <div className="flex gap-3">
        <IconBtn icon="font_download" />
        <IconBtn icon="volume_up" />
        <IconBtn icon="more_vert" />
      </div>
    </header>
  );
};

export default Header;
