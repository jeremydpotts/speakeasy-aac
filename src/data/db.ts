// IndexedDB setup using Dexie.js
import Dexie, { type Table } from 'dexie';
import type { Symbol, Board, QuickPhrase } from '../types';

export class SpeakEasyDB extends Dexie {
  symbols!: Table<Symbol>;
  boards!: Table<Board>;
  quickPhrases!: Table<QuickPhrase>;

  constructor() {
    super('SpeakEasyAAC');
    
    this.version(1).stores({
      symbols: 'id, category, isCategory, isCustom, isCore',
      boards: 'id, parentId, isDefault, sortOrder',
      quickPhrases: 'id, category'
    });
  }
}

export const db = new SpeakEasyDB();

// Initialize database with default data
export async function initializeDatabase(): Promise<void> {
  const boardCount = await db.boards.count();
  
  if (boardCount === 0) {
    console.log('Initializing database with default data...');
    await loadDefaultData();
  }
}

async function loadDefaultData(): Promise<void> {
  // Import default boards and symbols
  const { defaultBoards, defaultSymbols } = await import('./defaultData');
  
  await db.transaction('rw', [db.boards, db.symbols], async () => {
    await db.boards.bulkAdd(defaultBoards);
    await db.symbols.bulkAdd(defaultSymbols);
  });
  
  console.log('Default data loaded successfully');
}

// Helper functions
export async function getBoard(boardId: string): Promise<Board | undefined> {
  return db.boards.get(boardId);
}

export async function getBoardSymbols(boardId: string): Promise<Symbol[]> {
  const board = await db.boards.get(boardId);
  if (!board) return [];
  
  const symbols = await db.symbols.where('id').anyOf(board.symbolIds).toArray();
  
  // Maintain order from board.symbolIds
  const symbolMap = new Map(symbols.map(s => [s.id, s]));
  return board.symbolIds
    .map(id => symbolMap.get(id))
    .filter((s): s is Symbol => s !== undefined);
}

export async function getChildBoards(parentId: string): Promise<Board[]> {
  return db.boards.where('parentId').equals(parentId).sortBy('sortOrder');
}

