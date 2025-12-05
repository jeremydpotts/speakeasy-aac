// Text-to-Speech Service using Web Speech API

class SpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoices();
  }

  private async initVoices(): Promise<void> {
    // Voices load asynchronously
    const loadVoices = () => {
      this.voices = this.synth.getVoices();
    };

    // Try immediate load
    loadVoices();

    // Also listen for voice change event (needed for Chrome)
    if (this.voices.length === 0) {
      this.synth.onvoiceschanged = () => {
        loadVoices();
      };
      // Timeout fallback
      setTimeout(() => {
        loadVoices();
      }, 1000);
    }
  }

  async speak(text: string, options?: {
    rate?: number;
    pitch?: number;
    voiceId?: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply settings
      utterance.rate = options?.rate ?? 1;
      utterance.pitch = options?.pitch ?? 1;
      
      // Set voice if specified
      if (options?.voiceId) {
        const voice = this.voices.find(v => v.voiceURI === options.voiceId);
        if (voice) {
          utterance.voice = voice;
        }
      } else {
        // Try to use a good default voice
        const defaultVoice = this.getDefaultVoice();
        if (defaultVoice) {
          utterance.voice = defaultVoice;
        }
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => {
        // Ignore cancelled errors
        if (event.error === 'canceled') {
          resolve();
        } else {
          reject(new Error(`Speech error: ${event.error}`));
        }
      };

      this.synth.speak(utterance);
    });
  }

  speakSequence(words: string[], options?: {
    rate?: number;
    pitch?: number;
    voiceId?: string;
  }): Promise<void> {
    const sentence = words.join(' ');
    return this.speak(sentence, options);
  }

  stop(): void {
    this.synth.cancel();
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  getDefaultVoice(): SpeechSynthesisVoice | null {
    // Prefer these voices in order
    const preferredVoices = [
      'Samantha', // iOS/macOS
      'Google US English', // Chrome
      'Microsoft Zira', // Windows
      'Alex', // macOS
    ];

    for (const name of preferredVoices) {
      const voice = this.voices.find(v => v.name.includes(name));
      if (voice) return voice;
    }

    // Fallback to first English voice
    const englishVoice = this.voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) return englishVoice;

    // Final fallback
    return this.voices[0] || null;
  }

  isSpeaking(): boolean {
    return this.synth.speaking;
  }

  isPaused(): boolean {
    return this.synth.paused;
  }

  isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

// Export singleton instance
export const speechService = new SpeechService();

