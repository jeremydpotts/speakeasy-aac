// Settings store using Zustand with localStorage persistence
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings, Theme, GridSize } from '../types';
import { DEFAULT_SETTINGS } from '../types';

interface SettingsState extends UserSettings {
  // Actions
  setTheme: (theme: Theme) => void;
  setGridSize: (size: GridSize) => void;
  setVoice: (voiceId: string) => void;
  setSpeechRate: (rate: number) => void;
  setSpeechPitch: (pitch: number) => void;
  setShowLabels: (show: boolean) => void;
  setSoundEffects: (enabled: boolean) => void;
  setHapticFeedback: (enabled: boolean) => void;
  setLastBoardId: (boardId: string) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setTheme: (theme) => {
        // Apply theme to document
        document.documentElement.classList.remove('light', 'dark', 'high-contrast');
        document.documentElement.classList.add(theme);
        set({ theme });
      },

      setGridSize: (defaultGridSize) => set({ defaultGridSize }),
      
      setVoice: (voiceId) => set({ voiceId }),
      
      setSpeechRate: (speechRate) => set({ speechRate: Math.max(0.5, Math.min(2, speechRate)) }),
      
      setSpeechPitch: (speechPitch) => set({ speechPitch: Math.max(0.5, Math.min(2, speechPitch)) }),
      
      setShowLabels: (showLabels) => set({ showLabels }),
      
      setSoundEffects: (soundEffects) => set({ soundEffects }),
      
      setHapticFeedback: (hapticFeedback) => set({ hapticFeedback }),
      
      setLastBoardId: (lastBoardId) => set({ lastBoardId }),
      
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'speakeasy-settings',
      partialize: (state) => ({
        voiceId: state.voiceId,
        speechRate: state.speechRate,
        speechPitch: state.speechPitch,
        theme: state.theme,
        defaultGridSize: state.defaultGridSize,
        showLabels: state.showLabels,
        soundEffects: state.soundEffects,
        hapticFeedback: state.hapticFeedback,
        lastBoardId: state.lastBoardId,
      }),
    }
  )
);

// Initialize theme on load
export function initializeTheme(): void {
  const settings = useSettingsStore.getState();
  document.documentElement.classList.add(settings.theme);
}

