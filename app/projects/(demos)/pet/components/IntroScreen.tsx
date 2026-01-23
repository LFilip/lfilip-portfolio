"use client";

import { useState } from 'react';
import { CreatePetModal } from './CreatePetModal';

interface IntroScreenProps {
  onStart: (data: { name: string; emoji: string }) => void;
}

// Default pet options for quick start
const DEFAULT_PETS = [
  { name: 'Buddy', emoji: '🐱' },
  { name: 'Max', emoji: '🐶' },
  { name: 'Chirpy', emoji: '🐦' },
];

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickStart = (pet: { name: string; emoji: string }) => {
    onStart(pet);
  };

  const handleCustomCreate = (pet: { name: string; emoji: string }) => {
    setIsModalOpen(false);
    onStart(pet);
  };

  return (
    <div className="flex items-center justify-center p-4 overflow-y-auto min-h-[60vh]">
      <div className="max-w-4xl w-full mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-100">
            Welcome to LocalPet!
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl">
            Choose your companion to start your adventure
          </p>
        </div>

        {/* Pet Selection Bubbles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Default Pet Options */}
          {DEFAULT_PETS.map((pet) => (
            <button
              key={pet.name}
              onClick={() => handleQuickStart(pet)}
              className="group bg-zinc-900 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-zinc-800 hover:border-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              <div className="text-center">
                <div className="text-8xl mb-4 group-hover:animate-bounce">
                  {pet.emoji}
                </div>
                <h3 className="text-2xl font-bold text-zinc-100 mb-2">
                  {pet.name}
                </h3>
                <p className="text-zinc-500 text-sm">
                  Click to start!
                </p>
              </div>
            </button>
          ))}

          {/* Create New Pet Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group bg-zinc-900 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-zinc-800 border-dashed hover:border-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <div className="text-center flex flex-col items-center justify-center h-full">
              <div className="text-8xl mb-4 text-emerald-500 group-hover:rotate-90 transition-transform duration-300">
                +
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-2">
                Create New
              </h3>
              <p className="text-zinc-500 text-sm">
                Customize your pet
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-zinc-600">
          Your adventure begins here
        </p>
      </div>

      {/* Create Pet Modal */}
      <CreatePetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCustomCreate}
      />
    </div>
  );
};
