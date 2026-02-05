import { render, screen } from "@testing-library/react";
import CardContent from "./CardContent";

describe("CardContent", () => {
  it("renders the card content", () => {
    render(<CardContent isVisible={true} />);
    expect(screen.getByText("My Dearest")).toBeInTheDocument();
    expect(screen.getByText("Forever Yours")).toBeInTheDocument();
  });

  it("renders all four ornate corners", () => {
    render(<CardContent isVisible={true} />);
    expect(screen.getByTestId("ornate-corner-top-left")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-top-right")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-bottom-left")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-bottom-right")).toBeInTheDocument();
  });

  it("applies visible styles when isVisible is true", () => {
    const { container } = render(<CardContent isVisible={true} />);
    const card = container.firstChild;
    expect(card).toHaveClass("opacity-100");
    expect(card).toHaveClass("scale-100");
  });

  it("applies hidden styles when isVisible is false", () => {
    const { container } = render(<CardContent isVisible={false} />);
    const card = container.firstChild;
    expect(card).toHaveClass("opacity-0");
    expect(card).toHaveClass("scale-95");
  });

  it("has dark card styling", () => {
    const { container } = render(<CardContent isVisible={true} />);
    const card = container.firstChild;
    expect(card).toHaveClass("bg-zinc-900");
    expect(card).toHaveClass("border-purple-900/50");
  });
});
