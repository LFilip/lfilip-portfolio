import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Envelope from "./Envelope";

describe("Envelope", () => {
  it("renders wax seal when closed", () => {
    render(<Envelope isOpen={false} onSealClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Open envelope" })).toBeInTheDocument();
  });

  it("hides wax seal when open", () => {
    render(<Envelope isOpen={true} onSealClick={() => {}} />);
    expect(screen.queryByRole("button", { name: "Open envelope" })).not.toBeInTheDocument();
  });

  it("shows card content when open", () => {
    render(<Envelope isOpen={true} onSealClick={() => {}} />);
    expect(screen.getByText("My Dearest")).toBeInTheDocument();
  });

  it("hides card content when closed", () => {
    render(<Envelope isOpen={false} onSealClick={() => {}} />);
    expect(screen.queryByText("My Dearest")).not.toBeInTheDocument();
  });

  it("calls onSealClick when wax seal is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Envelope isOpen={false} onSealClick={handleClick} />);

    const seal = screen.getByRole("button", { name: "Open envelope" });
    await user.click(seal);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies open transform to flap when open", () => {
    render(<Envelope isOpen={true} onSealClick={() => {}} />);
    const flap = screen.getByTestId("envelope-flap");
    expect(flap.style.transform).toBe("rotateX(-180deg)");
  });

  it("applies closed transform to flap when closed", () => {
    render(<Envelope isOpen={false} onSealClick={() => {}} />);
    const flap = screen.getByTestId("envelope-flap");
    expect(flap.style.transform).toBe("rotateX(0deg)");
  });

  it("has dark envelope styling", () => {
    const { container } = render(<Envelope isOpen={false} onSealClick={() => {}} />);
    const envelopeBody = container.querySelector(".bg-zinc-900");
    expect(envelopeBody).toBeInTheDocument();
  });

  it("shows hexagon overlay on envelope", () => {
    render(<Envelope isOpen={false} onSealClick={() => {}} />);
    expect(screen.getByTestId("hex-overlay")).toBeInTheDocument();
  });

  it("shows skip button when showSkip is true and onSkip is provided", () => {
    render(<Envelope isOpen={true} onSealClick={() => {}} onSkip={() => {}} showSkip={true} />);
    expect(screen.getByRole("button", { name: "Skip to memory quilt" })).toBeInTheDocument();
  });

  it("hides skip button when showSkip is false", () => {
    render(<Envelope isOpen={true} onSealClick={() => {}} onSkip={() => {}} showSkip={false} />);
    expect(screen.queryByRole("button", { name: "Skip to memory quilt" })).not.toBeInTheDocument();
  });

  it("calls onSkip when skip button is clicked", async () => {
    const user = userEvent.setup();
    const handleSkip = jest.fn();
    render(<Envelope isOpen={true} onSealClick={() => {}} onSkip={handleSkip} showSkip={true} />);

    const skipButton = screen.getByRole("button", { name: "Skip to memory quilt" });
    await user.click(skipButton);

    expect(handleSkip).toHaveBeenCalledTimes(1);
  });
});
