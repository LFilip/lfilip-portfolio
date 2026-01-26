'use client';

import { useState, useEffect, useCallback } from 'react';

interface Block {
  id: string;
  name: string;
  maxHealth: number;
  reward: number;
  color: string;
  crackColor: string;
}

const BLOCKS: Block[] = [
  { id: 'dirt', name: 'Dirt', maxHealth: 5, reward: 1, color: '#8B6914', crackColor: '#5C4A0F' },
  { id: 'stone', name: 'Stone', maxHealth: 15, reward: 3, color: '#7F7F7F', crackColor: '#4A4A4A' },
  { id: 'coal', name: 'Coal', maxHealth: 25, reward: 8, color: '#2A2A2A', crackColor: '#1A1A1A' },
  { id: 'iron', name: 'Iron', maxHealth: 40, reward: 15, color: '#D4B59E', crackColor: '#8B6914' },
  { id: 'gold', name: 'Gold', maxHealth: 60, reward: 30, color: '#FFD700', crackColor: '#B8960F' },
  { id: 'diamond', name: 'Diamond', maxHealth: 100, reward: 75, color: '#4AEDD9', crackColor: '#2A9D8F' },
];

const PICKAXES = [
  { level: 1, name: 'Wooden Pickaxe', damage: 1, cost: 0 },
  { level: 2, name: 'Stone Pickaxe', damage: 2, cost: 50 },
  { level: 3, name: 'Iron Pickaxe', damage: 4, cost: 200 },
  { level: 4, name: 'Gold Pickaxe', damage: 7, cost: 500 },
  { level: 5, name: 'Diamond Pickaxe', damage: 12, cost: 1500 },
];

const AUTO_MINERS = [
  { level: 0, name: 'None', dps: 0, cost: 0 },
  { level: 1, name: 'Wooden Auto-Miner', dps: 1, cost: 100 },
  { level: 2, name: 'Stone Auto-Miner', dps: 3, cost: 400 },
  { level: 3, name: 'Iron Auto-Miner', dps: 8, cost: 1200 },
  { level: 4, name: 'Gold Auto-Miner', dps: 20, cost: 4000 },
  { level: 5, name: 'Diamond Auto-Miner', dps: 50, cost: 12000 },
];

