import { render, screen } from "@testing-library/react";
import HexOverlay from "./HexOverlay";

describe("HexOverlay", () => {
  it("renders the overlay SVG", () => {
    render(<HexOverlay />);
    expect(screen.getByTestId("hex-overlay")).toBeInTheDocument();
  });

  it("has aria-hidden attribute", () => {
    render(<HexOverlay />);
    const overlay = screen.getByTestId("hex-overlay");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });

  it("has pointer-events-none class", () => {
    render(<HexOverlay />);
    const overlay = screen.getByTestId("hex-overlay");
    expect(overlay).toHaveClass("pointer-events-none");
  });

  it("has subtle opacity", () => {
    render(<HexOverlay />);
    const overlay = screen.getByTestId("hex-overlay");
    expect(overlay).toHaveClass("opacity-15");
  });

  it("accepts custom className", () => {
    render(<HexOverlay className="custom-class" />);
    const overlay = screen.getByTestId("hex-overlay");
    expect(overlay).toHaveClass("custom-class");
  });

  it("positions absolutely", () => {
    render(<HexOverlay />);
    const overlay = screen.getByTestId("hex-overlay");
    expect(overlay).toHaveClass("absolute");
    expect(overlay).toHaveClass("inset-0");
  });

  it("contains hexagon pattern definition", () => {
    const { container } = render(<HexOverlay />);
    const pattern = container.querySelector("#hexPattern");
    expect(pattern).toBeInTheDocument();
  });

  it("contains gradient definition", () => {
    const { container } = render(<HexOverlay />);
    const gradient = container.querySelector("#hexGradient");
    expect(gradient).toBeInTheDocument();
  });
});
