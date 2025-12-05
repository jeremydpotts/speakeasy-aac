# SpeakEasy AAC - Technical Architecture Document

**Version:** 1.0  
**Date:** December 5, 2024  
**Status:** Approved for Development

---

## 1. Overview

### 1.1 System Purpose
SpeakEasy AAC is a Progressive Web Application (PWA) providing symbol-based augmentative communication for nonverbal individuals. The architecture prioritizes offline functionality, performance, accessibility, and ease of deployment.

### 1.2 Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| App Type | PWA | Cross-platform, no app store, instant updates |
| Framework | React 18 | Mature ecosystem, component-based, excellent tooling |
| Build Tool | Vite | Fast HMR, optimized production builds |
| Styling | Tailwind CSS + CSS Variables | Utility-first with theming support |
| State | Zustand | Lightweight, simple, TypeScript-friendly |
| Storage | IndexedDB (Dexie.js) | Structured data, large capacity, offline |
| TTS | Web Speech API | Free, native, offline-capable |
| PWA | Workbox | Robust service worker management |

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER DEVICE                                  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    SpeakEasy AAC PWA                          │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │                 PRESENTATION LAYER                       │  │  │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐   │  │  │
│  │  │  │ Board   │ │ Symbol  │ │ Sentence│ │ Settings    │   │  │  │
│  │  │  │ View    │ │ Grid    │ │ Strip   │ │ Panel       │   │  │  │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘   │  │  │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐   │  │  │
│  │  │  │ Category│ │ Editor  │ │ Schedule│ │ Quick       │   │  │  │
│  │  │  │ Nav     │ │ Mode    │ │ View    │ │ Phrases     │   │  │  │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │                APPLICATION LAYER                         │  │  │
│  │  │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │  │  │
│  │  │  │ Board Store   │ │ Settings Store│ │ Speech Store  │  │  │  │
│  │  │  │ (Zustand)     │ │ (Zustand)     │ │ (Zustand)     │  │  │  │
│  │  │  └───────────────┘ └───────────────┘ └───────────────┘  │  │  │
│  │  │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │  │  │
│  │  │  │ useSpeech     │ │ useSymbols    │ │ useBoard      │  │  │  │
│  │  │  │ Hook          │ │ Hook          │ │ Hook          │  │  │  │
│  │  │  └───────────────┘ └───────────────┘ └───────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │                 SERVICE LAYER                            │  │  │
│  │  │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │  │  │
│  │  │  │ Speech        │ │ Storage       │ │ Symbol        │  │  │  │
│  │  │  │ Service       │ │ Service       │ │ Service       │  │  │  │
│  │  │  └───────────────┘ └───────────────┘ └───────────────┘  │  │  │
│  │  │  ┌───────────────┐ ┌───────────────┐                    │  │  │
│  │  │  │ Image         │ │ Audio         │                    │  │  │
│  │  │  │ Service       │ │ Service       │                    │  │  │
│  │  │  └───────────────┘ └───────────────┘                    │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │                  DATA LAYER                              │  │  │
│  │  │  ┌───────────────────────────────────────────────────┐  │  │  │
│  │  │  │              IndexedDB (Dexie.js)                  │  │  │  │
│  │  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │  │  │  │
│  │  │  │  │ symbols │ │ boards  │ │ customs │ │ phrases │  │  │  │  │
│  │  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────────────┘  │  │  │
│  │  │  ┌─────────────────────────┐ ┌───────────────────────┐  │  │  │
│  │  │  │ LocalStorage            │ │ Cache API             │  │  │  │
│  │  │  │ (Settings, Preferences) │ │ (Symbol Images)       │  │  │  │
│  │  │  └─────────────────────────┘ └───────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │              SERVICE WORKER (Workbox)                    │  │  │
│  │  │  • Precaches app shell and static assets                 │  │  │
│  │  │  • Runtime caches symbol images                          │  │  │
│  │  │  • Enables full offline functionality                    │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

                              │
                              │ (Optional - Future)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CLOUD SERVICES (Phase 3+)                       │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐              │
│  │ Backup/Sync   │ │ Symbol CDN    │ │ Analytics     │              │
│  │ (Optional)    │ │ (ARASAAC)     │ │ (Privacy-safe)│              │
│  └───────────────┘ └───────────────┘ └───────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Architecture

### 3.1 Directory Structure

