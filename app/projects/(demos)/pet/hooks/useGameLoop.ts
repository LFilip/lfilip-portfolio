"use client";

import { useEffect } from 'react';
import { usePetStore } from '../stores/petStore';

/**
 * Game loop hook that drains pet stats over time
 *
 * Stats decrease every 10 seconds:
 * - Hunger: -3 (gets hungry over time)
 * - Happiness: -2 (gets bored/lonely)
 * - Energy: -1 (gets tired slowly)
 */
export const useGameLoop = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const state = usePetStore.getState();

      if (!state.pet) return;

      // Calculate time since last interaction
      const timeSinceInteraction = Date.now() - state.pet.lastInteraction;
      const thirtySecondsInMs = 30 * 1000;

      // Drain stats every 10 seconds
      const newStats = {
        hunger: Math.max(0, state.pet.stats.hunger - 3),
        happiness: Math.max(0, state.pet.stats.happiness - 2),
        energy: Math.max(0, state.pet.stats.energy - 1),
      };

      // If pet hasn't been interacted with in 30 seconds, drain faster
      if (timeSinceInteraction > thirtySecondsInMs) {
        newStats.happiness = Math.max(0, newStats.happiness - 2); // Extra loneliness penalty
      }

      // Update the pet stats
      usePetStore.setState({
        pet: {
          ...state.pet,
          stats: newStats,
        }
      });
    }, 10000); // Run every 10 seconds

    return () => clearInterval(interval);
  }, []);
};
