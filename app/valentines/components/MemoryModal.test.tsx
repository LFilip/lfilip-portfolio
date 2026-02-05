import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MemoryModal from "./MemoryModal";

describe("MemoryModal", () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    title: "Dollywood",
    description: "Riding rollercoasters with Maddox",
    emoji: "📖",
    onClose: mockOnClose,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders memory title", () => {
    render(<MemoryModal {...defaultProps} />);
    expect(screen.getByText("Dollywood")).toBeInTheDocument();
  });

  it("renders memory description", () => {
    render(<MemoryModal {...defaultProps} />);
    expect(screen.getByText("Riding rollercoasters with Maddox")).toBeInTheDocument();
  });

  it("renders book emoji", () => {
    render(<MemoryModal {...defaultProps} />);
    expect(screen.getByText("📖")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<MemoryModal {...defaultProps} />);

    const closeButton = screen.getByLabelText("Close memory");
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<MemoryModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    await user.click(dialog);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when modal content is clicked", async () => {
    const user = userEvent.setup();
    render(<MemoryModal {...defaultProps} />);

    const title = screen.getByText("Dollywood");
    await user.click(title);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("has correct aria attributes", () => {
    render(<MemoryModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "memory-title");
  });

  it("renders ornate corners", () => {
    render(<MemoryModal {...defaultProps} />);

    expect(screen.getByTestId("ornate-corner-top-left")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-top-right")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-bottom-left")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-bottom-right")).toBeInTheDocument();
  });

  it("has purple-themed styling", () => {
    render(<MemoryModal {...defaultProps} />);
    const title = screen.getByText("Dollywood");
    expect(title).toHaveClass("text-purple-400");
  });
});
