import { useState, useCallback, useRef, useEffect } from "react";
import type { GameState, GameActions } from "../types/game";
import { generatePlatforms } from "../utils/platformGenerator";
import {
  GROUND_Y,
  PLAYER_SIZE,
  STACK_GROWTH_RATE,
  WALK_SPEED,
  HIGH_SCORE_KEY,
} from "../constants/game";

function getDefaultState(): GameState {
  return {
    platforms: null, // null until hydrated on client
    currentPlatform: 0,
    playerX: 0,
    playerY: GROUND_Y - PLAYER_SIZE,
    stackHeight: 0,
    isHolding: false,
    isWalking: false,
    walkProgress: 0,
    walkStartX: 0,
    walkStartY: 0,
    holdStartX: 0,
    gameOver: false,
    score: 0,
    highScore: 0,
    isHydrated: false,
  };
}

function createInitialState(): GameState {
  const platforms = generatePlatforms();
  const highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10);

  return {
    platforms,
    currentPlatform: 0,
    playerX: platforms[0].x + platforms[0].width / 2 - PLAYER_SIZE / 2,
    playerY: GROUND_Y - PLAYER_SIZE,
    stackHeight: 0,
    isHolding: false,
    isWalking: false,
    walkProgress: 0,
    walkStartX: 0,
    walkStartY: 0,
    holdStartX: 0,
    gameOver: false,
    score: 0,
    highScore,
    isHydrated: true,
  };
}

export function useGameLoop(): [GameState, GameActions] {
  const [game, setGame] = useState<GameState>(getDefaultState);
  const gameLoopRef = useRef<number | null>(null);

  // Hydrate on client mount - this fixes the hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGame(createInitialState());
  }, []);

  const resetGame = useCallback(() => {
    setGame(createInitialState());
  }, []);

  const startHold = useCallback(() => {
    setGame((prev) => {
      if (prev.isWalking || prev.gameOver || !prev.platforms) return prev;
      return {
        ...prev,
        isHolding: true,
        stackHeight: 0,
        holdStartX: prev.playerX, // Store where player is when hold starts
      };
    });
  }, []);

  const releaseHold = useCallback(() => {
    setGame((prev) => {
      if (!prev.isHolding || prev.isWalking) return prev;
      // Player starts at top of the stack
      const topOfStackY = GROUND_Y - PLAYER_SIZE - prev.stackHeight;
      return {
        ...prev,
        isHolding: false,
        isWalking: true,
        walkProgress: 0,
        playerY: topOfStackY, // Move player to top of stack
        walkStartX: prev.playerX, // Store for trail rendering
        walkStartY: topOfStackY, // Store for trail rendering
      };
    });
  }, []);

  // Game loop
  useEffect(() => {
    const tick = () => {
      setGame((prev) => {
        if (prev.gameOver || !prev.platforms) return prev;

        // Growing stack while holding
        if (prev.isHolding) {
          return {
            ...prev,
            stackHeight: prev.stackHeight + STACK_GROWTH_RATE,
          };
        }

        // Walking the stack
        if (prev.isWalking && prev.stackHeight > 0) {
          const newProgress = prev.walkProgress + WALK_SPEED;
          const newX = prev.walkStartX + newProgress;
          const newY = prev.walkStartY + newProgress; // diagonal movement

          // Check if we've used up our stack
          if (newProgress >= prev.stackHeight) {
            // Check if we landed on a platform
            const nextPlatform = prev.platforms[prev.currentPlatform + 1];

            if (nextPlatform) {
              const landedOnPlatform =
                newX + PLAYER_SIZE > nextPlatform.x &&
                newX < nextPlatform.x + nextPlatform.width;

              if (landedOnPlatform) {
                // Success! Land on the new platform
                const newScore = prev.score + 1;
                const newHighScore = Math.max(newScore, prev.highScore);

                // Save high score
                if (newScore > prev.highScore) {
                  localStorage.setItem(HIGH_SCORE_KEY, newScore.toString());
                }

                return {
                  ...prev,
                  currentPlatform: prev.currentPlatform + 1,
                  playerX: nextPlatform.x + nextPlatform.width / 2 - PLAYER_SIZE / 2,
                  playerY: GROUND_Y - PLAYER_SIZE,
                  stackHeight: 0,
                  isWalking: false,
                  walkProgress: 0,
                  walkStartX: 0,
                  walkStartY: 0,
                  score: newScore,
                  highScore: newHighScore,
                };
              }
            }

            // Failed - didn't land on platform
            return {
              ...prev,
              gameOver: true,
              isWalking: false,
            };
          }

          return {
            ...prev,
            playerX: newX,
            playerY: newY,
            walkProgress: newProgress,
          };
        }

        return prev;
      });

      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  return [game, { startHold, releaseHold, resetGame }];
}
