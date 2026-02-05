import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WaxSeal from "./WaxSeal";

describe("WaxSeal", () => {
  it("renders a button", () => {
    render(<WaxSeal onClick={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<WaxSeal onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Open envelope" });
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<WaxSeal onClick={handleClick} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has wax seal styling", () => {
    render(<WaxSeal onClick={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("bg-gradient-to-br");
    expect(button).toHaveClass("from-purple-700");
    expect(button).toHaveClass("to-purple-900");
  });

  it("has pulse animation", () => {
    render(<WaxSeal onClick={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("animate-pulse");
  });
});
