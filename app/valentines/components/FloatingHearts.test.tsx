import { render, screen } from "@testing-library/react";
import FloatingHearts from "./FloatingHearts";

describe("FloatingHearts", () => {
  it("renders nothing when active is false", () => {
    render(<FloatingHearts active={false} />);
    expect(screen.queryByTestId("floating-hearts")).not.toBeInTheDocument();
  });

  it("renders hearts when active is true", () => {
    render(<FloatingHearts active={true} />);
    const container = screen.getByTestId("floating-hearts");
    expect(container).toBeInTheDocument();
    expect(container.children.length).toBeGreaterThan(0);
  });

  it("has aria-hidden attribute", () => {
    render(<FloatingHearts active={true} />);
    expect(screen.getByTestId("floating-hearts")).toHaveAttribute("aria-hidden", "true");
  });

  it("has pointer-events-none", () => {
    render(<FloatingHearts active={true} />);
    expect(screen.getByTestId("floating-hearts")).toHaveClass("pointer-events-none");
  });
});
