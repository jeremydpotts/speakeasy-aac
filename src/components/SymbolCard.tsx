// Symbol Card Component - Individual clickable symbol
import { useState } from 'react';
import { clsx } from 'clsx';
import type { Symbol } from '../types';
import { useSpeechStore } from '../stores/speechStore';
import { useBoardStore } from '../stores/boardStore';
import { useSettingsStore } from '../stores/settingsStore';

interface SymbolCardProps {
  symbol: Symbol;
}

export function SymbolCard({ symbol }: SymbolCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { speakWord, isSpeaking, currentWord } = useSpeechStore();
  const { navigateToCategory } = useBoardStore();
  const { showLabels } = useSettingsStore();
  
  const isCurrentlySpeaking = isSpeaking && currentWord === symbol.label;

  const handleClick = async () => {
    if (symbol.isCategory) {
      // Navigate to the category board
      await navigateToCategory(symbol.id);
    } else {
      // Speak the word
      await speakWord(symbol.label);
    }
  };

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  // Generate a placeholder SVG for missing images
  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${symbol.backgroundColor || '#e2e8f0'}" rx="8"/>
      <text x="50" y="55" text-anchor="middle" font-size="14" font-family="system-ui" fill="#1e293b">
        ${symbol.label.slice(0, 8)}
      </text>
    </svg>
  `)}`;

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => setIsPressed(false)}
      className={clsx(
        'relative flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer select-none',
        'transition-all duration-150 ease-out',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-400',
        symbol.isCategory ? 'category-card' : 'symbol-card',
        {
          'scale-95 shadow-sm': isPressed,
          'ring-4 ring-blue-400 ring-opacity-60 animate-pulse': isCurrentlySpeaking,
        }
      )}
      style={{
        backgroundColor: symbol.isCategory ? symbol.backgroundColor : undefined,
      }}
      aria-label={`${symbol.label}${symbol.isCategory ? ' category' : ''}`}
    >
      {/* Symbol Image */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0 p-1">
        <img
          src={imageError ? placeholderImage : symbol.imageUrl}
          alt=""
          onError={() => setImageError(true)}
          className={clsx(
            'max-w-full max-h-full object-contain',
            symbol.isCategory && 'brightness-0 invert' // White icons on colored background
          )}
          draggable={false}
        />
      </div>
      
      {/* Label */}
      {showLabels && (
        <span 
          className={clsx(
            'text-center font-semibold leading-tight mt-1 px-1',
            'text-xs sm:text-sm',
            symbol.isCategory ? 'text-white' : 'text-slate-700 dark:text-slate-200'
          )}
        >
          {symbol.label}
        </span>
      )}

      {/* Speaking indicator */}
      {isCurrentlySpeaking && (
        <div className="absolute inset-0 rounded-xl bg-blue-400/20 pointer-events-none" />
      )}
    </button>
  );
}

