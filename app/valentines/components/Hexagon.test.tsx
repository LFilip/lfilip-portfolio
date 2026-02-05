import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hexagon from "./Hexagon";
import { HexContent } from "../data/memories";

describe("Hexagon", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders with question mark when not revealed", () => {
    const content: HexContent = { type: "heart" };
    render(
      <Hexagon
        content={content}
        isRevealed={false}
        colorVariant="purple"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("renders heart emoji when revealed", () => {
    const content: HexContent = { type: "heart" };
    render(
      <Hexagon
        content={content}
        isRevealed={true}
        colorVariant="purple"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(screen.getByText("💜")).toBeInTheDocument();
  });

  it("renders custom emoji when revealed", () => {
    const content: HexContent = { type: "emoji", emoji: "🎢" };
    render(
      <Hexagon
        content={content}
        isRevealed={true}
        colorVariant="emerald"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(screen.getByText("🎢")).toBeInTheDocument();
  });

  it("renders custom emoji for memory when revealed", () => {
    const content: HexContent = { type: "memory", title: "Test", description: "Description", emoji: "🎢" };
    render(
      <Hexagon
        content={content}
        isRevealed={true}
        colorVariant="purple"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(screen.getByText("🎢")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const content: HexContent = { type: "heart" };
    render(
      <Hexagon
        content={content}
        isRevealed={false}
        colorVariant="purple"
        onClick={mockOnClick}
        index={0}
      />
    );

    await user.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("has correct aria-label when not revealed", () => {
    const content: HexContent = { type: "heart" };
    render(
      <Hexagon
        content={content}
        isRevealed={false}
        colorVariant="purple"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(screen.getByLabelText("Hidden hexagon, click to reveal")).toBeInTheDocument();
  });

  it("has correct aria-label for heart when revealed", () => {
    const content: HexContent = { type: "heart" };
    render(
      <Hexagon
        content={content}
        isRevealed={true}
        colorVariant="purple"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(screen.getByLabelText("Heart")).toBeInTheDocument();
  });

  it("has correct aria-label for memory when revealed", () => {
    const content: HexContent = { type: "memory", title: "Dollywood", description: "Fun times", emoji: "🎢" };
    render(
      <Hexagon
        content={content}
        isRevealed={true}
        colorVariant="purple"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(screen.getByLabelText("Memory: Dollywood")).toBeInTheDocument();
  });

  it("has correct test id based on index", () => {
    const content: HexContent = { type: "heart" };
    render(
      <Hexagon
        content={content}
        isRevealed={false}
        colorVariant="purple"
        onClick={mockOnClick}
        index={5}
      />
    );

    expect(screen.getByTestId("hexagon-5")).toBeInTheDocument();
  });

  it("applies purple color variant styles", () => {
    const content: HexContent = { type: "heart" };
    const { container } = render(
      <Hexagon
        content={content}
        isRevealed={false}
        colorVariant="purple"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(container.querySelector(".bg-purple-900")).toBeInTheDocument();
  });

  it("applies emerald color variant styles", () => {
    const content: HexContent = { type: "heart" };
    const { container } = render(
      <Hexagon
        content={content}
        isRevealed={false}
        colorVariant="emerald"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(container.querySelector(".bg-emerald-900")).toBeInTheDocument();
  });

  it("applies red color variant styles", () => {
    const content: HexContent = { type: "heart" };
    const { container } = render(
      <Hexagon
        content={content}
        isRevealed={false}
        colorVariant="red"
        onClick={mockOnClick}
        index={0}
      />
    );

    expect(container.querySelector(".bg-red-950")).toBeInTheDocument();
  });
});
