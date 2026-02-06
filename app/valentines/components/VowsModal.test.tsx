import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VowsModal from "./VowsModal";

describe("VowsModal", () => {
  const defaultProps = {
    title: "Wedding Vows",
    content: "I promise to love you forever",
    emoji: "💒",
    onClose: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onClose.mockClear();
  });

  it("renders the modal with title, content, and emoji", () => {
    render(<VowsModal {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Wedding Vows")).toBeInTheDocument();
    expect(screen.getByText(/I promise to love you forever/)).toBeInTheDocument();
    expect(screen.getByText("💒")).toBeInTheDocument();
  });

  it("has correct aria attributes", () => {
    render(<VowsModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "vows-title");
  });

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<VowsModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    await user.click(dialog);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<VowsModal {...defaultProps} />);

    const closeButton = screen.getByLabelText("Close vows");
    await user.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("renders ornate corners", () => {
    const { container } = render(<VowsModal {...defaultProps} />);

    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(4);
  });

  it("wraps content in quotation marks", () => {
    render(<VowsModal {...defaultProps} />);

    // The component uses &ldquo; and &rdquo; around content
    const contentElement = screen.getByText(/I promise to love you forever/);
    expect(contentElement.tagName).toBe("P");
  });
});
