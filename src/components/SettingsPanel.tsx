// Settings Panel Component - App configuration
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { useSettingsStore } from '../stores/settingsStore';
import { speechService } from '../services/speechService';
import type { Theme, GridSize } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const settings = useSettingsStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = speechService.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    // Also reload on voices changed event
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const testVoice = () => {
    speechService.speak('Hello! This is how I sound.', {
      rate: settings.speechRate,
      pitch: settings.speechPitch,
      voiceId: settings.voiceId || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={clsx(
        'relative w-full max-w-md max-h-[85vh] overflow-y-auto',
        'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl',
        'animate-slide-up'
      )}>
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 z-10">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="btn-icon btn-secondary"
            aria-label="Close settings"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Voice Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              🔊 Voice
            </h3>
            
            <div className="space-y-4">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Voice
                </label>
                <select
                  value={settings.voiceId}
                  onChange={(e) => settings.setVoice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Default</option>
                  {voices.map((voice) => (
                    <option key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Speech Rate */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Speed: {settings.speechRate.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.speechRate}
                  onChange={(e) => settings.setSpeechRate(parseFloat(e.target.value))}
                  className="w-full accent-primary-500"
                />
              </div>

              {/* Speech Pitch */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Pitch: {settings.speechPitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.speechPitch}
                  onChange={(e) => settings.setSpeechPitch(parseFloat(e.target.value))}
                  className="w-full accent-primary-500"
                />
              </div>

              {/* Test Voice Button */}
              <button
                onClick={testVoice}
                className="btn btn-secondary w-full"
              >
                🔊 Test Voice
              </button>
            </div>
          </section>

          {/* Display Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              🎨 Display
            </h3>
            
            <div className="space-y-4">
              {/* Theme */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'dark', 'high-contrast'] as Theme[]).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => settings.setTheme(theme)}
                      className={clsx(
                        'px-3 py-2 rounded-lg text-sm font-medium capitalize',
                        'border-2 transition-colors',
                        settings.theme === theme
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300'
                      )}
                    >
                      {theme.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Size */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Grid Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['3x3', '4x4', '5x5', '6x6'] as GridSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => settings.setGridSize(size)}
                      className={clsx(
                        'px-3 py-2 rounded-lg text-sm font-medium',
                        'border-2 transition-colors',
                        settings.defaultGridSize === size
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show Labels Toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">Show Labels</span>
                <button
                  role="switch"
                  aria-checked={settings.showLabels}
                  onClick={() => settings.setShowLabels(!settings.showLabels)}
                  className={clsx(
                    'relative w-11 h-6 rounded-full transition-colors',
                    settings.showLabels ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
                  )}
                >
                  <span
                    className={clsx(
                      'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                      settings.showLabels && 'translate-x-5'
                    )}
                  />
                </button>
              </label>
            </div>
          </section>

          {/* Feedback Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              📳 Feedback
            </h3>
            
            <div className="space-y-3">
              {/* Sound Effects Toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">Sound Effects</span>
                <button
                  role="switch"
                  aria-checked={settings.soundEffects}
                  onClick={() => settings.setSoundEffects(!settings.soundEffects)}
                  className={clsx(
                    'relative w-11 h-6 rounded-full transition-colors',
                    settings.soundEffects ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
                  )}
                >
                  <span
                    className={clsx(
                      'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                      settings.soundEffects && 'translate-x-5'
                    )}
                  />
                </button>
              </label>

              {/* Haptic Feedback Toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">Vibration Feedback</span>
                <button
                  role="switch"
                  aria-checked={settings.hapticFeedback}
                  onClick={() => settings.setHapticFeedback(!settings.hapticFeedback)}
                  className={clsx(
                    'relative w-11 h-6 rounded-full transition-colors',
                    settings.hapticFeedback ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
                  )}
                >
                  <span
                    className={clsx(
                      'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                      settings.hapticFeedback && 'translate-x-5'
                    )}
                  />
                </button>
              </label>
            </div>
          </section>

          {/* About */}
          <section className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>SpeakEasy AAC</strong> v0.1.0
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              Free, open-source communication app for nonverbal individuals.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Symbols: ARASAAC (CC BY-NC-SA)
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