export default function BlockMinerPage() {
  const [coins, setCoins] = useState(0);
  const [blockIndex, setBlockIndex] = useState(0);
  const [blockHealth, setBlockHealth] = useState(BLOCKS[0].maxHealth);
  const [pickaxeLevel, setPickaxeLevel] = useState(1);
  const [autoMinerLevel, setAutoMinerLevel] = useState(0);
  const [totalMined, setTotalMined] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isShaking, setIsShaking] = useState(false);

  const currentBlock = BLOCKS[blockIndex];
  const currentPickaxe = PICKAXES[pickaxeLevel - 1];
  const currentAutoMiner = AUTO_MINERS[autoMinerLevel];
  const nextPickaxe = PICKAXES[pickaxeLevel] || null;
  const nextAutoMiner = AUTO_MINERS[autoMinerLevel + 1] || null;

  const damagePercent = ((currentBlock.maxHealth - blockHealth) / currentBlock.maxHealth) * 100;

  const mineBlock = useCallback((damage: number) => {
    setBlockHealth((prev) => {
      const newHealth = prev - damage;
      if (newHealth <= 0) {
        setCoins((c) => c + currentBlock.reward);
        setTotalMined((t) => t + 1);
        const nextIndex = (blockIndex + 1) % BLOCKS.length;
        setBlockIndex(nextIndex);
        return BLOCKS[nextIndex].maxHealth;
      }
      return newHealth;
    });
  }, [blockIndex, currentBlock.reward]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClicks((prev) => [...prev, { id: Date.now(), x, y }]);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 100);

    mineBlock(currentPickaxe.damage);

    setTimeout(() => {
      setClicks((prev) => prev.slice(1));
    }, 500);
  };

  const buyPickaxe = () => {
    if (nextPickaxe && coins >= nextPickaxe.cost) {
      setCoins((c) => c - nextPickaxe.cost);
      setPickaxeLevel(nextPickaxe.level);
    }
  };

  const buyAutoMiner = () => {
    if (nextAutoMiner && coins >= nextAutoMiner.cost) {
      setCoins((c) => c - nextAutoMiner.cost);
      setAutoMinerLevel(nextAutoMiner.level);
    }
  };

  // Auto-miner effect
  useEffect(() => {
    if (currentAutoMiner.dps === 0) return;

    const interval = setInterval(() => {
      mineBlock(currentAutoMiner.dps / 10);
    }, 100);

    return () => clearInterval(interval);
  }, [currentAutoMiner.dps, mineBlock]);

  return (
    <main className="min-h-screen bg-[#1a1a2e] p-4 select-none">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white text-center mb-2 font-mono">
          ⛏️ Block Miner
        </h1>

        {/* Stats */}
        <div className="flex justify-between text-sm mb-4 px-2">
          <span className="text-yellow-400 font-mono">💰 {coins}</span>
          <span className="text-gray-400 font-mono">Mined: {totalMined}</span>
        </div>

        {/* Block Area */}
        <div
          className={`relative w-48 h-48 mx-auto mb-6 cursor-pointer ${isShaking ? 'animate-shake' : ''}`}
          onClick={handleClick}
          style={{
            imageRendering: 'pixelated',
          }}
        >
          {/* Block */}
          <div
            className="w-full h-full rounded-sm border-4 transition-colors"
            style={{
              backgroundColor: currentBlock.color,
              borderColor: currentBlock.crackColor,
              boxShadow: `inset -8px -8px 0 ${currentBlock.crackColor}, inset 8px 8px 0 rgba(255,255,255,0.2)`,
            }}
          >
            {/* Crack overlay */}
            {damagePercent > 20 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    ${currentBlock.crackColor}40 10px,
                    ${currentBlock.crackColor}40 ${Math.min(damagePercent / 10, 12)}px
                  )`,
                  opacity: damagePercent / 100,
                }}
              />
            )}

            {/* Pixel texture */}
            <div
              className="absolute inset-2 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #000 25%, transparent 25%),
                  linear-gradient(-45deg, #000 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #000 75%),
                  linear-gradient(-45deg, transparent 75%, #000 75%)
                `,
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              }}
            />
          </div>

          {/* Click effects */}
          {clicks.map((click) => (
            <div
              key={click.id}
              className="absolute text-yellow-300 font-bold text-lg pointer-events-none animate-float-up font-mono"
              style={{ left: click.x, top: click.y }}
            >
              -{currentPickaxe.damage}
            </div>
          ))}
        </div>

        {/* Block Info */}
        <div className="text-center mb-6">
          <p className="text-white font-mono text-lg">{currentBlock.name}</p>
          <div className="w-48 h-4 bg-gray-700 rounded mx-auto mt-2 overflow-hidden border border-gray-600">
            <div
              className="h-full bg-red-500 transition-all duration-100"
              style={{ width: `${(blockHealth / currentBlock.maxHealth) * 100}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-1 font-mono">
            {Math.ceil(blockHealth)} / {currentBlock.maxHealth}
          </p>
          <p className="text-yellow-400 text-sm font-mono">+{currentBlock.reward} 💰</p>
        </div>

        {/* Upgrades */}
        <div className="space-y-3">
          {/* Current Equipment */}
          <div className="bg-[#252542] rounded-lg p-3 text-sm">
            <p className="text-gray-400 font-mono">Equipped:</p>
            <p className="text-white font-mono">⛏️ {currentPickaxe.name} ({currentPickaxe.damage} dmg/click)</p>
            {autoMinerLevel > 0 && (
              <p className="text-white font-mono">🤖 {currentAutoMiner.name} ({currentAutoMiner.dps} dmg/sec)</p>
            )}
          </div>

          {/* Pickaxe Upgrade */}
          {nextPickaxe && (
            <button
              onClick={buyPickaxe}
              disabled={coins < nextPickaxe.cost}
              className={`w-full p-3 rounded-lg font-mono text-left transition-colors ${
                coins >= nextPickaxe.cost
                  ? 'bg-green-700 hover:bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>⛏️ {nextPickaxe.name}</span>
                <span className="text-yellow-400">{nextPickaxe.cost} 💰</span>
              </div>
              <p className="text-sm opacity-75">{nextPickaxe.damage} damage per click</p>
            </button>
          )}

          {/* Auto-Miner Upgrade */}
          {nextAutoMiner && (
            <button
              onClick={buyAutoMiner}
              disabled={coins < nextAutoMiner.cost}
              className={`w-full p-3 rounded-lg font-mono text-left transition-colors ${
                coins >= nextAutoMiner.cost
                  ? 'bg-blue-700 hover:bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>🤖 {nextAutoMiner.name}</span>
                <span className="text-yellow-400">{nextAutoMiner.cost} 💰</span>
              </div>
              <p className="text-sm opacity-75">{nextAutoMiner.dps} damage per second</p>
            </button>
          )}
        </div>

        {/* Max level message */}
        {!nextPickaxe && !nextAutoMiner && (
          <div className="text-center text-green-400 font-mono mt-4">
            🎉 All upgrades maxed! Keep mining!
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px);
          }
        }
        .animate-float-up {
          animation: float-up 0.5s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.1s ease-in-out;
        }
      `}</style>
    </main>
  );
}
