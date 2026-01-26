# Package Sorting System

A robotic arm dispatch controller for sorting packages into the correct stacks based on their dimensions and mass.

## The Problem

In an automated factory, packages must be routed to different handling stacks:

- **STANDARD** - Normal packages handled automatically
- **SPECIAL** - Packages requiring manual handling (too heavy OR too bulky)
- **REJECTED** - Packages that cannot be processed (both heavy AND bulky)

## Classification Rules

### Bulky Package
A package is **bulky** if:
- Volume (W × H × L) ≥ 1,000,000 cm³, OR
- Any single dimension ≥ 150 cm

### Heavy Package
A package is **heavy** if:
- Mass ≥ 20 kg

### Stack Assignment
| Bulky | Heavy | Stack    |
|-------|-------|----------|
| No    | No    | STANDARD |
| Yes   | No    | SPECIAL  |
| No    | Yes   | SPECIAL  |
| Yes   | Yes   | REJECTED |

## Implementation

### Core Function

```typescript
// app/utils/packageSort.ts

export type Stack = 'STANDARD' | 'SPECIAL' | 'REJECTED';

export function sort(width: number, height: number, length: number, mass: number): Stack {
  const volume = width * height * length;
  const isBulky = volume >= 1_000_000 || width >= 150 || height >= 150 || length >= 150;
  const isHeavy = mass >= 20;

  if (isBulky && isHeavy) return 'REJECTED';
  if (isBulky || isHeavy) return 'SPECIAL';
  return 'STANDARD';
}
```

### Why This Works

1. **Calculate volume** - Multiply all three dimensions
2. **Check bulky conditions** - Volume threshold OR any dimension threshold
3. **Check heavy condition** - Simple mass comparison
4. **Apply logic** - Both flags = REJECTED, either flag = SPECIAL, neither = STANDARD

## Running Tests

```bash
npm test -- packageSort
```

Test coverage includes:
- Standard packages (small and light)
- Heavy-only packages → SPECIAL
- Bulky-only packages (by volume) → SPECIAL
- Bulky-only packages (by dimension) → SPECIAL
- Both heavy and bulky → REJECTED
- Edge cases at exact thresholds

## Demo

Visit `/projects/package-sorter` to try the interactive dashboard:

1. Adjust the sliders for width, height, length, and mass
2. See real-time classification as values change
3. Click "Sort Package" to add to history
4. View stats for each stack type
