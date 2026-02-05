import { renderHook, act } from "@testing-library/react";
import { useGameLoop } from "../hooks/useGameLoop";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock requestAnimationFrame
let rafCallback: FrameRequestCallback | null = null;
let rafId = 0;

beforeEach(() => {
  jest.useFakeTimers();
  localStorageMock.clear();
  rafId = 0;
  rafCallback = null;

  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    rafCallback = cb;
    return ++rafId;
  });

  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {
    rafCallback = null;
  });
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

// Helper to advance game loop
function advanceGameLoop(frames = 1) {
  for (let i = 0; i < frames; i++) {
    if (rafCallback) {
      rafCallback(performance.now());
    }
  }
}

describe("useGameLoop", () => {
  it("initializes with hydrated state", () => {
    const { result } = renderHook(() => useGameLoop());

    // After initial effect runs, state should be hydrated
    expect(result.current[0].isHydrated).toBe(true);
    expect(result.current[0].platforms).not.toBeNull();
  });

  it("starts with player on first platform", () => {
    const { result } = renderHook(() => useGameLoop());

    expect(result.current[0].currentPlatform).toBe(0);
    expect(result.current[0].playerX).toBeGreaterThan(0);
  });

  it("starts not holding or walking", () => {
    const { result } = renderHook(() => useGameLoop());

    expect(result.current[0].isHolding).toBe(false);
    expect(result.current[0].isWalking).toBe(false);
  });

  it("sets isHolding to true when startHold is called", () => {
    const { result } = renderHook(() => useGameLoop());

    act(() => {
      result.current[1].startHold();
    });

    expect(result.current[0].isHolding).toBe(true);
  });

  it("records holdStartX when startHold is called", () => {
    const { result } = renderHook(() => useGameLoop());

    const initialPlayerX = result.current[0].playerX;

    act(() => {
      result.current[1].startHold();
    });

    expect(result.current[0].holdStartX).toBe(initialPlayerX);
  });

  it("grows stack while holding", () => {
    const { result } = renderHook(() => useGameLoop());

    act(() => {
      result.current[1].startHold();
    });

    const initialStack = result.current[0].stackHeight;

    act(() => {
      advanceGameLoop(5);
    });

    expect(result.current[0].stackHeight).toBeGreaterThan(initialStack);
  });

  it("sets isWalking when releaseHold is called after holding", () => {
    const { result } = renderHook(() => useGameLoop());

    act(() => {
      result.current[1].startHold();
    });

    act(() => {
      advanceGameLoop(10); // Build some stack
    });

    act(() => {
      result.current[1].releaseHold();
    });

    expect(result.current[0].isHolding).toBe(false);
    expect(result.current[0].isWalking).toBe(true);
  });

  it("stores walkStartX and walkStartY when walking starts", () => {
    const { result } = renderHook(() => useGameLoop());

    act(() => {
      result.current[1].startHold();
    });

    act(() => {
      advanceGameLoop(10);
    });

    const playerXBeforeWalk = result.current[0].playerX;

    act(() => {
      result.current[1].releaseHold();
    });

    expect(result.current[0].walkStartX).toBe(playerXBeforeWalk);
    expect(result.current[0].walkStartY).toBeLessThan(result.current[0].playerY + 100);
  });

  it("resets game state when resetGame is called", () => {
    const { result } = renderHook(() => useGameLoop());

    // Start and play a bit
    act(() => {
      result.current[1].startHold();
    });

    act(() => {
      advanceGameLoop(50);
    });

    act(() => {
      result.current[1].resetGame();
    });

    expect(result.current[0].score).toBe(0);
    expect(result.current[0].isHolding).toBe(false);
    expect(result.current[0].isWalking).toBe(false);
    expect(result.current[0].gameOver).toBe(false);
  });

  it("does not start holding when game is over", () => {
    const { result } = renderHook(() => useGameLoop());

    // Force game over by making stack way too short and walking
    act(() => {
      result.current[1].startHold();
    });

    // Build minimal stack
    act(() => {
      advanceGameLoop(1);
    });

    act(() => {
      result.current[1].releaseHold();
    });

    // Walk until we fall
    act(() => {
      advanceGameLoop(100);
    });

    // Now try to start holding
    act(() => {
      result.current[1].startHold();
    });

    // isHolding should still be false because game is over
    expect(result.current[0].gameOver).toBe(true);
    expect(result.current[0].isHolding).toBe(false);
  });
});
