import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders the name heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Louis J. Filip/i })
    ).toBeInTheDocument();
  });

  it("renders the email link", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: /louisfilip@gmail.com/i })
    ).toBeInTheDocument();
  });

  it("renders experience section", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 2, name: /Experience/i })
    ).toBeInTheDocument();
  });

  it("renders skills section", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 2, name: /Skills/i })
    ).toBeInTheDocument();
  });
});
