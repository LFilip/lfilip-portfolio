import {
  SASSY_MESSAGES,
  getRandomMessage,
  formatSassyMessage,
  type SassyMessage,
} from "./sassyMessages";

describe("sassyMessages", () => {
  describe("SASSY_MESSAGES", () => {
    it("has messages for all tiers 0-4", () => {
      for (let tier = 0; tier <= 4; tier++) {
        const messagesForTier = SASSY_MESSAGES.filter((m) => m.tier === tier);
        expect(messagesForTier.length).toBeGreaterThan(0);
      }
    });

    it("all messages have required fields", () => {
      SASSY_MESSAGES.forEach((message) => {
        expect(message).toHaveProperty("tier");
        expect(message).toHaveProperty("prefix");
        expect(message).toHaveProperty("suffix");
        expect(typeof message.tier).toBe("number");
        expect(typeof message.prefix).toBe("string");
        expect(typeof message.suffix).toBe("string");
      });
    });
  });

  describe("getRandomMessage", () => {
    it("returns messages in tier 0-1 for escalation 0", () => {
      for (let i = 0; i < 20; i++) {
        const message = getRandomMessage(0);
        expect(message.tier).toBeGreaterThanOrEqual(0);
        expect(message.tier).toBeLessThanOrEqual(1);
      }
    });

    it("returns messages in tier 1-2 for escalation 1", () => {
      for (let i = 0; i < 20; i++) {
        const message = getRandomMessage(1);
        expect(message.tier).toBeGreaterThanOrEqual(1);
        expect(message.tier).toBeLessThanOrEqual(2);
      }
    });

    it("returns messages in tier 2-3 for escalation 2", () => {
      for (let i = 0; i < 20; i++) {
        const message = getRandomMessage(2);
        expect(message.tier).toBeGreaterThanOrEqual(2);
        expect(message.tier).toBeLessThanOrEqual(3);
      }
    });

    it("returns messages in tier 3-4 for escalation 3", () => {
      for (let i = 0; i < 20; i++) {
        const message = getRandomMessage(3);
        expect(message.tier).toBeGreaterThanOrEqual(3);
        expect(message.tier).toBeLessThanOrEqual(4);
      }
    });

    it("falls back to tier 3-4 for unknown escalation levels", () => {
      for (let i = 0; i < 10; i++) {
        const message = getRandomMessage(99);
        expect(message.tier).toBeGreaterThanOrEqual(3);
        expect(message.tier).toBeLessThanOrEqual(4);
      }
    });

    it("returns variety of messages (not always the same)", () => {
      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        const message = getRandomMessage(0);
        results.add(message.prefix);
      }
      // Should get at least 2 different messages in 50 tries
      expect(results.size).toBeGreaterThan(1);
    });

    it("always returns a valid SassyMessage object", () => {
      for (let escalation = 0; escalation <= 5; escalation++) {
        const message = getRandomMessage(escalation);
        expect(message).toBeDefined();
        expect(message).toHaveProperty("tier");
        expect(message).toHaveProperty("prefix");
        expect(message).toHaveProperty("suffix");
      }
    });
  });

  describe("formatSassyMessage", () => {
    it("formats message with prefix and suffix", () => {
      const message: SassyMessage = {
        tier: 0,
        prefix: "Hey! Time to",
        suffix: "right now!",
      };
      const result = formatSassyMessage(message, "Take medication");
      expect(result).toBe("Hey! Time to Take medication right now!");
    });

    it("formats message with prefix only", () => {
      const message: SassyMessage = {
        tier: 0,
        prefix: "Friendly reminder:",
        suffix: "",
      };
      const result = formatSassyMessage(message, "Water plants");
      expect(result).toBe("Friendly reminder: Water plants");
    });

    it("formats message with suffix only", () => {
      const message: SassyMessage = {
        tier: 4,
        prefix: "",
        suffix: "! I HAVE BEEN WAITING.",
      };
      const result = formatSassyMessage(message, "Take out trash");
      expect(result).toBe("Take out trash ! I HAVE BEEN WAITING.");
    });

    it("handles message with no prefix or suffix", () => {
      const message: SassyMessage = {
        tier: 0,
        prefix: "",
        suffix: "",
      };
      const result = formatSassyMessage(message, "Test reminder");
      expect(result).toBe("Test reminder");
    });

    it("trims whitespace from result", () => {
      const message: SassyMessage = {
        tier: 1,
        prefix: "  Hey  ",
        suffix: "  please!  ",
      };
      const result = formatSassyMessage(message, "Do this");
      expect(result).toBe("Hey   Do this   please!");
    });
  });
});
