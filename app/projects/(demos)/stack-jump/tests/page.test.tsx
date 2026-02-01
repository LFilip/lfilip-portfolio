import { render, screen } from "@testing-library/react";
import StackJumpPage from "../page";

// Mock the useGameLoop hook to avoid requestAnimationFrame issues
jest.mock("../hooks/useGameLoop", () => ({
  useGameLoop: () => [
    {
      platforms: [
        { x: 30, width: 60 },
        { x: 150, width: 50 },
      ],
      currentPlatform: 0,
      playerX: 48,
      playerY: 316,
      stackHeight: 0,
      isHolding: false,
      isWalking: false,
      walkProgress: 0,
      walkStartX: 0,
      walkStartY: 0,
      holdStartX: 0,
      gameOver: false,
      score: 3,
      highScore: 10,
      isHydrated: true,
    },
    {
      startHold: jest.fn(),
      releaseHold: jest.fn(),
      resetGame: jest.fn(),
    },
  ],
}));

describe("StackJumpPage", () => {
  it("renders the page title", () => {
    render(<StackJumpPage />);
    expect(screen.getByRole("heading", { name: "Stack Jump" })).toBeInTheDocument();
  });

  it("renders the back link", () => {
    render(<StackJumpPage />);
    const backLink = screen.getByRole("link", { name: /back to projects/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/projects");
  });

  it("renders score display with correct values", () => {
    render(<StackJumpPage />);
    expect(screen.getByText("3")).toBeInTheDocument(); // score
    expect(screen.getByText("10")).toBeInTheDocument(); // high score
  });

  it("renders the control button", () => {
    render(<StackJumpPage />);
    expect(screen.getByRole("button", { name: /hold to stack/i })).toBeInTheDocument();
  });

  it("renders accordion sections", () => {
    render(<StackJumpPage />);
    expect(screen.getByText("How to Play")).toBeInTheDocument();
    expect(screen.getByText("Game Mechanics")).toBeInTheDocument();
    expect(screen.getByText("About this Project")).toBeInTheDocument();
  });

  it("renders player emoji", () => {
    render(<StackJumpPage />);
    expect(screen.getByText("🧍")).toBeInTheDocument();
  });
});
