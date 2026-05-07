import { create } from "zustand";
import { getAyahAudioUrl } from "@/lib/audio";

interface AudioState {
  currentAyahKey: string | null; // format: "surah:ayah"
  isPlaying: boolean;
  audioInstance: HTMLAudioElement | null;
  playAyah: (surah: number, ayah: number) => void;
  stopAudio: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  currentAyahKey: null,
  isPlaying: false,
  audioInstance: null,

  playAyah: (surah, ayah) => {
    const { audioInstance, stopAudio, currentAyahKey } = get();
    const newKey = `${surah}:${ayah}`;

    // If clicking the same ayah that is already playing, stop it
    if (currentAyahKey === newKey && audioInstance) {
      stopAudio();
      return;
    }

    // Stop previous audio if any
    stopAudio();

    const url = getAyahAudioUrl(surah, ayah);
    const audio = new Audio(url);

    audio.onplay = () => {
      if (get().audioInstance === audio) set({ isPlaying: true });
    };
    audio.onpause = () => {
      if (get().audioInstance === audio) set({ isPlaying: false });
    };
    audio.onended = () => {
      if (get().audioInstance === audio) {
        set({ isPlaying: false, currentAyahKey: null, audioInstance: null });
      }
    };
    audio.onerror = (e) => {
      if (get().audioInstance === audio) {
        console.error("Audio playback error:", {
          url,
          error: audio.error,
          event: e
        });
        set({ isPlaying: false, currentAyahKey: null, audioInstance: null });
      }
    };

    set({ 
      currentAyahKey: newKey, 
      audioInstance: audio,
      isPlaying: true 
    });

    audio.play().catch((error) => {
      console.error("Failed to play audio:", error);
      set({ isPlaying: false, currentAyahKey: null, audioInstance: null });
    });
  },

  stopAudio: () => {
    const { audioInstance } = get();
    if (audioInstance) {
      audioInstance.onplay = null;
      audioInstance.onpause = null;
      audioInstance.onended = null;
      audioInstance.onerror = null;
      audioInstance.pause();
      audioInstance.src = "";
      audioInstance.load();
    }
    set({ 
      currentAyahKey: null, 
      isPlaying: false, 
      audioInstance: null 
    });
  },
}));
