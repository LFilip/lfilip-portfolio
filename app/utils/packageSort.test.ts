import { sort } from './packageSort';

describe('sort', () => {
  describe('STANDARD packages', () => {
    it('returns STANDARD for small, light package', () => {
      expect(sort(10, 10, 10, 5)).toBe('STANDARD');
    });

    it('returns STANDARD just under all thresholds', () => {
      // Volume: 149 * 149 * 44 = 977,284 (under 1M)
      // No dimension >= 150, mass < 20
      expect(sort(149, 149, 44, 19.9)).toBe('STANDARD');
    });
  });

  describe('SPECIAL packages (heavy only)', () => {
    it('returns SPECIAL for heavy but not bulky package', () => {
      expect(sort(10, 10, 10, 20)).toBe('SPECIAL');
    });

    it('returns SPECIAL at exactly 20kg threshold', () => {
      expect(sort(50, 50, 50, 20)).toBe('SPECIAL');
    });
  });

  describe('SPECIAL packages (bulky only - by volume)', () => {
    it('returns SPECIAL for bulky by volume, not heavy', () => {
      // 100 * 100 * 100 = 1,000,000 cm³
      expect(sort(100, 100, 100, 10)).toBe('SPECIAL');
    });

    it('returns SPECIAL at exactly 1,000,000 cm³ threshold', () => {
      expect(sort(100, 100, 100, 19)).toBe('SPECIAL');
    });
  });

  describe('SPECIAL packages (bulky only - by dimension)', () => {
    it('returns SPECIAL when width >= 150', () => {
      expect(sort(150, 10, 10, 5)).toBe('SPECIAL');
    });

    it('returns SPECIAL when height >= 150', () => {
      expect(sort(10, 150, 10, 5)).toBe('SPECIAL');
    });

    it('returns SPECIAL when length >= 150', () => {
      expect(sort(10, 10, 150, 5)).toBe('SPECIAL');
    });
  });

  describe('REJECTED packages (both heavy and bulky)', () => {
    it('returns REJECTED for heavy and bulky by volume', () => {
      expect(sort(100, 100, 100, 20)).toBe('REJECTED');
    });

    it('returns REJECTED for heavy and bulky by dimension', () => {
      expect(sort(150, 10, 10, 25)).toBe('REJECTED');
    });

    it('returns REJECTED for heavy and bulky by both criteria', () => {
      expect(sort(200, 200, 200, 50)).toBe('REJECTED');
    });
  });

  describe('edge cases', () => {
    it('handles zero dimensions', () => {
      expect(sort(0, 0, 0, 0)).toBe('STANDARD');
    });

    it('handles very large values', () => {
      expect(sort(1000, 1000, 1000, 1000)).toBe('REJECTED');
    });
  });
});
