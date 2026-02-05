import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReminderCard } from "./ReminderCard";
import type { Reminder } from "../types/reminder";

describe("ReminderCard Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggle = jest.fn();
  const mockOnDemo = jest.fn();

  const baseReminder: Reminder = {
    id: 1,
    name: "Test Reminder",
    description: "Test description",
    scheduleTime: "09:00",
    scheduleDays: [1, 2, 3, 4, 5],
    escalationMinutes: 15,
    maxEscalations: 3,
    active: true,
    streak: 5,
    lastConfirmed: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
    mockOnToggle.mockClear();
    mockOnDemo.mockClear();
  });

  it("should display reminder name", () => {
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    expect(screen.getByText("Test Reminder")).toBeInTheDocument();
  });

  it("should display reminder description", () => {
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should display streak count", () => {
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it("should show sparkle emoji for streak >= 7", () => {
    const reminderWithStreak = { ...baseReminder, streak: 10 };
    render(
      <ReminderCard
        reminder={reminderWithStreak}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    expect(screen.getByText(/10 ✨/)).toBeInTheDocument();
  });

  it("should show fire emoji for streak >= 30", () => {
    const reminderWithStreak = { ...baseReminder, streak: 35 };
    render(
      <ReminderCard
        reminder={reminderWithStreak}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    expect(screen.getByText(/35 🔥/)).toBeInTheDocument();
  });

  it("should display formatted time", () => {
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    expect(screen.getByText("9:00 AM")).toBeInTheDocument();
  });

  it("should display schedule days", () => {
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    expect(screen.getByText("Mo")).toBeInTheDocument();
    expect(screen.getByText("Tu")).toBeInTheDocument();
    expect(screen.getByText("We")).toBeInTheDocument();
    expect(screen.getByText("Th")).toBeInTheDocument();
    expect(screen.getByText("Fr")).toBeInTheDocument();
  });

  it("should show Paused badge when inactive", () => {
    const inactiveReminder = { ...baseReminder, active: false };
    render(
      <ReminderCard
        reminder={inactiveReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    expect(screen.getByText("Paused")).toBeInTheDocument();
  });

  it("should call onToggle when toggle button clicked", async () => {
    const user = userEvent.setup();
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    const toggleButton = screen.getByRole("button", { name: /pause reminder/i });
    await user.click(toggleButton);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it("should call onEdit when edit button clicked", async () => {
    const user = userEvent.setup();
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    const editButton = screen.getByRole("button", { name: /edit reminder/i });
    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(baseReminder);
  });

  it("should call onDelete when delete button clicked", async () => {
    const user = userEvent.setup();
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete reminder/i });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("should call onDemo when Try Demo button clicked", async () => {
    const user = userEvent.setup();
    render(
      <ReminderCard
        reminder={baseReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    const demoButton = screen.getByRole("button", { name: /try demo/i });
    await user.click(demoButton);

    expect(mockOnDemo).toHaveBeenCalledWith(1);
  });

  it("should disable Demo button when reminder is inactive", () => {
    const inactiveReminder = { ...baseReminder, active: false };
    render(
      <ReminderCard
        reminder={inactiveReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    const demoButton = screen.getByRole("button", { name: /try demo/i });
    expect(demoButton).toBeDisabled();
  });

  it("should apply reduced opacity when inactive", () => {
    const inactiveReminder = { ...baseReminder, active: false };
    const { container } = render(
      <ReminderCard
        reminder={inactiveReminder}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onDemo={mockOnDemo}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("opacity-60");
  });
});
