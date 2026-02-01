import { useReminderStore } from "./reminderStore";
import { mockReminders, mockHistory } from "../data/mockData";

describe("reminderStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useReminderStore.setState({
      reminders: [],
      history: [],
      demoPhase: "idle",
      demoReminderId: null,
      demoLogId: null,
      demoMessages: [],
      demoConfirmationCode: "",
      demoEscalationCount: 0,
      isHydrated: true,
    });
    localStorage.clear();
  });

  describe("Initial State", () => {
    it("should start with empty reminders", () => {
      const { reminders } = useReminderStore.getState();
      expect(reminders).toEqual([]);
    });

    it("should start with empty history", () => {
      const { history } = useReminderStore.getState();
      expect(history).toEqual([]);
    });

    it("should start with demo phase idle", () => {
      const { demoPhase } = useReminderStore.getState();
      expect(demoPhase).toBe("idle");
    });
  });

  describe("addReminder", () => {
    it("should add a reminder with correct defaults", () => {
      useReminderStore.getState().addReminder({
        name: "Test Reminder",
        description: "Test description",
        scheduleTime: "10:00",
        scheduleDays: [1, 2, 3],
        escalationMinutes: 15,
        maxEscalations: 3,
        active: true,
      });

      const { reminders } = useReminderStore.getState();
      expect(reminders).toHaveLength(1);
      expect(reminders[0].name).toBe("Test Reminder");
      expect(reminders[0].description).toBe("Test description");
      expect(reminders[0].streak).toBe(0);
      expect(reminders[0].lastConfirmed).toBeNull();
      expect(reminders[0].id).toBe(1);
    });

    it("should assign incrementing IDs", () => {
      const store = useReminderStore.getState();
      store.addReminder({
        name: "First",
        description: "",
        scheduleTime: "10:00",
        scheduleDays: [1],
        escalationMinutes: 15,
        maxEscalations: 3,
        active: true,
      });
      store.addReminder({
        name: "Second",
        description: "",
        scheduleTime: "10:00",
        scheduleDays: [1],
        escalationMinutes: 15,
        maxEscalations: 3,
        active: true,
      });

      const { reminders } = useReminderStore.getState();
      expect(reminders[0].id).toBe(1);
      expect(reminders[1].id).toBe(2);
    });

    it("should set createdAt timestamp", () => {
      const before = new Date().toISOString();
      useReminderStore.getState().addReminder({
        name: "Test",
        description: "",
        scheduleTime: "10:00",
        scheduleDays: [1],
        escalationMinutes: 15,
        maxEscalations: 3,
        active: true,
      });
      const after = new Date().toISOString();

      const { reminders } = useReminderStore.getState();
      expect(reminders[0].createdAt).toBeDefined();
      expect(reminders[0].createdAt >= before).toBe(true);
      expect(reminders[0].createdAt <= after).toBe(true);
    });
  });

  describe("updateReminder", () => {
    beforeEach(() => {
      useReminderStore.getState().addReminder({
        name: "Original",
        description: "Original description",
        scheduleTime: "10:00",
        scheduleDays: [1, 2, 3],
        escalationMinutes: 15,
        maxEscalations: 3,
        active: true,
      });
    });

    it("should update name", () => {
      useReminderStore.getState().updateReminder(1, { name: "Updated Name" });
      const { reminders } = useReminderStore.getState();
      expect(reminders[0].name).toBe("Updated Name");
    });

    it("should update multiple fields", () => {
      useReminderStore.getState().updateReminder(1, {
        name: "Updated",
        description: "New description",
        scheduleTime: "14:00",
      });

      const { reminders } = useReminderStore.getState();
      expect(reminders[0].name).toBe("Updated");
      expect(reminders[0].description).toBe("New description");
      expect(reminders[0].scheduleTime).toBe("14:00");
    });

    it("should not affect other reminders", () => {
      useReminderStore.getState().addReminder({
        name: "Second",
        description: "",
        scheduleTime: "12:00",
        scheduleDays: [4, 5],
        escalationMinutes: 10,
        maxEscalations: 2,
        active: true,
      });

      useReminderStore.getState().updateReminder(1, { name: "Changed" });

      const { reminders } = useReminderStore.getState();
      expect(reminders[0].name).toBe("Changed");
      expect(reminders[1].name).toBe("Second");
    });
  });

  describe("deleteReminder", () => {
    beforeEach(() => {
      useReminderStore.setState({
        reminders: mockReminders,
        history: mockHistory,
      });
    });

    it("should remove the reminder", () => {
      const initialCount = useReminderStore.getState().reminders.length;
      useReminderStore.getState().deleteReminder(1);

      const { reminders } = useReminderStore.getState();
      expect(reminders.length).toBe(initialCount - 1);
      expect(reminders.find((r) => r.id === 1)).toBeUndefined();
    });

    it("should remove associated history", () => {
      useReminderStore.getState().deleteReminder(1);

      const { history } = useReminderStore.getState();
      const remainingForReminder1 = history.filter((h) => h.reminderId === 1);
      expect(remainingForReminder1).toHaveLength(0);
    });

    it("should not affect other reminders or history", () => {
      useReminderStore.getState().deleteReminder(1);

      const { reminders, history } = useReminderStore.getState();
      expect(reminders.find((r) => r.id === 2)).toBeDefined();
      expect(history.find((h) => h.reminderId === 2)).toBeDefined();
    });
  });

  describe("toggleActive", () => {
    beforeEach(() => {
      useReminderStore.getState().addReminder({
        name: "Test",
        description: "",
        scheduleTime: "10:00",
        scheduleDays: [1],
        escalationMinutes: 15,
        maxEscalations: 3,
        active: true,
      });
      // Set streak manually
      useReminderStore.setState((state) => ({
        reminders: state.reminders.map((r) =>
          r.id === 1 ? { ...r, streak: 5 } : r
        ),
      }));
    });

    it("should toggle active state from true to false", () => {
      useReminderStore.getState().toggleActive(1);

      const { reminders } = useReminderStore.getState();
      expect(reminders[0].active).toBe(false);
    });

    it("should toggle active state from false to true", () => {
      useReminderStore.getState().toggleActive(1); // false
      useReminderStore.getState().toggleActive(1); // true

      const { reminders } = useReminderStore.getState();
      expect(reminders[0].active).toBe(true);
    });

    it("should reset streak when deactivating", () => {
      expect(useReminderStore.getState().reminders[0].streak).toBe(5);

      useReminderStore.getState().toggleActive(1);

      const { reminders } = useReminderStore.getState();
      expect(reminders[0].streak).toBe(0);
    });

    it("should preserve streak when reactivating", () => {
      useReminderStore.getState().toggleActive(1); // deactivate - streak is now 0
      useReminderStore.getState().toggleActive(1); // reactivate

      const { reminders } = useReminderStore.getState();
      expect(reminders[0].streak).toBe(0); // Should stay at 0
    });
  });

  describe("startDemo", () => {
    beforeEach(() => {
      useReminderStore.setState({
        reminders: mockReminders,
        history: [],
      });
    });

    it("should initialize demo state correctly", () => {
      useReminderStore.getState().startDemo(1);

      const state = useReminderStore.getState();
      expect(state.demoPhase).toBe("initial_sms");
      expect(state.demoReminderId).toBe(1);
      expect(state.demoLogId).toBe(1);
      expect(state.demoEscalationCount).toBe(0);
    });

    it("should generate confirmation code", () => {
      useReminderStore.getState().startDemo(1);

      const { demoConfirmationCode } = useReminderStore.getState();
      expect(demoConfirmationCode).toMatch(/^\d{4}$/);
    });

    it("should create initial SMS message", () => {
      useReminderStore.getState().startDemo(1);

      const { demoMessages } = useReminderStore.getState();
      expect(demoMessages).toHaveLength(1);
      expect(demoMessages[0].direction).toBe("outgoing");
      expect(demoMessages[0].content).toContain("Reply");
    });

    it("should create log entry", () => {
      useReminderStore.getState().startDemo(1);

      const { history } = useReminderStore.getState();
      expect(history).toHaveLength(1);
      expect(history[0].reminderId).toBe(1);
      expect(history[0].status).toBe("pending");
    });

    it("should not start demo for non-existent reminder", () => {
      useReminderStore.getState().startDemo(999);

      const { demoPhase, demoReminderId } = useReminderStore.getState();
      expect(demoPhase).toBe("idle");
      expect(demoReminderId).toBeNull();
    });
  });

  describe("sendEscalation", () => {
    beforeEach(() => {
      useReminderStore.setState({
        reminders: mockReminders,
        history: [],
      });
      useReminderStore.getState().startDemo(1);
    });

    it("should increment escalation count", () => {
      useReminderStore.getState().sendEscalation();

      const { demoEscalationCount } = useReminderStore.getState();
      expect(demoEscalationCount).toBe(1);
    });

    it("should add new message", () => {
      const initialCount = useReminderStore.getState().demoMessages.length;
      useReminderStore.getState().sendEscalation();

      const { demoMessages } = useReminderStore.getState();
      expect(demoMessages.length).toBe(initialCount + 1);
    });

    it("should update demo phase", () => {
      useReminderStore.getState().sendEscalation();
      expect(useReminderStore.getState().demoPhase).toBe("escalation_1");

      useReminderStore.getState().sendEscalation();
      expect(useReminderStore.getState().demoPhase).toBe("escalation_2");

      useReminderStore.getState().sendEscalation();
      expect(useReminderStore.getState().demoPhase).toBe("escalation_3");
    });

    it("should expire after max escalations", () => {
      // Mock reminder has maxEscalations: 3
      useReminderStore.getState().sendEscalation(); // 1
      useReminderStore.getState().sendEscalation(); // 2
      useReminderStore.getState().sendEscalation(); // 3
      useReminderStore.getState().sendEscalation(); // Should expire

      const { demoPhase } = useReminderStore.getState();
      expect(demoPhase).toBe("expired");
    });

    it("should update log escalation count", () => {
      useReminderStore.getState().sendEscalation();

      const { history, demoLogId } = useReminderStore.getState();
      const log = history.find((h) => h.id === demoLogId);
      expect(log?.escalationCount).toBe(1);
    });
  });

  describe("confirmReminder", () => {
    beforeEach(() => {
      useReminderStore.setState({
        reminders: mockReminders,
        history: [],
      });
      useReminderStore.getState().startDemo(1);
    });

    it("should confirm with correct code", () => {
      const { demoConfirmationCode } = useReminderStore.getState();
      const result = useReminderStore.getState().confirmReminder(demoConfirmationCode);

      expect(result).toBe(true);
      expect(useReminderStore.getState().demoPhase).toBe("confirmed");
    });

    it("should confirm with DONE keyword", () => {
      const result = useReminderStore.getState().confirmReminder("DONE");

      expect(result).toBe(true);
      expect(useReminderStore.getState().demoPhase).toBe("confirmed");
    });

    it("should be case insensitive", () => {
      const { demoConfirmationCode } = useReminderStore.getState();
      const result = useReminderStore.getState().confirmReminder(
        demoConfirmationCode.toLowerCase()
      );

      expect(result).toBe(true);
    });

    it("should reject incorrect code", () => {
      const result = useReminderStore.getState().confirmReminder("wrong");

      expect(result).toBe(false);
      expect(useReminderStore.getState().demoPhase).not.toBe("confirmed");
    });

    it("should add error message for wrong code", () => {
      const initialCount = useReminderStore.getState().demoMessages.length;
      useReminderStore.getState().confirmReminder("wrong");

      const { demoMessages } = useReminderStore.getState();
      // Should add user message + error message
      expect(demoMessages.length).toBe(initialCount + 2);
      expect(demoMessages[demoMessages.length - 1].content).toContain("Invalid code");
    });

    it("should increment streak on confirmation", () => {
      const initialStreak =
        useReminderStore.getState().reminders.find((r) => r.id === 1)?.streak || 0;
      const { demoConfirmationCode } = useReminderStore.getState();

      useReminderStore.getState().confirmReminder(demoConfirmationCode);

      const reminder = useReminderStore.getState().reminders.find((r) => r.id === 1);
      expect(reminder?.streak).toBe(initialStreak + 1);
    });

    it("should update lastConfirmed timestamp", () => {
      const { demoConfirmationCode } = useReminderStore.getState();
      useReminderStore.getState().confirmReminder(demoConfirmationCode);

      const reminder = useReminderStore.getState().reminders.find((r) => r.id === 1);
      expect(reminder?.lastConfirmed).toBeDefined();
    });

    it("should update log status to confirmed", () => {
      const { demoConfirmationCode, demoLogId } = useReminderStore.getState();
      useReminderStore.getState().confirmReminder(demoConfirmationCode);

      const { history } = useReminderStore.getState();
      const log = history.find((h) => h.id === demoLogId);
      expect(log?.status).toBe("confirmed");
    });
  });

  describe("expireReminder", () => {
    beforeEach(() => {
      useReminderStore.setState({
        reminders: mockReminders,
        history: [],
      });
      useReminderStore.getState().startDemo(1);
    });

    it("should set demo phase to expired", () => {
      useReminderStore.getState().expireReminder();

      const { demoPhase } = useReminderStore.getState();
      expect(demoPhase).toBe("expired");
    });

    it("should reset streak to 0", () => {
      useReminderStore.getState().expireReminder();

      const reminder = useReminderStore.getState().reminders.find((r) => r.id === 1);
      expect(reminder?.streak).toBe(0);
    });

    it("should add expired message", () => {
      const initialCount = useReminderStore.getState().demoMessages.length;
      useReminderStore.getState().expireReminder();

      const { demoMessages } = useReminderStore.getState();
      expect(demoMessages.length).toBe(initialCount + 1);
      expect(demoMessages[demoMessages.length - 1].content).toContain("expired");
    });

    it("should update log status to expired", () => {
      const { demoLogId } = useReminderStore.getState();
      useReminderStore.getState().expireReminder();

      const { history } = useReminderStore.getState();
      const log = history.find((h) => h.id === demoLogId);
      expect(log?.status).toBe("expired");
    });
  });

  describe("resetDemo", () => {
    beforeEach(() => {
      useReminderStore.setState({
        reminders: mockReminders,
        history: [],
      });
      useReminderStore.getState().startDemo(1);
      useReminderStore.getState().sendEscalation();
    });

    it("should reset all demo state", () => {
      useReminderStore.getState().resetDemo();

      const state = useReminderStore.getState();
      expect(state.demoPhase).toBe("idle");
      expect(state.demoReminderId).toBeNull();
      expect(state.demoLogId).toBeNull();
      expect(state.demoMessages).toHaveLength(0);
      expect(state.demoConfirmationCode).toBe("");
      expect(state.demoEscalationCount).toBe(0);
    });
  });

  describe("addDemoMessage", () => {
    beforeEach(() => {
      useReminderStore.setState({
        reminders: mockReminders,
        history: [],
      });
      useReminderStore.getState().startDemo(1);
    });

    it("should add message with auto-incremented ID", () => {
      const initialCount = useReminderStore.getState().demoMessages.length;

      useReminderStore.getState().addDemoMessage({
        direction: "incoming",
        content: "Test message",
        timestamp: new Date().toISOString(),
      });

      const { demoMessages } = useReminderStore.getState();
      expect(demoMessages.length).toBe(initialCount + 1);
      expect(demoMessages[demoMessages.length - 1].id).toBe(initialCount + 1);
    });
  });

  describe("resetToMockData", () => {
    it("should load mock reminders and history", () => {
      useReminderStore.getState().resetToMockData();

      const { reminders, history } = useReminderStore.getState();
      expect(reminders).toEqual(mockReminders);
      expect(history).toEqual(mockHistory);
    });

    it("should reset demo state", () => {
      useReminderStore.setState({
        demoPhase: "escalation_1",
        demoReminderId: 1,
        demoMessages: [
          { id: 1, direction: "outgoing", content: "test", timestamp: "" },
        ],
      });

      useReminderStore.getState().resetToMockData();

      const state = useReminderStore.getState();
      expect(state.demoPhase).toBe("idle");
      expect(state.demoReminderId).toBeNull();
      expect(state.demoMessages).toHaveLength(0);
    });
  });
});
