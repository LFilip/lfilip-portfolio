"use client";

import { usePetStore } from '../stores/petStore';

interface PetHeaderProps {
  onReset: () => void;
}

export const PetHeader = ({ onReset }: PetHeaderProps) => {
  const pet = usePetStore((state) => state.pet);

  return (
    <header className="bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800 px-3 py-2 md:px-6 md:py-4">
      <div className="flex items-center justify-between gap-2">
        {/* Logo/Branding - Shorter on mobile */}
        <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-shrink">
          <h1 className="text-base md:text-2xl font-bold text-zinc-100 truncate">
            <span className="hidden sm:inline">LocalPet Demo</span>
            <span className="sm:hidden">LocalPet</span>
          </h1>
        </div>

        {/* Center Section: Pet Status (mobile only) */}
        {pet && (
          <div className="md:hidden flex items-center gap-1 text-xs flex-shrink-0">
            <span className="text-xl">{pet.emoji}</span>
            <div className="flex flex-col gap-0 leading-tight text-zinc-400">
              <span title="Energy" className="whitespace-nowrap">E:{pet.stats.energy}</span>
              <span title="Happiness" className="whitespace-nowrap">H:{pet.stats.happiness}</span>
            </div>
          </div>
        )}

        {/* Right Section: Reset */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Reset Button */}
          <button
            onClick={onReset}
            className="bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-700 hover:border-zinc-600 text-zinc-300 font-semibold px-2 py-2 md:px-4 md:py-2 rounded-lg transition-all hover:shadow-lg text-xs md:text-base whitespace-nowrap"
            aria-label="Choose a different pet"
          >
            <span className="hidden md:inline">Choose Different Pet</span>
            <span className="md:hidden">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