```
speakeasy-aac/
├── public/
│   ├── symbols/              # Bundled core symbols
│   │   ├── core/             # Core vocabulary symbols
│   │   ├── food/             # Category-specific symbols
│   │   ├── people/
│   │   └── ...
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker (generated)
│   └── icons/                # App icons (various sizes)
├── src/
│   ├── components/
│   │   ├── board/
│   │   │   ├── BoardView.tsx
│   │   │   ├── SymbolGrid.tsx
│   │   │   ├── SymbolCard.tsx
│   │   │   └── CategoryNav.tsx
│   │   ├── sentence/
│   │   │   ├── SentenceStrip.tsx
│   │   │   └── SentenceWord.tsx
│   │   ├── editor/
│   │   │   ├── EditorMode.tsx
│   │   │   ├── SymbolEditor.tsx
│   │   │   └── BoardEditor.tsx
│   │   ├── settings/
│   │   │   ├── SettingsPanel.tsx
│   │   │   ├── VoiceSettings.tsx
│   │   │   └── DisplaySettings.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Loading.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Navigation.tsx
│   │       └── Layout.tsx
│   ├── hooks/
│   │   ├── useSpeech.ts
│   │   ├── useSymbols.ts
│   │   ├── useBoard.ts
│   │   ├── useSettings.ts
│   │   └── useOffline.ts
│   ├── stores/
│   │   ├── boardStore.ts
│   │   ├── settingsStore.ts
│   │   ├── speechStore.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── speechService.ts
│   │   ├── storageService.ts
│   │   ├── symbolService.ts
│   │   ├── imageService.ts
│   │   └── audioService.ts
│   ├── data/
│   │   ├── db.ts             # Dexie database setup
│   │   ├── defaultBoards.ts  # Initial board configuration
│   │   ├── coreVocabulary.ts # Core word list
│   │   └── categories.ts     # Category definitions
│   ├── types/
│   │   ├── symbol.ts
│   │   ├── board.ts
│   │   ├── settings.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── constants.ts
│   │   └── accessibility.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── themes.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── docs/
│   ├── RESEARCH.md
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT_PLAN.md
│   └── DEV_LOG.md
├── tests/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── setup.ts
├── .github/
│   └── workflows/
│       └── ci.yml
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### 3.2 Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── HomeButton
│   │   ├── SettingsButton
│   │   └── EditModeToggle
│   └── Main Content
│       ├── BoardView (default route)
│       │   ├── SentenceStrip
│       │   │   └── SentenceWord[]
│       │   ├── CategoryNav
│       │   │   └── CategoryButton[]
│       │   └── SymbolGrid
│       │       └── SymbolCard[]
│       ├── SettingsPanel (modal/drawer)
│       │   ├── VoiceSettings
│       │   ├── DisplaySettings
│       │   └── DataSettings
│       └── EditorMode (toggle overlay)
│           ├── SymbolEditor
│           └── BoardEditor
└── ToastContainer (notifications)
```

---

## 4. Data Architecture

### 4.1 IndexedDB Schema (Dexie.js)

```typescript
// src/data/db.ts
import Dexie, { Table } from 'dexie';

export interface Symbol {
  id: string;
  label: string;
  labelLower: string;        // For search indexing
  imageUrl: string;
  imageBlobId?: string;      // For custom images stored as blobs
  audioUrl?: string;
  audioBlobId?: string;      // For custom audio
  category: string;
  subcategory?: string;
  isCustom: boolean;
  isCore: boolean;
  tags: string[];
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  name: string;
  parentId: string | null;
  symbolIds: string[];
  gridSize: '2x2' | '3x3' | '4x4' | '5x5' | '6x6' | '8x8';
  backgroundColor: string;
  isDefault: boolean;
  isLocked: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomMedia {
  id: string;
  type: 'image' | 'audio';
  blob: Blob;
  mimeType: string;
  createdAt: Date;
}

export interface QuickPhrase {
  id: string;
  text: string;
  symbolIds: string[];
  category: string;
  usageCount: number;
  createdAt: Date;
}

export interface UsageLog {
  id?: number;
  symbolId: string;
  timestamp: Date;
  context: string;  // board ID where used
}

class SpeakEasyDB extends Dexie {
  symbols!: Table<Symbol>;
  boards!: Table<Board>;
  customMedia!: Table<CustomMedia>;
  quickPhrases!: Table<QuickPhrase>;
  usageLogs!: Table<UsageLog>;

  constructor() {
    super('SpeakEasyAAC');
    
    this.version(1).stores({
      symbols: 'id, category, labelLower, isCustom, isCore, *tags',
      boards: 'id, parentId, isDefault, sortOrder',
      customMedia: 'id, type',
      quickPhrases: 'id, category',
      usageLogs: '++id, symbolId, timestamp'
    });
  }
}

export const db = new SpeakEasyDB();
```

