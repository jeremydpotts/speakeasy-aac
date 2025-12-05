// Main App Component
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { SymbolGrid } from './components/SymbolGrid';
import { SettingsPanel } from './components/SettingsPanel';
import { useBoardStore } from './stores/boardStore';
import { useSettingsStore, initializeTheme } from './stores/settingsStore';
import { initializeDatabase } from './data/db';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { currentBoard, symbols, isLoading, error, loadBoard } = useBoardStore();
  const { defaultGridSize, lastBoardId } = useSettingsStore();

  // Initialize app
  useEffect(() => {
    const init = async () => {
      // Initialize theme
      initializeTheme();
      
      // Initialize database with default data
      await initializeDatabase();
      
      // Load the last viewed board (or home)
      await loadBoard(lastBoardId || 'home');
      
      setIsInitialized(true);
    };

    init();
  }, []);

  // Save current board ID to settings
  useEffect(() => {
    if (currentBoard) {
      useSettingsStore.getState().setLastBoardId(currentBoard.id);
    }
  }, [currentBoard?.id]);

  // Loading state
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
            Loading SpeakEasy...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Something went wrong
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary px-6"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen h-[100dvh] flex flex-col overflow-hidden bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden pt-16">
        {currentBoard && (
          <SymbolGrid 
            symbols={symbols} 
            gridSize={currentBoard.gridSize || defaultGridSize} 
          />
        )}
      </main>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}

export default App;
