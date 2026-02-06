import { render, screen, fireEvent } from "@testing-library/react";
import PackageSorterPage from "./page";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("PackageSorterPage", () => {
  it("renders the page title", () => {
    render(<PackageSorterPage />);

    expect(screen.getByText("Package Sorting System")).toBeInTheDocument();
  });

  it("renders a back link to projects", () => {
    render(<PackageSorterPage />);

    const backLink = screen.getByRole("link", { name: /back to projects/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });

  it("renders the problem description", () => {
    render(<PackageSorterPage />);

    expect(screen.getByText("The Problem")).toBeInTheDocument();
  });

  it("renders the classification rules section", () => {
    render(<PackageSorterPage />);

    expect(screen.getByText("Classification Rules")).toBeInTheDocument();
  });

  it("shows STANDARD classification result for default small package", () => {
    render(<PackageSorterPage />);

    // The result panel has a large text-4xl bold display of the classification
    const resultDisplay = screen.getByText("Normal handling - automated");
    expect(resultDisplay).toBeInTheDocument();
  });

  it("renders dimension sliders", () => {
    render(<PackageSorterPage />);

    expect(screen.getAllByRole("slider")).toHaveLength(4);
  });

  it("updates classification when mass slider makes package heavy", () => {
    render(<PackageSorterPage />);

    const sliders = screen.getAllByRole("slider");
    const massSlider = sliders[3]; // Width, Height, Length, Mass

    fireEvent.change(massSlider, { target: { value: "25" } });

    // SPECIAL shows "Requires manual handling"
    expect(screen.getByText("Requires manual handling")).toBeInTheDocument();
  });

  it("shows REJECTED result for bulky and heavy packages", () => {
    render(<PackageSorterPage />);

    const sliders = screen.getAllByRole("slider");

    // Make it bulky (width=200) and heavy (mass=25)
    fireEvent.change(sliders[0], { target: { value: "200" } });
    fireEvent.change(sliders[3], { target: { value: "25" } });

    expect(screen.getByText("Cannot be processed")).toBeInTheDocument();
  });

  it("renders Sort Package button", () => {
    render(<PackageSorterPage />);

    expect(screen.getByRole("button", { name: /sort package/i })).toBeInTheDocument();
  });

  it("adds a package to the recent packages table when sorted", () => {
    render(<PackageSorterPage />);

    fireEvent.click(screen.getByRole("button", { name: /sort package/i }));

    expect(screen.getByText("Recent Packages")).toBeInTheDocument();
  });

  it("renders the stack descriptions", () => {
    render(<PackageSorterPage />);

    expect(screen.getByText(/Normal packages that can be handled automatically/)).toBeInTheDocument();
    expect(screen.getByText(/too heavy OR too bulky/)).toBeInTheDocument();
    expect(screen.getByText(/both heavy AND bulky/)).toBeInTheDocument();
  });

  it("renders the implementation section", () => {
    render(<PackageSorterPage />);

    expect(screen.getByText("Implementation")).toBeInTheDocument();
  });

  it("shows volume calculation", () => {
    render(<PackageSorterPage />);

    // Default: 50x50x50 = 125,000
    expect(screen.getByText(/125,000/)).toBeInTheDocument();
  });
});
