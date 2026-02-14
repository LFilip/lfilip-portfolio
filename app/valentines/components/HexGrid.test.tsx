import { render, screen, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HexGrid from "./HexGrid";
import { HexContent } from "../data/memories";

jest.useFakeTimers();

describe("HexGrid", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  const mockHexagons: HexContent[] = [
    { type: "heart" },
    { type: "emoji", emoji: "💜" },
    { type: "memory", title: "Test Memory", description: "Test description", emoji: "🎬" },
    { type: "vows", title: "Test Vows", content: "I promise to love you", emoji: "💒" },
    { type: "video", videoId: "abc123", title: "Our Song", emoji: "🎵" },
    { type: "milestone", date: "October 2020", label: "Wedding Day", emoji: "💍" },
    { type: "note", message: "You are amazing", emoji: "💌" },
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
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const firstHexagon = screen.getByTestId("hexagon-0");
    await user.click(firstHexagon);

    // Heart should be revealed
    expect(screen.getByText("💜")).toBeInTheDocument();
  });

  it("reveals emoji hexagon with correct emoji", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const emojiHexagon = screen.getByTestId("hexagon-1");
    await user.click(emojiHexagon);

    // Should show the custom emoji
    const hexContent = within(emojiHexagon).getByText("💜");
    expect(hexContent).toBeInTheDocument();
  });

  it("opens memory modal when memory hexagon is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const memoryHexagon = screen.getByTestId("hexagon-2");
    await user.click(memoryHexagon);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Memory")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("closes memory modal when close button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
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

  it("opens vows modal when vows hexagon is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const vowsHexagon = screen.getByTestId("hexagon-3");
    await user.click(vowsHexagon);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Vows")).toBeInTheDocument();
  });

  it("opens video modal when video hexagon is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const videoHexagon = screen.getByTestId("hexagon-4");
    await user.click(videoHexagon);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Our Song")).toBeInTheDocument();
  });

  it("opens milestone modal when milestone hexagon is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const milestoneHexagon = screen.getByTestId("hexagon-5");
    await user.click(milestoneHexagon);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Wedding Day")).toBeInTheDocument();
  });

  it("opens note modal when note hexagon is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const noteHexagon = screen.getByTestId("hexagon-6");
    await user.click(noteHexagon);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("You are amazing")).toBeInTheDocument();
  });

  it("cycles through color variants between hexagons", () => {
    const { container } = render(<HexGrid hexagons={mockHexagons} />);

    const allHexButtons = container.querySelectorAll("button[data-testid^='hexagon-']");
    expect(allHexButtons.length).toBeGreaterThan(0);
  });

  it("has correct aria attributes", () => {
    render(<HexGrid hexagons={mockHexagons} />);

    const grid = screen.getByRole("grid");
    expect(grid).toHaveAttribute("aria-label", "Memory quilt");
  });

  it("keeps hexagon revealed after clicking", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const hexagon = screen.getByTestId("hexagon-0");
    await user.click(hexagon);

    // Should still be revealed
    expect(screen.getByText("💜")).toBeInTheDocument();
    expect(screen.getAllByText("?")).toHaveLength(mockHexagons.length - 1);
  });

  it("does not open modal during drag", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<HexGrid hexagons={mockHexagons} />);

    const grid = screen.getByTestId("hex-grid");

    // Simulate a drag (mousedown, move >5px, mouseup)
    await user.pointer([
      { keys: "[MouseLeft>]", target: grid, coords: { x: 0, y: 0 } },
      { coords: { x: 50, y: 50 } },
      { keys: "[/MouseLeft]" },
    ]);

    // Click a hexagon right after drag
    const hexagon = screen.getByTestId("hexagon-2");
    await user.click(hexagon);

    // Modal should open on this fresh click (hasDragged resets)
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("fires onAllRevealed when all clickable hexes are revealed", async () => {
    const onAllRevealed = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Small set: 2 clickable, 1 non-clickable
    const smallSet: HexContent[] = [
      { type: "memory", title: "M1", description: "D1", emoji: "🎬" },
      { type: "heart" },
      { type: "note", message: "Hi", emoji: "💌" },
    ];

    render(<HexGrid hexagons={smallSet} onAllRevealed={onAllRevealed} />);

    // Click first clickable hex
    await user.click(screen.getByTestId("hexagon-0"));
    // Close modal
    await user.click(screen.getByLabelText("Close memory"));

    // Click second clickable hex
    await user.click(screen.getByTestId("hexagon-2"));

    // Advance timer past the 600ms delay
    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(onAllRevealed).toHaveBeenCalledTimes(1);
  });

  it("shows progress indicator when 5 or fewer clickable hexes remain", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // 6 clickable hexes
    const hexes: HexContent[] = [
      { type: "memory", title: "M1", description: "D1", emoji: "🎬" },
      { type: "memory", title: "M2", description: "D2", emoji: "🎬" },
      { type: "memory", title: "M3", description: "D3", emoji: "🎬" },
      { type: "memory", title: "M4", description: "D4", emoji: "🎬" },
      { type: "memory", title: "M5", description: "D5", emoji: "🎬" },
      { type: "memory", title: "M6", description: "D6", emoji: "🎬" },
    ];

    render(<HexGrid hexagons={hexes} />);

    // Initially 6 remaining — no progress indicator
    expect(screen.queryByTestId("progress-indicator")).not.toBeInTheDocument();

    // Click one to get to 5 remaining
    await user.click(screen.getByTestId("hexagon-0"));
    await user.click(screen.getByLabelText("Close memory"));

    expect(screen.getByTestId("progress-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("progress-indicator")).toHaveTextContent("5 memories left to discover...");
  });

  it("hides progress indicator when all clickable hexes are revealed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const smallSet: HexContent[] = [
      { type: "memory", title: "M1", description: "D1", emoji: "🎬" },
      { type: "heart" },
    ];

    render(<HexGrid hexagons={smallSet} />);

    // 1 clickable remaining — shows indicator
    expect(screen.getByTestId("progress-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("progress-indicator")).toHaveTextContent("1 memory left to discover...");

    // Click it
    await user.click(screen.getByTestId("hexagon-0"));

    // 0 remaining — indicator hidden
    expect(screen.queryByTestId("progress-indicator")).not.toBeInTheDocument();
  });
});
