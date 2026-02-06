import { render, screen } from "@testing-library/react";
import { StatsDisplay } from "./StatsDisplay";
import type { Reminder, ReminderLog } from "../types/reminder";

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
    active: true,
    streak: 31,
    lastConfirmed: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Inactive",
    description: "Off",
    scheduleTime: "12:00",
    scheduleDays: [1],
    escalationMinutes: 10,
    maxEscalations: 1,
    active: false,
    streak: 0,
    lastConfirmed: null,
    createdAt: new Date().toISOString(),
  },
];

const mockHistory: ReminderLog[] = [
  {
    id: 1,
    reminderId: 1,
    scheduledFor: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    confirmedAt: new Date().toISOString(),
    confirmationCode: "7742",
    escalationCount: 0,
    status: "confirmed",
  },
  {
    id: 2,
    reminderId: 1,
    scheduledFor: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    confirmedAt: new Date().toISOString(),
    confirmationCode: "3891",
    escalationCount: 1,
    status: "confirmed",
  },
  {
    id: 3,
    reminderId: 1,
    scheduledFor: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    confirmedAt: null,
    confirmationCode: "5523",
    escalationCount: 3,
    status: "expired",
  },
];

describe("StatsDisplay", () => {
  it("renders the Stats heading", () => {
    render(<StatsDisplay reminders={mockReminders} history={mockHistory} />);

    expect(screen.getByText("Stats")).toBeInTheDocument();
  });

  it("shows active reminders count", () => {
    render(<StatsDisplay reminders={mockReminders} history={mockHistory} />);

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("reminders")).toBeInTheDocument();
  });

  it("shows best streak", () => {
    render(<StatsDisplay reminders={mockReminders} history={mockHistory} />);

    expect(screen.getByText("Best Streak")).toBeInTheDocument();
  });

  it("shows compliance rate", () => {
    render(<StatsDisplay reminders={mockReminders} history={mockHistory} />);

    // 2 confirmed out of 3 total = 67%
    expect(screen.getByText("67%")).toBeInTheDocument();
    expect(screen.getByText("Compliance")).toBeInTheDocument();
  });

  it("shows total confirmations count", () => {
    render(<StatsDisplay reminders={mockReminders} history={mockHistory} />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("confirmations")).toBeInTheDocument();
  });

  it("renders last 7 days section", () => {
    render(<StatsDisplay reminders={mockReminders} history={mockHistory} />);

    expect(screen.getByText("Last 7 Days")).toBeInTheDocument();
  });

  it("renders streaks by reminder section for active reminders", () => {
    render(<StatsDisplay reminders={mockReminders} history={mockHistory} />);

    expect(screen.getByText("Streaks by Reminder")).toBeInTheDocument();
    expect(screen.getByText("Take Adderall")).toBeInTheDocument();
    expect(screen.getByText("Water plants")).toBeInTheDocument();
  });

  it("does not show inactive reminders in streaks section", () => {
    render(<StatsDisplay reminders={mockReminders} history={mockHistory} />);

    // "Inactive" reminder should not appear in streaks
    expect(screen.queryByText("Inactive")).not.toBeInTheDocument();
  });

  it("shows 100% compliance when no history", () => {
    render(<StatsDisplay reminders={mockReminders} history={[]} />);

    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
