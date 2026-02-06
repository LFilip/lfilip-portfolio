import { render, screen, fireEvent } from "@testing-library/react";
import BlockMinerPage from "./page";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("BlockMinerPage", () => {
  let dateNowCounter: number;

  beforeEach(() => {
    dateNowCounter = 1000000;
    jest.spyOn(Date, "now").mockImplementation(() => dateNowCounter++);
    jest.useFakeTimers({ legacyFakeTimers: false });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("renders the game title", () => {
    render(<BlockMinerPage />);

    expect(screen.getByText("Block Miner")).toBeInTheDocument();
  });

  it("renders a back link to projects", () => {
    render(<BlockMinerPage />);

    const backLink = screen.getByRole("link", { name: /back to projects/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });

  it("renders initial stats with 0 coins and 0 mined", () => {
    render(<BlockMinerPage />);

    expect(screen.getByText("Coins: 0")).toBeInTheDocument();
    expect(screen.getByText("Mined: 0")).toBeInTheDocument();
  });

  it("renders the first block type (Dirt)", () => {
    render(<BlockMinerPage />);

    expect(screen.getByText("Dirt")).toBeInTheDocument();
    expect(screen.getByText("5 / 5")).toBeInTheDocument();
  });

  it("renders initial pickaxe equipment", () => {
    render(<BlockMinerPage />);

    expect(screen.getByText(/Wooden Pickaxe/)).toBeInTheDocument();
    expect(screen.getByText(/1 dmg\/click/)).toBeInTheDocument();
  });

  it("damages the block on click", () => {
    render(<BlockMinerPage />);

    const clickableArea = document.querySelector(".cursor-pointer") as HTMLElement;
    fireEvent.click(clickableArea, { clientX: 50, clientY: 50 });

    expect(screen.getByText("4 / 5")).toBeInTheDocument();
  });

  it("earns coins when a block is destroyed", () => {
    render(<BlockMinerPage />);

    const clickableArea = document.querySelector(".cursor-pointer") as HTMLElement;

    // Dirt has 5 HP, wooden pickaxe does 1 damage, so 5 clicks to break
    for (let i = 0; i < 5; i++) {
      fireEvent.click(clickableArea, { clientX: 50, clientY: 50 });
    }

    // Dirt rewards 1 coin
    expect(screen.getByText("Coins: 1")).toBeInTheDocument();
    expect(screen.getByText("Mined: 1")).toBeInTheDocument();
  });

  it("cycles to next block type after destroying a block", () => {
    render(<BlockMinerPage />);

    const clickableArea = document.querySelector(".cursor-pointer") as HTMLElement;

    // Break dirt (5 clicks)
    for (let i = 0; i < 5; i++) {
      fireEvent.click(clickableArea, { clientX: 50, clientY: 50 });
    }

    // Next block is Stone
    expect(screen.getByText("Stone")).toBeInTheDocument();
  });

  it("renders upgrade buttons", () => {
    render(<BlockMinerPage />);

    expect(screen.getByText("Stone Pickaxe")).toBeInTheDocument();
    expect(screen.getByText("50 coins")).toBeInTheDocument();
  });

  it("disables upgrade buttons when not enough coins", () => {
    render(<BlockMinerPage />);

    const pickaxeUpgrade = screen.getByText("Stone Pickaxe").closest("button")!;
    expect(pickaxeUpgrade).toBeDisabled();
  });

  it("renders accordion sections", () => {
    render(<BlockMinerPage />);

    expect(screen.getByText("How to Play")).toBeInTheDocument();
    expect(screen.getByText("Game Mechanics")).toBeInTheDocument();
    expect(screen.getByText("About this Project")).toBeInTheDocument();
  });
});
