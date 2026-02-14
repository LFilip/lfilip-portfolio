import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ValentinesPage from "./page";

// Mock timers for testing auto-transitions
jest.useFakeTimers();

describe("ValentinesPage", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders the page", () => {
    render(<ValentinesPage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("starts with envelope closed", () => {
    render(<ValentinesPage />);
    expect(screen.getByRole("button", { name: "Open envelope" })).toBeInTheDocument();
    expect(screen.queryByText("My Dearest")).not.toBeInTheDocument();
  });

  it("opens envelope when seal is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ValentinesPage />);

    const seal = screen.getByRole("button", { name: "Open envelope" });
    await user.click(seal);

    expect(screen.queryByRole("button", { name: "Open envelope" })).not.toBeInTheDocument();
    expect(screen.getByText("My Dearest")).toBeInTheDocument();
  });

  it("shows card content after opening", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ValentinesPage />);

    const seal = screen.getByRole("button", { name: "Open envelope" });
    await user.click(seal);

    expect(screen.getByText("Forever Yours")).toBeInTheDocument();
  });

  it("has dark background", () => {
    render(<ValentinesPage />);
    const main = screen.getByRole("main");
    expect(main).toHaveClass("bg-zinc-950");
  });

  it("shows skip button after delay when envelope is opened", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ValentinesPage />);

    const seal = screen.getByRole("button", { name: "Open envelope" });
    await user.click(seal);

    // Skip button should not be visible initially
    expect(screen.queryByRole("button", { name: "Skip to memory quilt" })).not.toBeInTheDocument();

    // Advance past the delay
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    // Skip button should now be visible
    expect(screen.getByRole("button", { name: "Skip to memory quilt" })).toBeInTheDocument();
  });

  it("transitions to quilt phase when skip is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ValentinesPage />);

    const seal = screen.getByRole("button", { name: "Open envelope" });
    await user.click(seal);

    // Wait for skip button to appear
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    const skipButton = screen.getByRole("button", { name: "Skip to memory quilt" });
    await user.click(skipButton);

    // Advance past dissolution animation
    act(() => {
      jest.advanceTimersByTime(900);
    });

    // Should now show the hex grid
    expect(screen.getByTestId("quilt-container")).toBeInTheDocument();
    expect(screen.getByTestId("hex-grid")).toBeInTheDocument();
  });

  it("renders ValentineFinale when phase is finale", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ValentinesPage />);

    // Navigate to quilt phase
    const seal = screen.getByRole("button", { name: "Open envelope" });
    await user.click(seal);

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    const skipButton = screen.getByRole("button", { name: "Skip to memory quilt" });
    await user.click(skipButton);

    act(() => {
      jest.advanceTimersByTime(900);
    });

    // Click all clickable hexagons to trigger finale
    const hexGrid = screen.getByTestId("hex-grid");
    expect(hexGrid).toBeInTheDocument();

    // Click all 32 hexagons (clickable ones will count, non-clickable are harmless to click)
    for (let i = 0; i < 32; i++) {
      const hex = screen.queryByTestId(`hexagon-${i}`);
      if (hex) {
        await user.click(hex);
        // Close any modal that opens
        const closeBtn = screen.queryByLabelText("Close memory") || screen.queryByLabelText("Close vows") || screen.queryByLabelText("Close video");
        if (closeBtn) {
          await user.click(closeBtn);
        }
      }
    }

    // Advance past the 600ms delay for onAllRevealed
    act(() => {
      jest.advanceTimersByTime(700);
    });

    // Finale should be rendered
    expect(screen.getByTestId("valentine-finale")).toBeInTheDocument();
  });
});
