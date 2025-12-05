// Symbol Grid Component - Displays symbols in a responsive grid
import { clsx } from 'clsx';
import type { Symbol, GridSize } from '../types';
import { SymbolCard } from './SymbolCard';
import { GRID_DIMENSIONS } from '../types';

interface SymbolGridProps {
  symbols: Symbol[];
  gridSize: GridSize;
}

export function SymbolGrid({ symbols, gridSize }: SymbolGridProps) {
  const columns = GRID_DIMENSIONS[gridSize];
  const totalCells = columns * columns;
  
  // Fill empty cells if needed
  const displaySymbols = [...symbols];
  while (displaySymbols.length < totalCells) {
    displaySymbols.push(null as any); // Empty cells
  }

  return (
    <div 
      className={clsx(
        'grid gap-2 sm:gap-3 p-3 sm:p-4 h-full',
        'auto-rows-fr'
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${columns}, 1fr)`,
      }}
    >
      {displaySymbols.slice(0, totalCells).map((symbol, index) => (
        symbol ? (
          <SymbolCard key={symbol.id} symbol={symbol} />
        ) : (
          <div 
            key={`empty-${index}`} 
            className="rounded-xl bg-slate-100 dark:bg-slate-800/50 opacity-30"
            aria-hidden="true"
          />
        )
      ))}
    </div>
  );
}

