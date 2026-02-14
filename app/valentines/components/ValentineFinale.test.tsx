import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ValentineFinale from "./ValentineFinale";

jest.useFakeTimers();

describe("ValentineFinale", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders question text", () => {
    render(<ValentineFinale />);
    expect(screen.getByTestId("question-text")).toBeInTheDocument();
    expect(screen.getByText("Will")).toBeInTheDocument();
    expect(screen.getByText("Valentine?")).toBeInTheDocument();
  });

  it("shows buttons after timer delay", () => {
    render(<ValentineFinale />);
    expect(screen.queryByTestId("finale-buttons")).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    expect(screen.getByTestId("finale-buttons")).toBeInTheDocument();
    expect(screen.getByTestId("yes-button")).toBeInTheDocument();
    expect(screen.getByTestId("no-button")).toBeInTheDocument();
  });

  it("transitions to celebration when Yes is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ValentineFinale />);

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    await user.click(screen.getByTestId("yes-button"));

    expect(screen.getByTestId("celebration")).toBeInTheDocument();
    expect(screen.getByText("I knew you'd say yes!")).toBeInTheDocument();
  });

  it("dodges No button on hover with transform change", () => {
    render(<ValentineFinale />);

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    const noButton = screen.getByTestId("no-button");

    // Initially no transform offset
    expect(noButton.style.transform).not.toContain("vw");

    // Simulate hover
    fireEvent.mouseEnter(noButton);

    // After dodge, should have translate transform
    expect(noButton.style.transform).toContain("vw");
  });

  it("escalates No button text", () => {
    render(<ValentineFinale />);

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    const noButton = screen.getByTestId("no-button");
    expect(noButton).toHaveTextContent("No");

    // Hover multiple times to escalate
    for (let i = 0; i < 4; i++) {
      fireEvent.mouseEnter(noButton);
    }
    expect(noButton).toHaveTextContent("Are you sure?");

    fireEvent.mouseEnter(noButton);
    expect(noButton).toHaveTextContent("Really?!");
  });

  it("converts No button to 'Also Yes!' after enough attempts", () => {
    render(<ValentineFinale />);

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    const noButton = screen.getByTestId("no-button");

    // Hover 7 times to convert
    for (let i = 0; i < 7; i++) {
      fireEvent.mouseEnter(noButton);
    }

    expect(noButton).toHaveTextContent("Also Yes!");
  });

  it("clicking converted No button triggers celebration", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ValentineFinale />);

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    const noButton = screen.getByTestId("no-button");

    // Convert by hovering 7 times
    for (let i = 0; i < 7; i++) {
      fireEvent.mouseEnter(noButton);
    }

    await user.click(noButton);

    expect(screen.getByTestId("celebration")).toBeInTheDocument();
  });

  it("shows floating hearts during celebration", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ValentineFinale />);

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    await user.click(screen.getByTestId("yes-button"));

    expect(screen.getByTestId("floating-hearts")).toBeInTheDocument();
  });

  it("has ornate corners", () => {
    render(<ValentineFinale />);
    expect(screen.getByTestId("ornate-corner-top-left")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-top-right")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-bottom-left")).toBeInTheDocument();
    expect(screen.getByTestId("ornate-corner-bottom-right")).toBeInTheDocument();
  });
});