### 4.2 LocalStorage Schema

```typescript
// Settings stored in LocalStorage for quick access
interface StoredSettings {
  // Voice
  voiceId: string;
  speechRate: number;      // 0.5 - 2.0
  speechPitch: number;     // 0.5 - 2.0
  
  // Display
  theme: 'light' | 'dark' | 'high-contrast';
  defaultGridSize: GridSize;
  showLabels: boolean;
  labelPosition: 'below' | 'above' | 'none';
  
  // Feedback
  soundEffects: boolean;
  hapticFeedback: boolean;
  visualFeedback: boolean;
  
  // Accessibility
  dwellTime: number | null;  // null = disabled
  scanMode: boolean;
  
  // App state
  lastBoardId: string;
  editorModeEnabled: boolean;
  onboardingComplete: boolean;
  
  // Version for migrations
  settingsVersion: number;
}
```

### 4.3 Cache Strategy

```typescript
// Service Worker caching strategies (Workbox)

// 1. App Shell - Cache First (precached on install)
// - index.html
// - main.js, main.css
// - Static assets

// 2. Symbol Images - Cache First with Network Fallback
// - /symbols/**/*.png
// - Long cache (30 days)
// - Background sync for updates

// 3. Custom Media - Cache Only
// - Stored in IndexedDB as blobs
// - Never fetched from network

// 4. API Calls (future) - Network First with Cache Fallback
// - Sync operations
// - Analytics
```

---

## 5. Service Layer Design

### 5.1 Speech Service

```typescript
// src/services/speechService.ts

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  voiceId?: string;
}

class SpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[];
  private currentUtterance: SpeechSynthesisUtterance | null;
  
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.currentUtterance = null;
    this.loadVoices();
  }
  
  async loadVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      const voices = this.synth.getVoices();
      if (voices.length) {
        this.voices = voices;
        resolve(voices);
      } else {
        this.synth.onvoiceschanged = () => {
          this.voices = this.synth.getVoices();
          resolve(this.voices);
        };
      }
    });
  }
  
  speak(text: string, options?: SpeechOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate ?? 1;
      utterance.pitch = options?.pitch ?? 1;
      
      if (options?.voiceId) {
        const voice = this.voices.find(v => v.voiceURI === options.voiceId);
        if (voice) utterance.voice = voice;
      }
      
      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);
      
      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }
  
  speakSequence(texts: string[], options?: SpeechOptions): Promise<void> {
    const sentence = texts.join(' ');
    return this.speak(sentence, options);
  }
  
  stop(): void {
    this.synth.cancel();
    this.currentUtterance = null;
  }
  
  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
  
  isSpeaking(): boolean {
    return this.synth.speaking;
  }
}

export const speechService = new SpeechService();
```

### 5.2 Storage Service

