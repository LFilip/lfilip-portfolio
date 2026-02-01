import type { Platform } from "../types/game";
import {
  MIN_GAP,
  MAX_GAP,
  MIN_PLATFORM_WIDTH,
  MAX_PLATFORM_WIDTH,
  INITIAL_PLATFORM_COUNT,
  STARTING_PLATFORM_WIDTH,
  STARTING_PLATFORM_X,
} from "../constants/game";

// Simple seeded random number generator for deterministic testing
function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export function generatePlatforms(seed?: number): Platform[] {
  const random = seed !== undefined ? createSeededRandom(seed) : Math.random;
  const platforms: Platform[] = [];
  let x = STARTING_PLATFORM_X;

  // First platform (starting platform)
  platforms.push({ x, width: STARTING_PLATFORM_WIDTH });
  x += STARTING_PLATFORM_WIDTH;

  // Generate more platforms
  for (let i = 0; i < INITIAL_PLATFORM_COUNT; i++) {
    const gap = MIN_GAP + random() * (MAX_GAP - MIN_GAP);
    x += gap;
    const width = MIN_PLATFORM_WIDTH + random() * (MAX_PLATFORM_WIDTH - MIN_PLATFORM_WIDTH);
    platforms.push({ x, width });
    x += width;
  }

  return platforms;
}
