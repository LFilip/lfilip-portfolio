import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReminderForm } from "./ReminderForm";
import type { Reminder } from "../types/reminder";

describe("ReminderForm Component", () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  const existingReminder: Reminder = {
    id: 1,
    name: "Existing Reminder",
    description: "Existing description",
    scheduleTime: "14:30",
    scheduleDays: [0, 6],
    escalationMinutes: 30,
    maxEscalations: 2,
    active: true,
    streak: 10,
    lastConfirmed: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    mockOnSave.mockClear();
    mockOnCancel.mockClear();
  });

  describe("New Reminder Mode", () => {
    it("should render with empty fields", () => {
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText(/reminder name/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      expect(nameInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
    });

    it("should show Create Reminder button", () => {
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      expect(
        screen.getByRole("button", { name: /create reminder/i })
      ).toBeInTheDocument();
    });

    it("should have weekdays selected by default", () => {
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const mondayButton = screen.getByRole("button", { name: /monday/i });
      const saturdayButton = screen.getByRole("button", { name: /saturday/i });

      expect(mondayButton).toHaveAttribute("aria-pressed", "true");
      expect(saturdayButton).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Edit Mode", () => {
    it("should pre-fill fields with existing reminder data", () => {
      render(
        <ReminderForm
          reminder={existingReminder}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/reminder name/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      expect(nameInput).toHaveValue("Existing Reminder");
      expect(descriptionInput).toHaveValue("Existing description");
    });

    it("should show Save Changes button", () => {
      render(
        <ReminderForm
          reminder={existingReminder}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      );

      expect(
        screen.getByRole("button", { name: /save changes/i })
      ).toBeInTheDocument();
    });

    it("should pre-select reminder days", () => {
      render(
        <ReminderForm
          reminder={existingReminder}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      );

      const sundayButton = screen.getByRole("button", { name: /sunday/i });
      const saturdayButton = screen.getByRole("button", { name: /saturday/i });
      const mondayButton = screen.getByRole("button", { name: /monday/i });

      expect(sundayButton).toHaveAttribute("aria-pressed", "true");
      expect(saturdayButton).toHaveAttribute("aria-pressed", "true");
      expect(mondayButton).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Input Handling", () => {
    it("should update name field when typing", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText(/reminder name/i);
      await user.type(nameInput, "New Task");

      expect(nameInput).toHaveValue("New Task");
    });

    it("should update description field when typing", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const descriptionInput = screen.getByLabelText(/description/i);
      await user.type(descriptionInput, "My description");

      expect(descriptionInput).toHaveValue("My description");
    });

    it("should toggle days when clicked", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const saturdayButton = screen.getByRole("button", { name: /saturday/i });
      expect(saturdayButton).toHaveAttribute("aria-pressed", "false");

      await user.click(saturdayButton);

      expect(saturdayButton).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("Validation", () => {
    it("should disable submit when name is empty", () => {
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole("button", { name: /create reminder/i });
      expect(submitButton).toBeDisabled();
    });

    it("should disable submit when no days selected", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      // Type a name
      const nameInput = screen.getByLabelText(/reminder name/i);
      await user.type(nameInput, "Test");

      // Deselect all default days (weekdays)
      for (const dayName of ["monday", "tuesday", "wednesday", "thursday", "friday"]) {
        const button = screen.getByRole("button", { name: new RegExp(dayName, "i") });
        await user.click(button);
      }

      const submitButton = screen.getByRole("button", { name: /create reminder/i });
      expect(submitButton).toBeDisabled();
    });

    it("should show error message when no days selected", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      // Deselect all default days
      for (const dayName of ["monday", "tuesday", "wednesday", "thursday", "friday"]) {
        const button = screen.getByRole("button", { name: new RegExp(dayName, "i") });
        await user.click(button);
      }

      expect(screen.getByText(/select at least one day/i)).toBeInTheDocument();
    });

    it("should enable submit when name and days are valid", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText(/reminder name/i);
      await user.type(nameInput, "Valid Task");

      const submitButton = screen.getByRole("button", { name: /create reminder/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("Form Submission", () => {
    it("should call onSave with form data on submit", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText(/reminder name/i);
      await user.type(nameInput, "New Reminder");

      const submitButton = screen.getByRole("button", { name: /create reminder/i });
      await user.click(submitButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "New Reminder",
          active: true,
        })
      );
    });

    it("should trim name and description", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText(/reminder name/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      await user.type(nameInput, "  Trimmed Name  ");
      await user.type(descriptionInput, "  Trimmed Description  ");

      const submitButton = screen.getByRole("button", { name: /create reminder/i });
      await user.click(submitButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Trimmed Name",
          description: "Trimmed Description",
        })
      );
    });

    it("should call onCancel when Cancel button clicked", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      await user.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalled();
    });

    it("should preserve active state from existing reminder", async () => {
      const user = userEvent.setup();
      const inactiveReminder = { ...existingReminder, active: false };

      render(
        <ReminderForm
          reminder={inactiveReminder}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      );

      const submitButton = screen.getByRole("button", { name: /save changes/i });
      await user.click(submitButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          active: false,
        })
      );
    });
  });

  describe("Advanced Settings", () => {
    it("should show advanced settings when toggle clicked", async () => {
      const user = userEvent.setup();
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      const advancedToggle = screen.getByRole("button", { name: /advanced settings/i });
      await user.click(advancedToggle);

      expect(screen.getByLabelText(/escalation interval/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/maximum escalations/i)).toBeInTheDocument();
    });

    it("should hide advanced settings initially", () => {
      render(<ReminderForm onSave={mockOnSave} onCancel={mockOnCancel} />);

      expect(
        screen.queryByLabelText(/escalation interval/i)
      ).not.toBeInTheDocument();
    });
  });
});
