"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pet } from '../types/pet';

interface PetState {
  pet: Pet | null;
  feed: () => void;
  play: () => void;
  petAction: () => void;
  createPet: (name: string, emoji: string) => void;
  reset: () => void;
}

// Helper function to clamp values between 0 and 100
const clamp = (value: number, min: number = 0, max: number = 100): number => {
  return Math.min(Math.max(value, min), max);
};

// Create initial pet with full stats
const createInitialPet = (name: string = 'Meow Meow Fuzzyface', emoji: string = '🐱'): Pet => {
  return {
    id: crypto.randomUUID(),
    name: name,
    emoji: emoji,
    stats: {
      energy: 100,
      hunger: 100,
      happiness: 100,
    },
    createdAt: Date.now(),
    lastInteraction: Date.now(),
  };
};

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      // Initial state - no pet until user selects one
      pet: null,

      // Feed action - increases hunger and restores some energy
      feed: () =>
        set((state) => {
          if (!state.pet) return state;

          return {
            pet: {
              ...state.pet,
              stats: {
                ...state.pet.stats,
                hunger: clamp(state.pet.stats.hunger + 20),
                energy: clamp(state.pet.stats.energy + 10),
              },
              lastInteraction: Date.now(),
            },
          };
        }),

      // Play action - increases happiness, decreases energy
      play: () =>
        set((state) => {
          if (!state.pet) return state;

          return {
            pet: {
              ...state.pet,
              stats: {
                ...state.pet.stats,
                happiness: clamp(state.pet.stats.happiness + 15),
                energy: clamp(state.pet.stats.energy - 10),
              },
              lastInteraction: Date.now(),
            },
          };
        }),

      // Pet action - increases happiness
      petAction: () =>
        set((state) => {
          if (!state.pet) return state;

          return {
            pet: {
              ...state.pet,
              stats: {
                ...state.pet.stats,
                happiness: clamp(state.pet.stats.happiness + 10),
              },
              lastInteraction: Date.now(),
            },
          };
        }),

      // Create a new pet
      createPet: (name: string, emoji: string) =>
        set({
          pet: createInitialPet(name, emoji),
        }),

      // Reset store
      reset: () =>
        set({
          pet: createInitialPet(),
        }),
    }),
    {
      name: 'pet-storage',
    }
  )
);
