"use client";

import { Pet } from './Pet';
import { ActionButtons } from './ActionButtons';

export const PetSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-100 mb-8 text-center">
          Virtual Pet Game
        </h2>
        <Pet />
        <div className="mt-8">
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};
