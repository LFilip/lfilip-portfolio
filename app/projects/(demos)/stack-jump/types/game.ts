export interface Platform {
  x: number;
  width: number;
}

export interface GameState {
  platforms: Platform[] | null; // null until hydrated
  currentPlatform: number;
  playerX: number;
  playerY: number;
  stackHeight: number;
  isHolding: boolean;
  isWalking: boolean;
  walkProgress: number;
  walkStartX: number; // stored in state for proper stack rendering
  walkStartY: number; // stored in state for proper stack rendering
  holdStartX: number; // where player was when hold started
  gameOver: boolean;
  score: number;
  highScore: number;
  isHydrated: boolean; // for SSR hydration
}

export interface GameActions {
  startHold: () => void;
  releaseHold: () => void;
  resetGame: () => void;
}
