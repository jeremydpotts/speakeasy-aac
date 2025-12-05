// Speech state management using Zustand
import { create } from 'zustand';
import { speechService } from '../services/speechService';
import { useSettingsStore } from './settingsStore';

interface SpeechState {
  isSpeaking: boolean;
  currentWord: string | null;
  sentence: string[];

  // Actions
  speakWord: (word: string) => Promise<void>;
  speakSentence: () => Promise<void>;
  addToSentence: (word: string) => void;
  removeFromSentence: (index: number) => void;
  clearSentence: () => void;
  stop: () => void;
}

export const useSpeechStore = create<SpeechState>((set, get) => ({
  isSpeaking: false,
  currentWord: null,
  sentence: [],

  speakWord: async (word: string) => {
    const settings = useSettingsStore.getState();
    
    set({ isSpeaking: true, currentWord: word });
    
    // Trigger haptic feedback if enabled
    if (settings.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    try {
      await speechService.speak(word, {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
        voiceId: settings.voiceId || undefined,
      });
    } catch (error) {
      console.error('Speech error:', error);
    } finally {
      set({ isSpeaking: false, currentWord: null });
    }
  },

  speakSentence: async () => {
    const { sentence } = get();
    const settings = useSettingsStore.getState();
    
    if (sentence.length === 0) return;
    
    set({ isSpeaking: true });
    
    // Haptic feedback
    if (settings.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }

    try {
      await speechService.speakSequence(sentence, {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
        voiceId: settings.voiceId || undefined,
      });
    } catch (error) {
      console.error('Speech error:', error);
    } finally {
      set({ isSpeaking: false });
    }
  },

  addToSentence: (word: string) => {
    set((state) => ({ 
      sentence: [...state.sentence, word] 
    }));
  },

  removeFromSentence: (index: number) => {
    set((state) => ({
      sentence: state.sentence.filter((_, i) => i !== index)
    }));
  },

  clearSentence: () => {
    set({ sentence: [] });
  },

  stop: () => {
    speechService.stop();
    set({ isSpeaking: false, currentWord: null });
  },
}));

