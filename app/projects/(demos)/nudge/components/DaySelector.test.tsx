import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DaySelector } from "./DaySelector";

describe("DaySelector Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("should render all 7 days", () => {
    render(<DaySelector selectedDays={[]} onChange={mockOnChange} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(7);
  });

  it("should display day abbreviations", () => {
    render(<DaySelector selectedDays={[]} onChange={mockOnChange} />);

    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Mo")).toBeInTheDocument();
    expect(screen.getByText("Tu")).toBeInTheDocument();
    expect(screen.getByText("We")).toBeInTheDocument();
    expect(screen.getByText("Th")).toBeInTheDocument();
    expect(screen.getByText("Fr")).toBeInTheDocument();
    expect(screen.getByText("Sa")).toBeInTheDocument();
  });

  it("should show selected days as aria-pressed", () => {
    render(<DaySelector selectedDays={[1, 3, 5]} onChange={mockOnChange} />);

    const mondayButton = screen.getByRole("button", { name: /monday/i });
    const wednesdayButton = screen.getByRole("button", { name: /wednesday/i });
    const fridayButton = screen.getByRole("button", { name: /friday/i });
    const sundayButton = screen.getByRole("button", { name: /sunday/i });

    expect(mondayButton).toHaveAttribute("aria-pressed", "true");
    expect(wednesdayButton).toHaveAttribute("aria-pressed", "true");
    expect(fridayButton).toHaveAttribute("aria-pressed", "true");
    expect(sundayButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should add day when clicking unselected day", async () => {
    const user = userEvent.setup();
    render(<DaySelector selectedDays={[1]} onChange={mockOnChange} />);

    const tuesdayButton = screen.getByRole("button", { name: /tuesday/i });
    await user.click(tuesdayButton);

    expect(mockOnChange).toHaveBeenCalledWith([1, 2]);
  });

  it("should remove day when clicking selected day", async () => {
    const user = userEvent.setup();
    render(<DaySelector selectedDays={[1, 2, 3]} onChange={mockOnChange} />);

    const tuesdayButton = screen.getByRole("button", { name: /tuesday/i });
    await user.click(tuesdayButton);

    expect(mockOnChange).toHaveBeenCalledWith([1, 3]);
  });

  it("should sort days when adding", async () => {
    const user = userEvent.setup();
    render(<DaySelector selectedDays={[1, 5]} onChange={mockOnChange} />);

    const wednesdayButton = screen.getByRole("button", { name: /wednesday/i });
    await user.click(wednesdayButton);

    expect(mockOnChange).toHaveBeenCalledWith([1, 3, 5]);
  });

  it("should not call onChange when disabled", async () => {
    const user = userEvent.setup();
    render(<DaySelector selectedDays={[1]} onChange={mockOnChange} disabled />);

    const tuesdayButton = screen.getByRole("button", { name: /tuesday/i });
    await user.click(tuesdayButton);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("should apply disabled styling when disabled", () => {
    render(<DaySelector selectedDays={[1]} onChange={mockOnChange} disabled />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
      expect(button.className).toContain("opacity-50");
    });
  });

  it("should have different styling for selected vs unselected days", () => {
    render(<DaySelector selectedDays={[1]} onChange={mockOnChange} />);

    const mondayButton = screen.getByRole("button", { name: /monday/i });
    const tuesdayButton = screen.getByRole("button", { name: /tuesday/i });

    expect(mondayButton.className).toContain("bg-emerald");
    expect(tuesdayButton.className).toContain("bg-zinc");
  });
});
