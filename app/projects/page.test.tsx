import { render, screen, fireEvent } from "@testing-library/react";
import ProjectsPage from "./page";

const mockMarkClicked = jest.fn();

// Mock useProgress hook
jest.mock("../hooks/useProgress", () => ({
  useProgress: () => ({
    clickedProjects: [],
    totalProjects: 5,
    progress: 0,
    markClicked: mockMarkClicked,
    resetProgress: jest.fn(),
    isHydrated: true,
  }),
  ProjectId: {} as Record<string, string>,
}));

describe("ProjectsPage", () => {
  beforeEach(() => {
    mockMarkClicked.mockClear();
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
    expect(screen.getByText("LocalPet - Virtual Pet Game")).toBeInTheDocument();
  });

  it("should render multiple projects", () => {
    render(<ProjectsPage />);

    expect(screen.getByText("Portfolio Website")).toBeInTheDocument();
    expect(
      screen.getByText("Government Application Dashboard")
    ).toBeInTheDocument();
  });

  it("should render all 5 projects", () => {
    render(<ProjectsPage />);

    expect(screen.getByText("LocalPet - Virtual Pet Game")).toBeInTheDocument();
    expect(screen.getByText("Portfolio Website")).toBeInTheDocument();
    expect(
      screen.getByText("Government Application Dashboard")
    ).toBeInTheDocument();
    expect(screen.getByText("User Analytics Dashboard")).toBeInTheDocument();
    expect(screen.getByText("3D Browser-Based Map")).toBeInTheDocument();
  });

  it("should call markClicked when a project card is clicked", () => {
    render(<ProjectsPage />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(mockMarkClicked).toHaveBeenCalledWith("localpet-virtual-pet-game");
  });
});

describe("ProjectsPage integration", () => {
  it("should pass isClicked and onProjectClick props to ProjectCard", () => {
    // This test verifies the integration by checking that the page renders
    // project cards with the correct props from useProgress
    render(<ProjectsPage />);

    // All cards should have aria-pressed attribute
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-pressed");
    });
  });
});
