export const CLICKABLE_TYPES = ["memory", "milestone", "note", "video", "vows"] as const;

export function getClickableIndices(hexagons: HexContent[]): number[] {
  return hexagons.reduce<number[]>((acc, hex, i) => {
    if ((CLICKABLE_TYPES as readonly string[]).includes(hex.type)) {
      acc.push(i);
    }
    return acc;
  }, []);
}

export type HexContent =
  | { type: "memory"; title: string; description: string; emoji: string }
  | { type: "emoji"; emoji: string }
  | { type: "heart" }
  | { type: "vows"; title: string; content: string; emoji: string }
  | { type: "milestone"; date: string; label: string; emoji: string }
  | { type: "video"; videoId: string; title: string; emoji: string }
  | { type: "note"; message: string; emoji: string };

export const hexContents: HexContent[] = [
  // Row 1
  { type: "emoji", emoji: "💜" },
  { type: "memory", title: "Dollywood", description: "Riding rollercoasters with Maddox", emoji: "🎢" },
  { type: "heart" },
  { type: "milestone", date: "August 2010", label: "First Date", emoji: "🎬" },

  // Row 2
  { type: "note", message: "You make every day brighter just by being you 💜", emoji: "💌" },
  { type: "emoji", emoji: "✨" },
  { type: "memory", title: "Lake Winnie", description: "The Fireball incident...", emoji: "🎡" },
  { type: "emoji", emoji: "🦇" },

  // Row 3
  { type: "heart" },
  { type: "memory", title: "First Date", description: "Going to see The Other Guys at Bridgestreet", emoji: "🎬" },
  { type: "emoji", emoji: "🖤" },
  { type: "note", message: "I fall more in love with you every single day", emoji: "💕" },

  // Row 4
  { type: "emoji", emoji: "🌙" },
  { type: "milestone", date: "October 2011", label: "Engaged!", emoji: "💍" },
  { type: "memory", title: "Road Trips", description: "Singing Incubus and Hozier songs", emoji: "🚗" },
  { type: "heart" },

  // Row 5
  { type: "memory", title: "Nightly Shows!", description: "Watching TV on the couch together", emoji: "📺" },
  { type: "emoji", emoji: "🪄" },
  { type: "video", videoId: "KD7xKVx42K0", title: "Our Vowes", emoji: "🎵" },
  { type: "emoji", emoji: "💜" },

  // Row 6
  { type: "note", message: "Forever isn't long enough with you", emoji: "♾️" },
  { type: "memory", title: "Remember the other day?!", description: ";)", emoji: "😏" },
  { type: "emoji", emoji: "🔮" },
  { type: "milestone", date: "December 2021", label: "Wedding Day!", emoji: "💒" },

  // Row 7
  { type: "emoji", emoji: "🎢" },
  { type: "heart" },
  { type: "memory", title: "Cooking Together", description: "Getting in the way! :)", emoji: "🍳" },
  { type: "note", message: "My favorite place is next to you", emoji: "🏠" },

  // Row 8
  { type: "vows", title: "Wedding Vows", content: "I have waited my entire life for this. I promise to love you more than video games. I promise to make you laugh even when I shouldn't. I promise to clean up after myself", emoji: "💒" },
  { type: "emoji", emoji: "✨" },
  { type: "milestone", date: "Every Day", label: "Adventures Together", emoji: "🗺️" },
  { type: "heart" },
];
