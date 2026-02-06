import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoModal from "./VideoModal";

describe("VideoModal", () => {
  const defaultProps = {
    videoId: "abc123",
    title: "Our Song",
    emoji: "🎵",
    onClose: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onClose.mockClear();
  });

  it("renders the modal with title and emoji", () => {
    render(<VideoModal {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Our Song")).toBeInTheDocument();
    expect(screen.getByText("🎵")).toBeInTheDocument();
  });

  it("renders a YouTube iframe with the correct video ID", () => {
    render(<VideoModal {...defaultProps} />);

    const iframe = screen.getByTitle("Our Song");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/abc123?autoplay=1"
    );
  });

  it("has correct aria attributes", () => {
    render(<VideoModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "video-title");
  });

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<VideoModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    await user.click(dialog);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("does not call onClose when modal content is clicked", async () => {
    const user = userEvent.setup();
    render(<VideoModal {...defaultProps} />);

    const title = screen.getByText("Our Song");
    await user.click(title);

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<VideoModal {...defaultProps} />);

    const closeButton = screen.getByLabelText("Close video");
    await user.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("renders ornate corners", () => {
    const { container } = render(<VideoModal {...defaultProps} />);

    // OrnateCorner renders SVGs - 4 corners expected
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(4);
  });
});