```typescript
// src/services/storageService.ts

import { db, Symbol, Board, CustomMedia } from '../data/db';

class StorageService {
  // Symbols
  async getSymbol(id: string): Promise<Symbol | undefined> {
    return db.symbols.get(id);
  }
  
  async getSymbolsByCategory(category: string): Promise<Symbol[]> {
    return db.symbols.where('category').equals(category).toArray();
  }
  
  async searchSymbols(query: string): Promise<Symbol[]> {
    const lower = query.toLowerCase();
    return db.symbols
      .where('labelLower')
      .startsWith(lower)
      .limit(20)
      .toArray();
  }
  
  async saveSymbol(symbol: Symbol): Promise<string> {
    symbol.updatedAt = new Date();
    await db.symbols.put(symbol);
    return symbol.id;
  }
  
  async deleteSymbol(id: string): Promise<void> {
    await db.symbols.delete(id);
  }
  
  // Boards
  async getBoard(id: string): Promise<Board | undefined> {
    return db.boards.get(id);
  }
  
  async getBoardWithSymbols(id: string): Promise<{board: Board, symbols: Symbol[]} | undefined> {
    const board = await db.boards.get(id);
    if (!board) return undefined;
    
    const symbols = await db.symbols
      .where('id')
      .anyOf(board.symbolIds)
      .toArray();
    
    // Maintain order
    const symbolMap = new Map(symbols.map(s => [s.id, s]));
    const orderedSymbols = board.symbolIds
      .map(id => symbolMap.get(id))
      .filter((s): s is Symbol => s !== undefined);
    
    return { board, symbols: orderedSymbols };
  }
  
  async getRootBoards(): Promise<Board[]> {
    return db.boards
      .where('parentId')
      .equals(null as any)
      .sortBy('sortOrder');
  }
  
  async saveBoard(board: Board): Promise<string> {
    board.updatedAt = new Date();
    await db.boards.put(board);
    return board.id;
  }
  
  // Custom Media
  async saveMedia(media: CustomMedia): Promise<string> {
    await db.customMedia.put(media);
    return media.id;
  }
  
  async getMedia(id: string): Promise<CustomMedia | undefined> {
    return db.customMedia.get(id);
  }
  
  async getMediaUrl(id: string): Promise<string | undefined> {
    const media = await this.getMedia(id);
    if (!media) return undefined;
    return URL.createObjectURL(media.blob);
  }
  
  // Initialization
  async initializeDefaultData(): Promise<void> {
    const count = await db.boards.count();
    if (count === 0) {
      // Import default boards and symbols
      await this.importDefaultData();
    }
  }
  
  private async importDefaultData(): Promise<void> {
    // Implementation: load from bundled JSON files
  }
  
  // Export/Import for backup
  async exportData(): Promise<object> {
    const symbols = await db.symbols.toArray();
    const boards = await db.boards.toArray();
    const phrases = await db.quickPhrases.toArray();
    
    return { symbols, boards, phrases, exportedAt: new Date() };
  }
  
  async importData(data: any): Promise<void> {
    // Validate and import
    await db.transaction('rw', [db.symbols, db.boards, db.quickPhrases], async () => {
      if (data.symbols) await db.symbols.bulkPut(data.symbols);
      if (data.boards) await db.boards.bulkPut(data.boards);
      if (data.phrases) await db.quickPhrases.bulkPut(data.phrases);
    });
  }
}

export const storageService = new StorageService();
```

---

## 6. State Management

### 6.1 Board Store

```typescript
// src/stores/boardStore.ts
import { create } from 'zustand';
import { Symbol, Board } from '../types';
import { storageService } from '../services/storageService';

interface BoardState {
  currentBoard: Board | null;
  symbols: Symbol[];
  navigationStack: string[];  // Board IDs for back navigation
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadBoard: (boardId: string) => Promise<void>;
  navigateToBoard: (boardId: string) => Promise<void>;
  goBack: () => Promise<void>;
  goHome: () => Promise<void>;
  
  // Editor actions
  addSymbolToBoard: (symbolId: string) => Promise<void>;
  removeSymbolFromBoard: (symbolId: string) => Promise<void>;
  reorderSymbols: (fromIndex: number, toIndex: number) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  currentBoard: null,
  symbols: [],
  navigationStack: [],
  isLoading: false,
  error: null,
  
  loadBoard: async (boardId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await storageService.getBoardWithSymbols(boardId);
      if (result) {
        set({ 
          currentBoard: result.board, 
          symbols: result.symbols,
          isLoading: false 
        });
      } else {
        set({ error: 'Board not found', isLoading: false });
      }
    } catch (e) {
      set({ error: 'Failed to load board', isLoading: false });
    }
  },
  
  navigateToBoard: async (boardId: string) => {
    const { currentBoard, navigationStack } = get();
    if (currentBoard) {
      set({ navigationStack: [...navigationStack, currentBoard.id] });
    }
    await get().loadBoard(boardId);
  },
  
  goBack: async () => {
    const { navigationStack } = get();
    if (navigationStack.length > 0) {
      const newStack = [...navigationStack];
      const previousBoardId = newStack.pop()!;
      set({ navigationStack: newStack });
      await get().loadBoard(previousBoardId);
    }
  },
  
  goHome: async () => {
    set({ navigationStack: [] });
    await get().loadBoard('home');  // 'home' is the root board ID
  },
  
  // Editor actions...
  addSymbolToBoard: async (symbolId: string) => { /* ... */ },
  removeSymbolFromBoard: async (symbolId: string) => { /* ... */ },
  reorderSymbols: async (fromIndex: number, toIndex: number) => { /* ... */ },
}));
```

### 6.2 Speech Store

