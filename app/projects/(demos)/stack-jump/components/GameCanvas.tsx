import type { GameState } from "../types/game";
import { GAME_WIDTH, GAME_HEIGHT } from "../constants/game";
import { Platform } from "./Platform";
import { Player } from "./Player";
import { Stack } from "./Stack";
import { GameOverlay } from "./GameOverlay";

interface GameCanvasProps {
  game: GameState;
  cameraOffset: number;
  onRetry: () => void;
}

export function GameCanvas({ game, cameraOffset, onRetry }: GameCanvasProps) {
  if (!game.platforms) {
    return (
      <div
        className="relative overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-900"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-zinc-900 to-zinc-800" />

      {/* Game elements container - scrolls with camera */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateX(${-cameraOffset}px)` }}
      >
        {/* Platforms */}
        {game.platforms.map((platform, i) => (
          <Platform
            key={i}
            platform={platform}
            index={i}
            currentPlatform={game.currentPlatform}
          />
        ))}

        {/* Stack */}
        <Stack
          isHolding={game.isHolding}
          stackHeight={game.stackHeight}
          holdStartX={game.holdStartX}
        />

        {/* Player */}
        <Player
          x={game.playerX}
          y={game.playerY}
          isHolding={game.isHolding}
          gameOver={game.gameOver}
        />
      </div>

      {/* Stack height indicator */}
      {game.isHolding && (
        <div className="absolute top-4 right-4 text-amber-400 font-mono text-lg">
          {Math.floor(game.stackHeight)}px
        </div>
      )}

      {/* Game Over Overlay */}
      {game.gameOver && <GameOverlay score={game.score} onRetry={onRetry} />}
    </div>
  );
}
