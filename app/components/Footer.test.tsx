import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should render the footer", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("should render GitHub link", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/lfilip");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render LinkedIn link", () => {
    render(<Footer />);

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/louis-filip-b5049b106/");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("should render Email link", () => {
    render(<Footer />);

    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:louisfilip@gmail.com");
  });

  it("should not have target=_blank on email link", () => {
    render(<Footer />);

    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).not.toHaveAttribute("target");
  });

  it("should render copyright with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Louis Filip`)).toBeInTheDocument();
  });

  it("should have proper styling classes", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-zinc-950", "border-t", "border-zinc-800");
  });

  it("should render three social links", () => {
    render(<Footer />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });
});
