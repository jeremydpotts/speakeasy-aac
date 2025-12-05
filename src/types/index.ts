// Core type definitions for SpeakEasy AAC

export type GridSize = '2x2' | '3x3' | '4x4' | '5x5' | '6x6' | '8x8';
export type Theme = 'light' | 'dark' | 'high-contrast';

export interface Symbol {
  id: string;
  label: string;
  imageUrl: string;
  audioUrl?: string;
  category: string;
  isCategory: boolean;  // If true, this symbol navigates to a sub-board
  isCustom: boolean;
  isCore: boolean;
  backgroundColor?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  name: string;
  parentId: string | null;
  symbolIds: string[];
  gridSize: GridSize;
  backgroundColor?: string;
  isDefault: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  voiceId: string;
  speechRate: number;  // 0.5 - 2.0
  speechPitch: number; // 0.5 - 2.0
  theme: Theme;
  defaultGridSize: GridSize;
  showLabels: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
  lastBoardId: string;
}

export interface QuickPhrase {
  id: string;
  text: string;
  symbolIds: string[];
  category: string;
}

// Default settings
export const DEFAULT_SETTINGS: UserSettings = {
  voiceId: '',
  speechRate: 1.0,
  speechPitch: 1.0,
  theme: 'light',
  defaultGridSize: '4x4',
  showLabels: true,
  soundEffects: true,
  hapticFeedback: true,
  lastBoardId: 'home',
};

// Grid size to columns/rows mapping
export const GRID_DIMENSIONS: Record<GridSize, number> = {
  '2x2': 2,
  '3x3': 3,
  '4x4': 4,
  '5x5': 5,
  '6x6': 6,
  '8x8': 8,
};

