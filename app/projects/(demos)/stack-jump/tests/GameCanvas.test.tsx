import { render, screen } from "@testing-library/react";
import { GameCanvas } from "../components/GameCanvas";
import type { GameState } from "../types/game";
import { GROUND_Y, PLAYER_SIZE } from "../constants/game";

const createMockGameState = (overrides: Partial<GameState> = {}): GameState => ({
  platforms: [
    { x: 30, width: 60 },
    { x: 150, width: 50 },
    { x: 260, width: 45 },
  ],
  currentPlatform: 0,
  playerX: 48,
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
  highScore: 5,
  isHydrated: true,
  ...overrides,
});

describe("GameCanvas", () => {
  it("shows loading state when platforms are null", () => {
    const game = createMockGameState({ platforms: null });
    render(<GameCanvas game={game} cameraOffset={0} onRetry={jest.fn()} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders player emoji", () => {
    const game = createMockGameState();
    render(<GameCanvas game={game} cameraOffset={0} onRetry={jest.fn()} />);
    expect(screen.getByText("🧍")).toBeInTheDocument();
  });

  it("shows holding emoji when isHolding", () => {
    const game = createMockGameState({ isHolding: true, stackHeight: 50 });
    render(<GameCanvas game={game} cameraOffset={0} onRetry={jest.fn()} />);
    expect(screen.getByText("😤")).toBeInTheDocument();
  });

  it("shows game over emoji when game over", () => {
    const game = createMockGameState({ gameOver: true });
    render(<GameCanvas game={game} cameraOffset={0} onRetry={jest.fn()} />);
    expect(screen.getByText("😵")).toBeInTheDocument();
  });

  it("shows stack height indicator when holding", () => {
    const game = createMockGameState({ isHolding: true, stackHeight: 75 });
    render(<GameCanvas game={game} cameraOffset={0} onRetry={jest.fn()} />);
    expect(screen.getByText("75px")).toBeInTheDocument();
  });

  it("does not show stack height indicator when not holding", () => {
    const game = createMockGameState({ isHolding: false });
    render(<GameCanvas game={game} cameraOffset={0} onRetry={jest.fn()} />);
    expect(screen.queryByText(/\d+px/)).not.toBeInTheDocument();
  });

  it("shows game over overlay when game is over", () => {
    const game = createMockGameState({ gameOver: true, score: 10 });
    render(<GameCanvas game={game} cameraOffset={0} onRetry={jest.fn()} />);
    expect(screen.getByText("Game Over!")).toBeInTheDocument();
    expect(screen.getByText("Score: 10")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try Again" })).toBeInTheDocument();
  });

  it("does not show game over overlay when game is not over", () => {
    const game = createMockGameState({ gameOver: false });
    render(<GameCanvas game={game} cameraOffset={0} onRetry={jest.fn()} />);
    expect(screen.queryByText("Game Over!")).not.toBeInTheDocument();
  });
});
