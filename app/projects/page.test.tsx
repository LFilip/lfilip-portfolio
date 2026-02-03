import { render, screen, fireEvent } from "@testing-library/react";
import ProjectsPage from "./page";

const mockToggleClicked = jest.fn();

// Mock useProgress hook
jest.mock("../hooks/useProgress", () => ({
  useProgress: () => ({
    clickedProjects: [],
    totalProjects: 8,
    progress: 0,
    toggleClicked: mockToggleClicked,
    resetProgress: jest.fn(),
    isHydrated: true,
  }),
  ProjectId: {} as Record<string, string>,
}));

describe("ProjectsPage", () => {
  beforeEach(() => {
    mockToggleClicked.mockClear();
  });

  it("should render the page heading", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Projects" })
    ).toBeInTheDocument();
  });

  it("should render the page description", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByText(/A collection of projects I have worked on/i)
    ).toBeInTheDocument();
  });

  it("should render project cards", () => {
    render(<ProjectsPage />);

    // Check for at least one project
    expect(screen.getByText("Block Miner")).toBeInTheDocument();
  });

  it("should render multiple projects", () => {
    render(<ProjectsPage />);

    expect(screen.getByText("Portfolio Website")).toBeInTheDocument();
    expect(
      screen.getByText("Government Application Dashboard")
    ).toBeInTheDocument();
  });

  it("should render all 7 projects", () => {
    render(<ProjectsPage />);

    expect(screen.getByText("Block Miner")).toBeInTheDocument();
    expect(screen.getByText("Package Sorting System")).toBeInTheDocument();
    expect(screen.getByText("LocalPet - Virtual Pet Game")).toBeInTheDocument();
    expect(screen.getByText("Portfolio Website")).toBeInTheDocument();
    expect(
      screen.getByText("Government Application Dashboard")
    ).toBeInTheDocument();
    expect(screen.getByText("User Analytics Dashboard")).toBeInTheDocument();
    expect(screen.getByText("3D Browser-Based Map")).toBeInTheDocument();
  });

  it("should call toggleClicked when a project card is clicked", () => {
    render(<ProjectsPage />);

    // First 4 buttons are filters, project cards come after
    const projectCards = screen.getAllByRole("button", { pressed: false });
    const blockMinerCard = projectCards.find((btn) =>
      btn.textContent?.includes("Block Miner")
    );
    if (blockMinerCard) fireEvent.click(blockMinerCard);

    expect(mockToggleClicked).toHaveBeenCalledWith("block-miner");
  });

  it("should render filter buttons", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("button", { name: /All/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Professional/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Games/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Demos/i })).toBeInTheDocument();
  });

  it("should filter projects when category is clicked", () => {
    render(<ProjectsPage />);

    // Click Games filter
    fireEvent.click(screen.getByRole("button", { name: /Games/i }));

    // Should show games
    expect(screen.getByText("Block Miner")).toBeInTheDocument();
    expect(screen.getByText("LocalPet - Virtual Pet Game")).toBeInTheDocument();

    // Should not show professional projects
    expect(screen.queryByText("Government Application Dashboard")).not.toBeInTheDocument();
  });
});

describe("ProjectsPage integration", () => {
  it("should pass isClicked and onProjectClick props to ProjectCard", () => {
    render(<ProjectsPage />);

    // Project cards have aria-pressed attribute
    const projectCards = screen.getAllByRole("button").filter((btn) =>
      btn.hasAttribute("aria-pressed")
    );
    expect(projectCards.length).toBe(9);
  });
});
