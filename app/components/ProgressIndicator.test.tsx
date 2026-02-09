import { render, screen, fireEvent } from "@testing-library/react";
import ProgressIndicator from "./ProgressIndicator";

const mockResetProgress = jest.fn();

// Mock the useProgress hook
jest.mock("../hooks/useProgress", () => ({
  useProgress: () => ({
    clickedProjects: ["localpet-virtual-pet-game"],
    totalProjects: 9,
    progress: 11,
    resetProgress: mockResetProgress,
    isHydrated: true,
  }),
}));

describe("ProgressIndicator Component", () => {
  beforeEach(() => {
    mockResetProgress.mockClear();
  });

  it("should render progress count inside the ring", () => {
    render(<ProgressIndicator />);

    expect(screen.getByText("1/9")).toBeInTheDocument();
  });

  it("should render an SVG progress ring", () => {
    render(<ProgressIndicator />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    expect(progressbar.tagName.toLowerCase()).toBe("svg");
  });

  it("should render background and foreground circles", () => {
    const { container } = render(<ProgressIndicator />);

    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(2);
  });

  it("should set correct aria attributes on progressbar", () => {
    render(<ProgressIndicator />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "11");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("should show tooltip with exploration text", () => {
    const { container } = render(<ProgressIndicator />);

    const tooltipEl = container.querySelector(
      '[title="1 of 9 projects explored"]'
    );
    expect(tooltipEl).toBeInTheDocument();
  });

  it("should render reset button when progress exists", () => {
    render(<ProgressIndicator />);

    const resetButton = screen.getByRole("button", {
      name: /reset progress/i,
    });
    expect(resetButton).toBeInTheDocument();
  });

  it("should call resetProgress when reset button is clicked", () => {
    render(<ProgressIndicator />);

    const resetButton = screen.getByRole("button", {
      name: /reset progress/i,
    });
    fireEvent.click(resetButton);

    expect(mockResetProgress).toHaveBeenCalledTimes(1);
  });
});
