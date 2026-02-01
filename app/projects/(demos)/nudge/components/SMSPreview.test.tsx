import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SMSPreview } from "./SMSPreview";
import type { SMSMessage } from "../types/reminder";

// Mock scrollIntoView which is not available in jsdom
beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

describe("SMSPreview Component", () => {
  const mockOnReply = jest.fn();

  const sampleMessages: SMSMessage[] = [
    {
      id: 1,
      direction: "outgoing",
      content: 'Hey! Time to Take Medication\n\nReply "1234" to confirm.',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      direction: "incoming",
      content: "wrong",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      direction: "outgoing",
      content: 'Invalid code. Reply "1234" to confirm.',
      timestamp: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    mockOnReply.mockClear();
  });

  describe("Message Display", () => {
    it("should render all messages", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      expect(screen.getByText(/hey! time to take medication/i)).toBeInTheDocument();
      expect(screen.getByText("wrong")).toBeInTheDocument();
      expect(screen.getByText(/invalid code/i)).toBeInTheDocument();
    });

    it("should display Nudge header", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      expect(screen.getByText("Nudge")).toBeInTheDocument();
      expect(screen.getByText("SMS")).toBeInTheDocument();
    });

    it("should render empty state when no messages", () => {
      render(
        <SMSPreview messages={[]} confirmationCode="1234" onReply={mockOnReply} />
      );

      // Should still render the container
      expect(screen.getByText("Nudge")).toBeInTheDocument();
    });
  });

  describe("Quick Reply Buttons", () => {
    it("should show confirmation code quick reply button", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      expect(screen.getByRole("button", { name: "1234" })).toBeInTheDocument();
    });

    it("should show SNOOZE quick reply button", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      expect(screen.getByRole("button", { name: "SNOOZE" })).toBeInTheDocument();
    });

    it("should call onReply with code when quick reply clicked", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const codeButton = screen.getByRole("button", { name: "1234" });
      await user.click(codeButton);

      expect(mockOnReply).toHaveBeenCalledWith("1234");
    });

    it("should call onReply with SNOOZE when snooze clicked", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const snoozeButton = screen.getByRole("button", { name: "SNOOZE" });
      await user.click(snoozeButton);

      expect(mockOnReply).toHaveBeenCalledWith("SNOOZE");
    });

    it("should hide quick reply buttons when disabled", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
          disabled
        />
      );

      expect(screen.queryByRole("button", { name: "1234" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "SNOOZE" })).not.toBeInTheDocument();
    });

    it("should hide quick reply buttons when no messages", () => {
      render(
        <SMSPreview messages={[]} confirmationCode="1234" onReply={mockOnReply} />
      );

      expect(screen.queryByRole("button", { name: "1234" })).not.toBeInTheDocument();
    });
  });

  describe("Text Input", () => {
    it("should render input field", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      expect(
        screen.getByPlaceholderText(/type a reply/i)
      ).toBeInTheDocument();
    });

    it("should allow typing in input", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const input = screen.getByPlaceholderText(/type a reply/i);
      await user.type(input, "Hello");

      expect(input).toHaveValue("Hello");
    });

    it("should call onReply when form submitted", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const input = screen.getByPlaceholderText(/type a reply/i);
      await user.type(input, "my reply{enter}");

      expect(mockOnReply).toHaveBeenCalledWith("my reply");
    });

    it("should clear input after submission", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const input = screen.getByPlaceholderText(/type a reply/i);
      await user.type(input, "test{enter}");

      expect(input).toHaveValue("");
    });

    it("should not submit empty input", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const input = screen.getByPlaceholderText(/type a reply/i);
      await user.type(input, "{enter}");

      expect(mockOnReply).not.toHaveBeenCalled();
    });

    it("should not submit whitespace-only input", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const input = screen.getByPlaceholderText(/type a reply/i);
      await user.type(input, "   {enter}");

      expect(mockOnReply).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("should disable input when disabled", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
          disabled
        />
      );

      const input = screen.getByPlaceholderText(/demo complete/i);
      expect(input).toBeDisabled();
    });

    it("should show Demo complete placeholder when disabled", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
          disabled
        />
      );

      expect(screen.getByPlaceholderText(/demo complete/i)).toBeInTheDocument();
    });

    it("should disable send button when disabled", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
          disabled
        />
      );

      const sendButton = screen.getByRole("button", { name: /send/i });
      expect(sendButton).toBeDisabled();
    });
  });

  describe("Send Button", () => {
    it("should be disabled when input is empty", () => {
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const sendButton = screen.getByRole("button", { name: /send/i });
      expect(sendButton).toBeDisabled();
    });

    it("should be enabled when input has content", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const input = screen.getByPlaceholderText(/type a reply/i);
      await user.type(input, "test");

      const sendButton = screen.getByRole("button", { name: /send/i });
      expect(sendButton).not.toBeDisabled();
    });

    it("should submit when send button clicked", async () => {
      const user = userEvent.setup();
      render(
        <SMSPreview
          messages={sampleMessages}
          confirmationCode="1234"
          onReply={mockOnReply}
        />
      );

      const input = screen.getByPlaceholderText(/type a reply/i);
      await user.type(input, "1234");

      const sendButton = screen.getByRole("button", { name: /send/i });
      await user.click(sendButton);

      expect(mockOnReply).toHaveBeenCalledWith("1234");
    });
  });
});
