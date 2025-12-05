// Board state management using Zustand
import { create } from 'zustand';
import type { Board, Symbol } from '../types';
import { db, getBoardSymbols } from '../data/db';
import { categoryToBoardMap } from '../data/defaultData';

interface BoardState {
  currentBoard: Board | null;
  symbols: Symbol[];
  navigationStack: string[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadBoard: (boardId: string) => Promise<void>;
  navigateToBoard: (boardId: string) => Promise<void>;
  navigateToCategory: (categorySymbolId: string) => Promise<void>;
  goBack: () => Promise<void>;
  goHome: () => Promise<void>;
  canGoBack: () => boolean;
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
      const board = await db.boards.get(boardId);
      
      if (!board) {
        set({ error: `Board "${boardId}" not found`, isLoading: false });
        return;
      }

      const symbols = await getBoardSymbols(boardId);
      
      set({
        currentBoard: board,
        symbols,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading board:', error);
      set({ 
        error: 'Failed to load board', 
        isLoading: false 
      });
    }
  },

  navigateToBoard: async (boardId: string) => {
    const { currentBoard, navigationStack } = get();
    
    // Add current board to navigation stack
    if (currentBoard) {
      set({ navigationStack: [...navigationStack, currentBoard.id] });
    }
    
    await get().loadBoard(boardId);
  },

  navigateToCategory: async (categorySymbolId: string) => {
    // Look up the board ID for this category symbol
    const boardId = categoryToBoardMap[categorySymbolId];
    
    if (boardId) {
      await get().navigateToBoard(boardId);
    } else {
      console.warn(`No board found for category: ${categorySymbolId}`);
    }
  },

  goBack: async () => {
    const { navigationStack } = get();
    
    if (navigationStack.length === 0) {
      return;
    }

    const newStack = [...navigationStack];
    const previousBoardId = newStack.pop()!;
    
    set({ navigationStack: newStack });
    await get().loadBoard(previousBoardId);
  },

  goHome: async () => {
    set({ navigationStack: [] });
    await get().loadBoard('home');
  },

  canGoBack: () => {
    return get().navigationStack.length > 0;
  },
}));

