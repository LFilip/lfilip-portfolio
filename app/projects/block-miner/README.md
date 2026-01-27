# Block Miner

A Minecraft-style clicker game where you mine blocks, earn coins, and upgrade your equipment.

## How to Play

1. **Click/tap the block** to mine it
2. **Earn coins** when blocks break
3. **Buy upgrades** to mine faster
4. **Unlock auto-miners** for passive income

## Game Mechanics

### Block Types

Blocks cycle through in order of difficulty:

| Block   | Health | Reward |
|---------|--------|--------|
| Dirt    | 5      | 1 💰   |
| Stone   | 15     | 3 💰   |
| Coal    | 25     | 8 💰   |
| Iron    | 40     | 15 💰  |
| Gold    | 60     | 30 💰  |
| Diamond | 100    | 75 💰  |

### Pickaxe Upgrades

Increase damage per click:

| Pickaxe  | Damage | Cost   |
|----------|--------|--------|
| Wooden   | 1      | Free   |
| Stone    | 2      | 50 💰  |
| Iron     | 4      | 200 💰 |
| Gold     | 7      | 500 💰 |
| Diamond  | 12     | 1500 💰|

### Auto-Miners

Deal passive damage per second:

| Auto-Miner | DPS | Cost    |
|------------|-----|---------|
| Wooden     | 1   | 100 💰  |
| Stone      | 3   | 400 💰  |
| Iron       | 8   | 1200 💰 |
| Gold       | 20  | 4000 💰 |
| Diamond    | 50  | 12000 💰|

## Implementation

### Core State

```typescript
const [coins, setCoins] = useState(0);
const [blockIndex, setBlockIndex] = useState(0);
const [blockHealth, setBlockHealth] = useState(BLOCKS[0].maxHealth);
const [pickaxeLevel, setPickaxeLevel] = useState(1);
const [autoMinerLevel, setAutoMinerLevel] = useState(0);
```

### Mining Logic

```typescript
const mineBlock = useCallback((damage: number) => {
  setBlockHealth((prev) => {
    const newHealth = prev - damage;
    if (newHealth <= 0) {
      // Block destroyed - give reward and spawn next block
      setCoins((c) => c + currentBlock.reward);
      const nextIndex = (blockIndex + 1) % BLOCKS.length;
      setBlockIndex(nextIndex);
      return BLOCKS[nextIndex].maxHealth;
    }
    return newHealth;
  });
}, [blockIndex, currentBlock.reward]);
```

### Auto-Miner Effect

```typescript
useEffect(() => {
  if (currentAutoMiner.dps === 0) return;

  const interval = setInterval(() => {
    mineBlock(currentAutoMiner.dps / 10);
  }, 100);

  return () => clearInterval(interval);
}, [currentAutoMiner.dps, mineBlock]);
```

## Features

- **Mobile-friendly** - Simple tap controls work on any device
- **Pixel art aesthetic** - Minecraft-inspired block design
- **Satisfying feedback** - Screen shake, damage numbers, crack animations
- **Idle progression** - Auto-miners let you earn while away

## Demo

Visit `/projects/block-miner` to play the game.
