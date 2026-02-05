export interface SassyMessage {
  tier: number; // 0-4 annoying scale
  prefix: string; // Before reminder name
  suffix: string; // After reminder name
}

// The Table of Many Nudges - D&D style escalating messages
export const SASSY_MESSAGES: SassyMessage[] = [
  // Tier 0 - Chill Bestie (Initial)
  { tier: 0, prefix: "Hey! Time to", suffix: "" },
  { tier: 0, prefix: "Friendly reminder:", suffix: "" },
  { tier: 0, prefix: "Good morning sunshine!", suffix: "o'clock" },
  { tier: 0, prefix: "Quick heads up:", suffix: "" },
  { tier: 0, prefix: "Heyyy, just checking in about", suffix: "" },

  // Tier 1 - Playful Nudge (1st Escalation)
  { tier: 1, prefix: "Psst... you forgot to", suffix: ". I saw that." },
  { tier: 1, prefix: "Your future self is begging you:", suffix: "" },
  { tier: 1, prefix: "Not to be annoying but...", suffix: "?" },
  { tier: 1, prefix: "I believe in you! But also please", suffix: "" },
  { tier: 1, prefix: "Gentle nudge:", suffix: ". I'll wait." },

  // Tier 2 - Getting Real (2nd Escalation)
  {
    tier: 2,
    prefix: "Okay so...",
    suffix: "? Still waiting. No pressure. (Some pressure.)",
  },
  {
    tier: 2,
    prefix: "This is your bestie speaking:",
    suffix: ". Please. I'm worried.",
  },
  { tier: 2, prefix: "Babe.", suffix: ". It's been a minute." },
  {
    tier: 2,
    prefix: "Not to be dramatic but",
    suffix: "and also I miss you",
  },
  { tier: 2, prefix: "Remember", suffix: "? It remembers you." },

  // Tier 3 - Dramatic Friend (Final Warning)
  {
    tier: 3,
    prefix: "HELLO?!",
    suffix: "! I've been texting you for like 45 minutes!",
  },
  {
    tier: 3,
    prefix: "I'm not mad about",
    suffix: ", just disappointed... okay I'm a little mad.",
  },
  {
    tier: 3,
    prefix: "This is an intervention about",
    suffix: ". The group chat is worried.",
  },
  {
    tier: 3,
    prefix: "THE STREAK. IS IN DANGER.",
    suffix: ". THIS IS NOT A DRILL.",
  },
  {
    tier: 3,
    prefix: "I've been stood up for",
    suffix: "and honestly it's giving betrayal",
  },

  // Tier 4 - Maximum Chaos (ALL CAPS, Long)
  {
    tier: 4,
    prefix: "THIS IS YOUR FINAL FINAL WARNING ABOUT",
    suffix:
      ". I WILL NOT ASK AGAIN. (I absolutely will ask again, I have no self-control.)",
  },
  {
    tier: 4,
    prefix: "THE AUDACITY. THE ABSOLUTE NERVE.",
    suffix: "?! You're really gonna ignore ME? Your best friend?! UNREAL.",
  },
  {
    tier: 4,
    prefix: "",
    suffix:
      "! I HAVE BEEN WAITING AND WAITING AND WAITING. My patience is a FINITE RESOURCE bestie.",
  },
  {
    tier: 4,
    prefix: "BREAKING NEWS: Local person STILL hasn't done",
    suffix:
      ". Sources say I'm 'being dramatic' and need to 'calm down.' More at 11.",
  },
  {
    tier: 4,
    prefix: "I TRUSTED YOU with",
    suffix: ". I BELIEVED IN YOU. This is my villain origin story tbh.",
  },
];

// Escalation level to tier range mapping
const TIER_RANGES: Record<number, [number, number]> = {
  0: [0, 1], // Initial: Friendly, chill
  1: [1, 2], // First nudge: Slightly pushy, playful
  2: [2, 3], // Second nudge: Getting real, longer messages
  3: [3, 4], // FINAL: ALL CAPS, dramatic, guilt trips
};

/**
 * Get a random sassy message for the given escalation level.
 * Like a D&D random encounter table, messages are organized into tiers
 * and each escalation level rolls from a range of tiers.
 */
export function getRandomMessage(escalation: number): SassyMessage {
  const [minTier, maxTier] = TIER_RANGES[escalation] || [3, 4];
  const eligible = SASSY_MESSAGES.filter(
    (m) => m.tier >= minTier && m.tier <= maxTier
  );

  if (eligible.length === 0) {
    // Fallback to tier 0 if somehow no messages match
    return SASSY_MESSAGES[0];
  }

  return eligible[Math.floor(Math.random() * eligible.length)];
}

/**
 * Format a sassy message with the reminder name.
 */
export function formatSassyMessage(
  message: SassyMessage,
  reminderName: string
): string {
  const parts = [message.prefix, reminderName, message.suffix].filter(Boolean);
  return parts.join(" ").trim();
}
