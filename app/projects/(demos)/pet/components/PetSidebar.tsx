"use client";

import { useState } from 'react';
import { usePetStore } from '../stores/petStore';
import { PetNavigation } from './PetNavigation';
import { StatBar } from './StatBar';

export const PetSidebar = () => {
  const pet = usePetStore((state) => state.pet);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!pet) return null;

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-zinc-900 border-r border-zinc-800 p-4 overflow-y-auto">
      {/* Pet Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-zinc-100">Your Pet</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-zinc-400 hover:text-zinc-200 text-xl transition-colors"
            aria-label={isExpanded ? 'Collapse pet stats' : 'Expand pet stats'}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '◀' : '▶'}
          </button>
        </div>

        {isExpanded ? (
          <div className="space-y-4">
            {/* Pet Emoji and Name */}
            <div className="text-center">
              <div className="text-7xl mb-2 animate-bounce">{pet.emoji}</div>
              <h3 className="font-bold text-lg text-zinc-100">{pet.name}</h3>
            </div>

            {/* Stat Bars */}
            <div className="space-y-2">
              <StatBar label="Energy" value={pet.stats.energy} color="yellow" />
              <StatBar label="Hunger" value={pet.stats.hunger} color="orange" />
              <StatBar label="Happiness" value={pet.stats.happiness} color="pink" />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-2">{pet.emoji}</div>
            <div className="text-xs space-y-1 text-zinc-400">
              <div>Energy: {pet.stats.energy}</div>
              <div>Hunger: {pet.stats.hunger}</div>
              <div>Happiness: {pet.stats.happiness}</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation (Desktop only) */}
      <PetNavigation />
    </aside>
  );
};
