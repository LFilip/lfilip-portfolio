import { render, screen } from "@testing-library/react";
import OrnateCorner from "./OrnateCorner";

describe("OrnateCorner", () => {
  it("renders SVG element", () => {
    render(<OrnateCorner position="top-left" />);
    const svg = screen.getByTestId("ornate-corner-top-left");
    expect(svg).toBeInTheDocument();
    expect(svg.tagName.toLowerCase()).toBe("svg");
  });

  it("applies correct rotation for top-left", () => {
    render(<OrnateCorner position="top-left" />);
    const svg = screen.getByTestId("ornate-corner-top-left");
    expect(svg).toHaveClass("rotate-0");
    expect(svg).toHaveClass("top-0");
    expect(svg).toHaveClass("left-0");
  });

  it("applies correct rotation for top-right", () => {
    render(<OrnateCorner position="top-right" />);
    const svg = screen.getByTestId("ornate-corner-top-right");
    expect(svg).toHaveClass("rotate-90");
    expect(svg).toHaveClass("top-0");
    expect(svg).toHaveClass("right-0");
  });

  it("applies correct rotation for bottom-left", () => {
    render(<OrnateCorner position="bottom-left" />);
    const svg = screen.getByTestId("ornate-corner-bottom-left");
    expect(svg).toHaveClass("-rotate-90");
    expect(svg).toHaveClass("bottom-0");
    expect(svg).toHaveClass("left-0");
  });

  it("applies correct rotation for bottom-right", () => {
    render(<OrnateCorner position="bottom-right" />);
    const svg = screen.getByTestId("ornate-corner-bottom-right");
    expect(svg).toHaveClass("rotate-180");
    expect(svg).toHaveClass("bottom-0");
    expect(svg).toHaveClass("right-0");
  });

  it("is hidden from screen readers", () => {
    render(<OrnateCorner position="top-left" />);
    const svg = screen.getByTestId("ornate-corner-top-left");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
