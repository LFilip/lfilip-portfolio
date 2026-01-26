import { renderHook, act } from "@testing-library/react";
import { useProgress, TRACKED_PROJECTS, ProjectId } from "./useProgress";

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
    expect(result.current.totalProjects).toBe(5);
    expect(result.current.progress).toBe(0);
  });

  it("should have 5 tracked projects", () => {
    expect(Object.keys(TRACKED_PROJECTS)).toHaveLength(5);
    expect(TRACKED_PROJECTS["localpet-virtual-pet-game"]).toBeDefined();
    expect(TRACKED_PROJECTS["portfolio-website"]).toBeDefined();
    expect(TRACKED_PROJECTS["government-application-dashboard"]).toBeDefined();
    expect(TRACKED_PROJECTS["user-analytics-dashboard"]).toBeDefined();
    expect(TRACKED_PROJECTS["3d-browser-based-map"]).toBeDefined();
  });

  it("should mark a project as clicked", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markClicked("localpet-virtual-pet-game");
    });

    expect(result.current.clickedProjects).toContain(
      "localpet-virtual-pet-game"
    );
    expect(result.current.progress).toBe(20);
  });

  it("should not duplicate clicked projects", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markClicked("localpet-virtual-pet-game");
    });

    act(() => {
      result.current.markClicked("localpet-virtual-pet-game");
    });

    expect(
      result.current.clickedProjects.filter(
        (p) => p === "localpet-virtual-pet-game"
      )
    ).toHaveLength(1);
  });

  it("should calculate progress correctly", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markClicked("localpet-virtual-pet-game");
    });
    expect(result.current.progress).toBe(20);

    act(() => {
      result.current.markClicked("portfolio-website");
    });
    expect(result.current.progress).toBe(40);

    act(() => {
      result.current.markClicked("government-application-dashboard");
    });
    expect(result.current.progress).toBe(60);

    act(() => {
      result.current.markClicked("user-analytics-dashboard");
    });
    expect(result.current.progress).toBe(80);

    act(() => {
      result.current.markClicked("3d-browser-based-map");
    });
    expect(result.current.progress).toBe(100);
  });

  it("should persist clicked projects to localStorage", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markClicked("portfolio-website");
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "portfolio-clicked-projects",
      JSON.stringify(["portfolio-website"])
    );
  });

  it("should reset progress and clear localStorage", () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markClicked("localpet-virtual-pet-game");
      result.current.markClicked("portfolio-website");
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
    const storedProjects: ProjectId[] = [
      "localpet-virtual-pet-game",
      "portfolio-website",
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(storedProjects));

    const { result } = renderHook(() => useProgress());

    // After hydration, should have the stored projects
    expect(result.current.clickedProjects).toEqual(storedProjects);
    expect(result.current.progress).toBe(40);
  });
});
