import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NudgeDemoPage from "./page";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock the reminder store
const mockResetToMockData = jest.fn();
const mockAddReminder = jest.fn();
const mockUpdateReminder = jest.fn();
const mockDeleteReminder = jest.fn();
const mockToggleActive = jest.fn();

jest.mock("./stores/reminderStore", () => ({
  useReminderStore: () => ({
    reminders: [
      {
        id: 1,
        name: "Take Adderall",
        description: "Morning meds",
        scheduleTime: "09:00",
        scheduleDays: [1, 2, 3, 4, 5],
        escalationMinutes: 15,
        maxEscalations: 3,
        active: true,
        streak: 12,
        lastConfirmed: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    ],
    history: [],
    isHydrated: true,
    addReminder: mockAddReminder,
    updateReminder: mockUpdateReminder,
    deleteReminder: mockDeleteReminder,
    toggleActive: mockToggleActive,
    resetToMockData: mockResetToMockData,
  }),
}));

describe("NudgeDemoPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page header", () => {
    render(<NudgeDemoPage />);

    expect(screen.getByText("Nudge")).toBeInTheDocument();
    expect(screen.getByText("SMS Reminder System Demo")).toBeInTheDocument();
  });

  it("renders the back link", () => {
    render(<NudgeDemoPage />);

    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("renders the tab navigation", () => {
    render(<NudgeDemoPage />);

    expect(screen.getByRole("button", { name: /reminders/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /history/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stats/i })).toBeInTheDocument();
  });

  it("shows reminders tab by default", () => {
    render(<NudgeDemoPage />);

    expect(screen.getByText("Your Reminders")).toBeInTheDocument();
  });

  it("switches to history tab when clicked", async () => {
    const user = userEvent.setup();
    render(<NudgeDemoPage />);

    await user.click(screen.getByRole("button", { name: /history/i }));

    expect(screen.getByText("No history yet")).toBeInTheDocument();
  });

  it("switches to stats tab when clicked", async () => {
    const user = userEvent.setup();
    render(<NudgeDemoPage />);

    await user.click(screen.getByRole("button", { name: /stats/i }));

    expect(screen.getByText("Stats")).toBeInTheDocument();
  });

  it("renders the Reset Demo Data button", () => {
    render(<NudgeDemoPage />);

    expect(screen.getByRole("button", { name: /reset demo data/i })).toBeInTheDocument();
  });

  it("calls resetToMockData when Reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<NudgeDemoPage />);

    await user.click(screen.getByRole("button", { name: /reset demo data/i }));

    expect(mockResetToMockData).toHaveBeenCalled();
  });

  it("renders accordion sections", () => {
    render(<NudgeDemoPage />);

    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(screen.getByText("About the Demo")).toBeInTheDocument();
    expect(screen.getByText("Production Features")).toBeInTheDocument();
  });
});
