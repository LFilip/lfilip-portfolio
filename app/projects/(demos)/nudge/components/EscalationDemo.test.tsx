import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EscalationDemo } from "./EscalationDemo";
import type { Reminder } from "../types/reminder";

// Mock the reminder store
const mockStartDemo = jest.fn();
const mockSendEscalation = jest.fn();
const mockConfirmReminder = jest.fn();
const mockResetDemo = jest.fn();

jest.mock("../stores/reminderStore", () => ({
  useReminderStore: () => ({
    demoPhase: "initial_sms",
    demoMessages: [
      {
        id: 1,
        direction: "outgoing" as const,
        content: "Reminder: Take Adderall. Reply 1234 to confirm.",
        timestamp: new Date().toISOString(),
      },
    ],
    demoConfirmationCode: "1234",
    demoEscalationCount: 0,
    startDemo: mockStartDemo,
    sendEscalation: mockSendEscalation,
    confirmReminder: mockConfirmReminder,
    resetDemo: mockResetDemo,
  }),
}));

const mockReminder: Reminder = {
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
};

// Mock scrollIntoView which doesn't exist in jsdom
Element.prototype.scrollIntoView = jest.fn();

describe("EscalationDemo", () => {
  const defaultProps = {
    reminder: mockReminder,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the demo header with reminder name", () => {
    render(<EscalationDemo {...defaultProps} />);

    expect(screen.getByText("Demo: Take Adderall")).toBeInTheDocument();
    expect(screen.getByText("See how SMS reminders and escalation work")).toBeInTheDocument();
  });

  it("calls startDemo on mount", () => {
    render(<EscalationDemo {...defaultProps} />);

    expect(mockStartDemo).toHaveBeenCalledWith(1);
  });

  it("calls resetDemo on unmount", () => {
    const { unmount } = render(<EscalationDemo {...defaultProps} />);

    unmount();

    expect(mockResetDemo).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<EscalationDemo {...defaultProps} />);

    await user.click(screen.getByLabelText("Close demo"));

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("renders escalation timeline steps", () => {
    render(<EscalationDemo {...defaultProps} />);

    expect(screen.getByText("Initial SMS")).toBeInTheDocument();
    expect(screen.getByText("1st Escalation")).toBeInTheDocument();
    expect(screen.getByText("2nd Escalation")).toBeInTheDocument();
    expect(screen.getByText("Final Warning")).toBeInTheDocument();
    expect(screen.getByText("Expires")).toBeInTheDocument();
  });

  it("shows the phase label", () => {
    render(<EscalationDemo {...defaultProps} />);

    expect(screen.getByText("Initial Reminder Sent")).toBeInTheDocument();
  });

  it("renders the Skip to Next Escalation button", () => {
    render(<EscalationDemo {...defaultProps} />);

    expect(screen.getByText("Skip to Next Escalation")).toBeInTheDocument();
  });

  it("calls sendEscalation when skip button is clicked", async () => {
    const user = userEvent.setup();
    render(<EscalationDemo {...defaultProps} />);

    await user.click(screen.getByText("Skip to Next Escalation"));

    expect(mockSendEscalation).toHaveBeenCalled();
  });

  it("shows escalation count", () => {
    render(<EscalationDemo {...defaultProps} />);

    expect(screen.getByText(/Escalation 0 of 3/)).toBeInTheDocument();
  });

  it("renders SMS Conversation section", () => {
    render(<EscalationDemo {...defaultProps} />);

    expect(screen.getByText("SMS Conversation")).toBeInTheDocument();
  });

  it("renders auto-advance checkbox", () => {
    render(<EscalationDemo {...defaultProps} />);

    expect(screen.getByText("Auto-advance (10x speed)")).toBeInTheDocument();
  });
});
