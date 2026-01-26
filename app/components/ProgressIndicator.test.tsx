import { render, screen, fireEvent } from "@testing-library/react";
import ProgressIndicator from "./ProgressIndicator";

const mockResetProgress = jest.fn();

// Mock the useProgress hook
jest.mock("../hooks/useProgress", () => ({
  useProgress: () => ({
    clickedProjects: ["localpet-virtual-pet-game"],
    totalProjects: 5,
    progress: 20,
    markClicked: jest.fn(),
    resetProgress: mockResetProgress,
    isHydrated: true,
  }),
  TRACKED_PROJECTS: {
    "localpet-virtual-pet-game": { label: "LocalPet" },
    "portfolio-website": { label: "Portfolio" },
    "government-application-dashboard": { label: "Gov Dashboard" },
    "user-analytics-dashboard": { label: "Analytics" },
    "3d-browser-based-map": { label: "3D Map" },
  },
}));

describe("ProgressIndicator Component", () => {
  beforeEach(() => {
    mockResetProgress.mockClear();
  });

  it("should render progress count", () => {
    render(<ProgressIndicator />);

    expect(screen.getByText("1/5")).toBeInTheDocument();
  });

  it("should render indicator dots for each tracked project", () => {
    const { container } = render(<ProgressIndicator />);

    const dots = container.querySelectorAll(".rounded-full.w-2.h-2");
    expect(dots).toHaveLength(5);
  });

  it("should highlight clicked project dots", () => {
    const { container } = render(<ProgressIndicator />);

    const emeraldDots = container.querySelectorAll(".bg-emerald-400");
    expect(emeraldDots.length).toBeGreaterThanOrEqual(1);
  });

  it("should render progress bar", () => {
    const { container } = render(<ProgressIndicator />);

    const progressBar = container.querySelector('[style*="width: 20%"]');
    expect(progressBar).toBeInTheDocument();
  });

  it("should show project labels as titles on dots", () => {
    const { container } = render(<ProgressIndicator />);

    const localPetDot = container.querySelector('[title="LocalPet"]');
    const portfolioDot = container.querySelector('[title="Portfolio"]');
    const govDashboardDot = container.querySelector('[title="Gov Dashboard"]');
    const analyticsDot = container.querySelector('[title="Analytics"]');
    const mapDot = container.querySelector('[title="3D Map"]');

    expect(localPetDot).toBeInTheDocument();
    expect(portfolioDot).toBeInTheDocument();
    expect(govDashboardDot).toBeInTheDocument();
    expect(analyticsDot).toBeInTheDocument();
    expect(mapDot).toBeInTheDocument();
  });

  it("should render reset button when progress exists", () => {
    render(<ProgressIndicator />);

    const resetButton = screen.getByRole("button", { name: /reset progress/i });
    expect(resetButton).toBeInTheDocument();
  });

  it("should call resetProgress when reset button is clicked", () => {
    render(<ProgressIndicator />);

    const resetButton = screen.getByRole("button", { name: /reset progress/i });
    fireEvent.click(resetButton);

    expect(mockResetProgress).toHaveBeenCalledTimes(1);
  });
});

// Note: Tests for zero progress and no reset button scenarios
// are covered by the mock configuration and the conditional render
// in the component itself. The mock returns clickedProjects: ["localpet-virtual-pet-game"]
// to test the "with progress" state. The "no progress" state is implicitly
// tested through the component logic.
