/**
 * Generates the audio URL for a specific ayah.
 * Reciter: Mishari Rashid Alafasy
 * Format: SSSAAA.mp3 (3-digit surah, 3-digit ayah)
 */
export const getAyahAudioUrl = (surah: number, ayah: number): string => {
  const surahStr = surah.toString().padStart(3, "0");
  const ayahStr = ayah.toString().padStart(3, "0");
  return `https://everyayah.com/data/Alafasy_128kbps/${surahStr}${ayahStr}.mp3`;
};
