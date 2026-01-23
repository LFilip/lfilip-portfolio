"use client";

import { usePetStore } from '../stores/petStore';

export const ActionButtons = () => {
  const feed = usePetStore((state) => state.feed);
  const play = usePetStore((state) => state.play);
  const petAction = usePetStore((state) => state.petAction);

  return (
    <div className="flex gap-4 justify-center items-center flex-wrap">
      {/* Feed Button */}
      <button
        onClick={feed}
        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-2xl active:scale-95 border-4 border-orange-700 min-w-[140px]"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl">🍕</span>
          <span className="text-lg">Feed</span>
        </div>
      </button>

      {/* Play Button */}
      <button
        onClick={play}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-2xl active:scale-95 border-4 border-blue-700 min-w-[140px]"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl">🎮</span>
          <span className="text-lg">Play</span>
        </div>
      </button>

      {/* Pet Button */}
      <button
        onClick={petAction}
        className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-2xl active:scale-95 border-4 border-pink-700 min-w-[140px]"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl">❤️</span>
          <span className="text-lg">Pet</span>
        </div>
      </button>
    </div>
  );
};
