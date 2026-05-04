export const QURAN_API_BASE = "https://api.alquran.cloud/v1";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export const fetchSurahs = async (): Promise<Surah[]> => {
  const res = await fetch(`${QURAN_API_BASE}/surah`);
  const data = await res.json();
  return data.data; // alquran.cloud returns list in 'data' field
};

export const fetchVerses = async (surahNumber: number) => {
  const res = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}/editions/quran-uthmani,en.asad`);
  const data = await res.json();
  return data.data; // returns an array of editions
};
