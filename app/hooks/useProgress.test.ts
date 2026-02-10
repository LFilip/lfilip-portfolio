import { renderHook, act } from "@testing-library/react";
import { useProgress } from "./useProgress";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useProgress Hook", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it("should initialize with empty clicked projects", () => {
    const { result } = renderHook(() => useProgress());

    expect(result.current.clickedProjects).toEqual([]);
    expect(result.current.totalProjects).toBe(9);
    expect(result.current.progress).toBe(0);
  });

  it("should derive totalProjects from projects data", () => {
    const { result } = renderHook(() => useProgress());

    expect(result.current.totalProjects).toBe(9);
  });

  it("should toggle a project as clicked", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleClicked("localpet-virtual-pet-game");
    });

    expect(result.current.clickedProjects).toContain(
      "localpet-virtual-pet-game"
    );
    expect(result.current.progress).toBe(11);
  });

  it("should toggle off a clicked project", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleClicked("localpet-virtual-pet-game");
    });
    expect(result.current.clickedProjects).toContain("localpet-virtual-pet-game");

    act(() => {
      result.current.toggleClicked("localpet-virtual-pet-game");
    });
    expect(result.current.clickedProjects).not.toContain("localpet-virtual-pet-game");
    expect(result.current.progress).toBe(0);
  });

  it("should calculate progress correctly", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleClicked("localpet-virtual-pet-game");
    });
    expect(result.current.progress).toBe(11);

    act(() => {
      result.current.toggleClicked("portfolio-website");
    });
    expect(result.current.progress).toBe(22);

    act(() => {
      result.current.toggleClicked("government-application-dashboard");
    });
    expect(result.current.progress).toBe(33);
  });

  it("should persist clicked projects to localStorage", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleClicked("portfolio-website");
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "portfolio-clicked-projects",
      JSON.stringify(["portfolio-website"])
    );
  });

  it("should reset progress and clear localStorage", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleClicked("localpet-virtual-pet-game");
      result.current.toggleClicked("portfolio-website");
    });

    expect(result.current.clickedProjects).toHaveLength(2);

    act(() => {
      result.current.resetProgress();
    });

    expect(result.current.clickedProjects).toEqual([]);
    expect(result.current.progress).toBe(0);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      "portfolio-clicked-projects"
    );
  });

  it("should load clicked projects from localStorage on mount", () => {
    const storedProjects: string[] = [
      "localpet-virtual-pet-game",
      "portfolio-website",
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(storedProjects));

    const { result } = renderHook(() => useProgress());

    expect(result.current.clickedProjects).toEqual(storedProjects);
    expect(result.current.progress).toBe(22);
  });
});
