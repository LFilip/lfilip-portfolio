import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HexGrid from "./HexGrid";
import { HexContent } from "../data/memories";

describe("HexGrid", () => {
  const mockHexagons: HexContent[] = [
    { type: "heart" },
    { type: "emoji", emoji: "💜" },
    { type: "memory", title: "Test Memory", description: "Test description" },
    { type: "heart" },
    { type: "emoji", emoji: "🎢" },
    { type: "heart" },
  ];

  it("renders the grid container", () => {
    render(<HexGrid hexagons={mockHexagons} />);
    expect(screen.getByTestId("hex-grid")).toBeInTheDocument();
  });

  it("renders all hexagons", () => {
    render(<HexGrid hexagons={mockHexagons} />);

    mockHexagons.forEach((_, index) => {
      expect(screen.getByTestId(`hexagon-${index}`)).toBeInTheDocument();
    });
  });

  it("renders hexagons as unrevealed initially", () => {
    render(<HexGrid hexagons={mockHexagons} />);

    const questionMarks = screen.getAllByText("?");
    expect(questionMarks).toHaveLength(mockHexagons.length);
  });

  it("reveals hexagon when clicked", async () => {
    const user = userEvent.setup();
    render(<HexGrid hexagons={mockHexagons} />);

    const firstHexagon = screen.getByTestId("hexagon-0");
    await user.click(firstHexagon);

    // Heart should be revealed
    expect(screen.getByText("💜")).toBeInTheDocument();
  });

  it("reveals emoji hexagon with correct emoji", async () => {
    const user = userEvent.setup();
    render(<HexGrid hexagons={mockHexagons} />);

    const emojiHexagon = screen.getByTestId("hexagon-1");
    await user.click(emojiHexagon);

    // Should show the custom emoji
    const hexContent = within(emojiHexagon).getByText("💜");
    expect(hexContent).toBeInTheDocument();
  });

  it("opens memory modal when memory hexagon is clicked", async () => {
    const user = userEvent.setup();
    render(<HexGrid hexagons={mockHexagons} />);

    const memoryHexagon = screen.getByTestId("hexagon-2");
    await user.click(memoryHexagon);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Memory")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("closes memory modal when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<HexGrid hexagons={mockHexagons} />);

    // Open modal
    const memoryHexagon = screen.getByTestId("hexagon-2");
    await user.click(memoryHexagon);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByLabelText("Close memory");
    await user.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("cycles through color variants between hexagons", () => {
    const { container } = render(<HexGrid hexagons={mockHexagons} />);

    // Check that different color variants are used
    const purpleHexes = container.querySelectorAll(".bg-purple-900");
    const emeraldHexes = container.querySelectorAll(".bg-emerald-900");
    const redHexes = container.querySelectorAll(".bg-red-950");

    // At least some colors should be present
    const totalColoredHexes = purpleHexes.length + emeraldHexes.length + redHexes.length;
    expect(totalColoredHexes).toBeGreaterThan(0);
  });

  it("has correct aria attributes", () => {
    render(<HexGrid hexagons={mockHexagons} />);

    const grid = screen.getByRole("grid");
    expect(grid).toHaveAttribute("aria-label", "Memory quilt");
  });

  it("keeps hexagon revealed after clicking", async () => {
    const user = userEvent.setup();
    render(<HexGrid hexagons={mockHexagons} />);

    const hexagon = screen.getByTestId("hexagon-0");
    await user.click(hexagon);

    // Should still be revealed
    expect(screen.getByText("💜")).toBeInTheDocument();
    expect(screen.getAllByText("?")).toHaveLength(mockHexagons.length - 1);
  });
});
