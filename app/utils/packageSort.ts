export type Stack = 'STANDARD' | 'SPECIAL' | 'REJECTED';

/**
 * Sorts packages into appropriate stacks based on dimensions and mass.
 *
 * @param width - Package width in centimeters
 * @param height - Package height in centimeters
 * @param length - Package length in centimeters
 * @param mass - Package mass in kilograms
 * @returns Stack name: 'STANDARD', 'SPECIAL', or 'REJECTED'
 */
export function sort(width: number, height: number, length: number, mass: number): Stack {
  const volume = width * height * length;
  const isBulky = volume >= 1_000_000 || width >= 150 || height >= 150 || length >= 150;
  const isHeavy = mass >= 20;

  if (isBulky && isHeavy) return 'REJECTED';
  if (isBulky || isHeavy) return 'SPECIAL';
  return 'STANDARD';
}
