"use client";

import { usePetStore } from '../stores/petStore';

export const Pet = () => {
  const pet = usePetStore((state) => state.pet);

  if (!pet) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-zinc-400 text-lg">No pet yet! Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 relative">
      {/* Name bubble - positioned above and to the right */}
      <div className="relative mb-4 self-end mr-12">
        <div className="bg-zinc-800 border-2 border-zinc-700 rounded-2xl px-4 py-2 shadow-lg relative">
          <p className="text-zinc-100 font-semibold text-sm whitespace-nowrap">
            {pet.name}
          </p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-zinc-800 border-r-2 border-b-2 border-zinc-700 transform rotate-45"></div>
        </div>
      </div>

      {/* Pet emoji - large and centered */}
      <div className="text-9xl select-none animate-bounce hover:animate-pulse cursor-pointer transition-transform hover:scale-110">
        {pet.emoji}
      </div>

      {/* Stats display */}
      <div className="mt-8 w-full max-w-xs space-y-3">
        {/* Energy stat */}
        <div className="flex items-center justify-between bg-yellow-900/30 border-2 border-yellow-600/50 rounded-lg px-4 py-2">
          <span className="font-semibold text-yellow-400">Energy</span>
          <span className="text-yellow-300 font-bold">{pet.stats.energy}</span>
        </div>

        {/* Hunger stat */}
        <div className="flex items-center justify-between bg-orange-900/30 border-2 border-orange-600/50 rounded-lg px-4 py-2">
          <span className="font-semibold text-orange-400">Hunger</span>
          <span className="text-orange-300 font-bold">{pet.stats.hunger}</span>
        </div>

        {/* Happiness stat */}
        <div className="flex items-center justify-between bg-pink-900/30 border-2 border-pink-600/50 rounded-lg px-4 py-2">
          <span className="font-semibold text-pink-400">Happiness</span>
          <span className="text-pink-300 font-bold">{pet.stats.happiness}</span>
        </div>
      </div>
    </div>
  );
};