```typescript
// src/stores/speechStore.ts
import { create } from 'zustand';
import { speechService } from '../services/speechService';

interface SpeechState {
  sentence: string[];
  isSpeaking: boolean;
  
  // Actions
  addWord: (word: string) => void;
  removeWord: (index: number) => void;
  clearSentence: () => void;
  speakWord: (word: string) => Promise<void>;
  speakSentence: () => Promise<void>;
}

export const useSpeechStore = create<SpeechState>((set, get) => ({
  sentence: [],
  isSpeaking: false,
  
  addWord: (word: string) => {
    set((state) => ({ sentence: [...state.sentence, word] }));
  },
  
  removeWord: (index: number) => {
    set((state) => ({
      sentence: state.sentence.filter((_, i) => i !== index)
    }));
  },
  
  clearSentence: () => {
    set({ sentence: [] });
  },
  
  speakWord: async (word: string) => {
    set({ isSpeaking: true });
    try {
      await speechService.speak(word);
    } finally {
      set({ isSpeaking: false });
    }
  },
  
  speakSentence: async () => {
    const { sentence } = get();
    if (sentence.length === 0) return;
    
    set({ isSpeaking: true });
    try {
      await speechService.speakSequence(sentence);
    } finally {
      set({ isSpeaking: false });
    }
  },
}));
```

---

## 7. PWA Configuration

### 7.1 Web App Manifest

```json
// public/manifest.json
{
  "name": "SpeakEasy AAC",
  "short_name": "SpeakEasy",
  "description": "Free communication app for nonverbal individuals",
  "start_url": "/",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#1a1a2e",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "health", "accessibility"],
  "screenshots": [
    {
      "src": "/screenshots/board-view.png",
      "sizes": "1280x720",
      "type": "image/png",
      "label": "Communication board view"
    }
  ]
}
```

### 7.2 Service Worker (Workbox Config)

```typescript
// vite.config.ts (VitePWA plugin config)
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'symbols/**/*'],
      manifest: false, // Use custom manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.arasaac\.org\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'arasaac-symbols',
              expiration: {
                maxEntries: 5000,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
```

---

## 8. Security Considerations

### 8.1 Data Privacy
- **No server communication** - All data stays on device
- **No analytics** in MVP - Privacy-first approach
- **No authentication** required - Reduces attack surface
- **Local-only storage** - IndexedDB and LocalStorage only

### 8.2 Content Security
- **CSP headers** - Strict Content Security Policy
- **No external scripts** - All code bundled locally
- **Symbol validation** - Sanitize custom image uploads

### 8.3 Future Considerations (Phase 3+)
- If adding cloud sync: End-to-end encryption
- If adding accounts: OAuth only, no password storage
- COPPA compliance for any data collection

---

## 9. Performance Budget

| Metric | Target | Method |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | Code splitting, preload critical |
| Largest Contentful Paint | < 2.5s | Optimize symbol loading |
| Time to Interactive | < 3s | Minimal main bundle |
| Total Bundle Size | < 500KB (gzipped) | Tree shaking, lazy loading |
| Symbol Image Size | < 10KB each | WebP format, optimization |
| Offline Load | < 1s | Aggressive precaching |

---

## 10. Testing Strategy

### 10.1 Unit Tests
- Services (speech, storage, symbol)
- Utility functions
- Store logic

### 10.2 Component Tests
- SymbolCard interactions
- SymbolGrid rendering
- Settings persistence

### 10.3 Integration Tests
- Board navigation flow
- Symbol-to-speech pipeline
- Offline functionality

### 10.4 Accessibility Tests
- axe-core automated tests
- Manual screen reader testing
- Keyboard navigation testing

---

## 11. Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT PIPELINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  GitHub Repository                                               │
│       │                                                          │
│       ▼                                                          │
│  GitHub Actions (CI/CD)                                          │
│       │                                                          │
│       ├── Lint & Type Check                                      │
│       ├── Run Tests                                              │
│       ├── Build Production Bundle                                │
│       └── Deploy to Hosting                                      │
│               │                                                  │
│               ▼                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           HOSTING OPTIONS                                │    │
│  │                                                          │    │
│  │  Option A: Vercel (Recommended)                         │    │
│  │  - Free tier sufficient                                  │    │
│  │  - Automatic HTTPS                                       │    │
│  │  - Edge caching                                          │    │
│  │                                                          │    │
│  │  Option B: Netlify                                       │    │
│  │  - Free tier sufficient                                  │    │
│  │  - Good PWA support                                      │    │
│  │                                                          │    │
│  │  Option C: GitHub Pages                                  │    │
│  │  - Completely free                                       │    │
│  │  - Limited to static files                              │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

*This architecture document will be updated as implementation progresses and decisions are refined.*

