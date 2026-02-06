import { render, screen } from "@testing-library/react";
import { HistoryTimeline } from "./HistoryTimeline";
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
];

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const mockHistory: ReminderLog[] = [
  {
    id: 1,
    reminderId: 1,
    scheduledFor: new Date(yesterday.setHours(9, 0, 0, 0)).toISOString(),
    sentAt: new Date(yesterday.setHours(9, 0, 5, 0)).toISOString(),
    confirmedAt: new Date(yesterday.setHours(9, 12, 0, 0)).toISOString(),
    confirmationCode: "7742",
    escalationCount: 0,
    status: "confirmed",
  },
  {
    id: 2,
    reminderId: 1,
    scheduledFor: new Date(yesterday.setHours(8, 0, 0, 0)).toISOString(),
    sentAt: new Date(yesterday.setHours(8, 0, 5, 0)).toISOString(),
    confirmedAt: null,
    confirmationCode: "5523",
    escalationCount: 3,
    status: "expired",
  },
];

describe("HistoryTimeline", () => {
  it("renders the History heading", () => {
    render(<HistoryTimeline history={mockHistory} reminders={mockReminders} />);

    expect(screen.getByText("History")).toBeInTheDocument();
  });

  it("renders history entries with reminder names", () => {
    render(<HistoryTimeline history={mockHistory} reminders={mockReminders} />);

    const names = screen.getAllByText("Take Adderall");
    expect(names.length).toBe(2);
  });

  it("shows confirmed status badge", () => {
    render(<HistoryTimeline history={mockHistory} reminders={mockReminders} />);

    expect(screen.getByText("confirmed")).toBeInTheDocument();
  });

  it("shows expired status badge", () => {
    render(<HistoryTimeline history={mockHistory} reminders={mockReminders} />);

    expect(screen.getByText("expired")).toBeInTheDocument();
  });

  it("shows escalation count when > 0", () => {
    render(<HistoryTimeline history={mockHistory} reminders={mockReminders} />);

    expect(screen.getByText("3 escalations")).toBeInTheDocument();
  });

  it("renders empty state when no history", () => {
    render(<HistoryTimeline history={[]} reminders={mockReminders} />);

    expect(screen.getByText("No history yet")).toBeInTheDocument();
  });

  it("shows Unknown for unmatched reminder IDs", () => {
    const orphanHistory: ReminderLog[] = [
      {
        id: 10,
        reminderId: 999,
        scheduledFor: new Date().toISOString(),
        sentAt: new Date().toISOString(),
        confirmedAt: null,
        confirmationCode: "1111",
        escalationCount: 0,
        status: "pending",
      },
    ];

    render(<HistoryTimeline history={orphanHistory} reminders={mockReminders} />);

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
