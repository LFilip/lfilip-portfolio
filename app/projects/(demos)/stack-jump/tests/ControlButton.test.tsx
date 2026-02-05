import { render, screen, fireEvent } from "@testing-library/react";
import { ControlButton } from "../components/ControlButton";

describe("ControlButton", () => {
  const defaultProps = {
    isHolding: false,
    gameOver: false,
    onStartHold: jest.fn(),
    onReleaseHold: jest.fn(),
    onReset: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default text", () => {
    render(<ControlButton {...defaultProps} />);
    expect(screen.getByRole("button")).toHaveTextContent("Hold to Stack!");
  });

  it("shows building text when holding", () => {
    render(<ControlButton {...defaultProps} isHolding={true} />);
    expect(screen.getByRole("button")).toHaveTextContent("Building Stack...");
  });

  it("calls onStartHold on mouse down", () => {
    render(<ControlButton {...defaultProps} />);
    fireEvent.mouseDown(screen.getByRole("button"));
    expect(defaultProps.onStartHold).toHaveBeenCalledTimes(1);
  });

  it("calls onReleaseHold on mouse up", () => {
    render(<ControlButton {...defaultProps} />);
    fireEvent.mouseUp(screen.getByRole("button"));
    expect(defaultProps.onReleaseHold).toHaveBeenCalledTimes(1);
  });

  it("calls onReleaseHold on mouse leave", () => {
    render(<ControlButton {...defaultProps} />);
    fireEvent.mouseLeave(screen.getByRole("button"));
    expect(defaultProps.onReleaseHold).toHaveBeenCalledTimes(1);
  });

  it("is disabled when game is over", () => {
    render(<ControlButton {...defaultProps} gameOver={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("has holding style when isHolding is true", () => {
    render(<ControlButton {...defaultProps} isHolding={true} />);
    expect(screen.getByRole("button")).toHaveClass("bg-amber-500");
  });

  it("has default style when not holding", () => {
    render(<ControlButton {...defaultProps} />);
    expect(screen.getByRole("button")).toHaveClass("bg-emerald-600");
  });
});
