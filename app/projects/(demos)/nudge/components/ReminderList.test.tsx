import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReminderList } from "./ReminderList";
import type { Reminder } from "../types/reminder";

const mockReminders: Reminder[] = [
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
  {
    id: 2,
    name: "Water plants",
    description: "All indoor plants",
    scheduleTime: "18:00",
    scheduleDays: [0, 3, 6],
    escalationMinutes: 30,
    maxEscalations: 2,
    active: false,
    streak: 0,
    lastConfirmed: null,
    createdAt: new Date().toISOString(),
  },
];

describe("ReminderList", () => {
  const defaultProps = {
    reminders: mockReminders,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onToggle: jest.fn(),
    onDemo: jest.fn(),
    onAdd: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the heading with active count", () => {
    render(<ReminderList {...defaultProps} />);

    expect(screen.getByText("Your Reminders")).toBeInTheDocument();
    expect(screen.getByText("(1 active)")).toBeInTheDocument();
  });

  it("renders an Add button", () => {
    render(<ReminderList {...defaultProps} />);

    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls onAdd when Add button is clicked", async () => {
    const user = userEvent.setup();
    render(<ReminderList {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(defaultProps.onAdd).toHaveBeenCalled();
  });

  it("renders reminder cards for each reminder", () => {
    render(<ReminderList {...defaultProps} />);

    expect(screen.getByText("Take Adderall")).toBeInTheDocument();
    expect(screen.getByText("Water plants")).toBeInTheDocument();
  });

  it("sorts active reminders before inactive ones", () => {
    render(<ReminderList {...defaultProps} />);

    const cards = screen.getAllByText(/Take Adderall|Water plants/);
    expect(cards[0]).toHaveTextContent("Take Adderall");
    expect(cards[1]).toHaveTextContent("Water plants");
  });

  it("renders empty state when no reminders", () => {
    render(<ReminderList {...defaultProps} reminders={[]} />);

    expect(screen.getByText("No reminders yet")).toBeInTheDocument();
    expect(screen.getByText("Create your first reminder to get started")).toBeInTheDocument();
  });

  it("calls onAdd from empty state Create Reminder button", async () => {
    const user = userEvent.setup();
    render(<ReminderList {...defaultProps} reminders={[]} />);

    await user.click(screen.getByRole("button", { name: /create reminder/i }));

    expect(defaultProps.onAdd).toHaveBeenCalled();
  });
});
