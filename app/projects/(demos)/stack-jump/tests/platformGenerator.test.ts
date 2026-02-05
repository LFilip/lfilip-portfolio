import { generatePlatforms } from "../utils/platformGenerator";
import {
  STARTING_PLATFORM_X,
  STARTING_PLATFORM_WIDTH,
  MIN_GAP,
  MAX_GAP,
  MIN_PLATFORM_WIDTH,
  MAX_PLATFORM_WIDTH,
  INITIAL_PLATFORM_COUNT,
} from "../constants/game";

describe("generatePlatforms", () => {
  it("generates the correct number of platforms", () => {
    const platforms = generatePlatforms();
    // First platform + INITIAL_PLATFORM_COUNT more
    expect(platforms).toHaveLength(INITIAL_PLATFORM_COUNT + 1);
  });

  it("starts at the correct position with correct width", () => {
    const platforms = generatePlatforms();
    expect(platforms[0].x).toBe(STARTING_PLATFORM_X);
    expect(platforms[0].width).toBe(STARTING_PLATFORM_WIDTH);
  });

  it("generates platforms with valid gaps", () => {
    const platforms = generatePlatforms();

    for (let i = 1; i < platforms.length; i++) {
      const prevEnd = platforms[i - 1].x + platforms[i - 1].width;
      const gap = platforms[i].x - prevEnd;

      expect(gap).toBeGreaterThanOrEqual(MIN_GAP);
      expect(gap).toBeLessThanOrEqual(MAX_GAP);
    }
  });

  it("generates platforms with valid widths", () => {
    const platforms = generatePlatforms();

    // First platform has fixed width
    expect(platforms[0].width).toBe(STARTING_PLATFORM_WIDTH);

    // Rest have random widths in range
    for (let i = 1; i < platforms.length; i++) {
      expect(platforms[i].width).toBeGreaterThanOrEqual(MIN_PLATFORM_WIDTH);
      expect(platforms[i].width).toBeLessThanOrEqual(MAX_PLATFORM_WIDTH);
    }
  });

  it("produces deterministic results with seed", () => {
    const platforms1 = generatePlatforms(42);
    const platforms2 = generatePlatforms(42);

    expect(platforms1).toEqual(platforms2);
  });

  it("produces different results with different seeds", () => {
    const platforms1 = generatePlatforms(42);
    const platforms2 = generatePlatforms(123);

    // Check that at least the second platform differs
    expect(platforms1[1]).not.toEqual(platforms2[1]);
  });

  it("platforms are arranged left to right", () => {
    const platforms = generatePlatforms();

    for (let i = 1; i < platforms.length; i++) {
      expect(platforms[i].x).toBeGreaterThan(platforms[i - 1].x);
    }
  });
});
