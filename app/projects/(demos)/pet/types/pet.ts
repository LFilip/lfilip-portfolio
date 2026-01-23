export interface PetStats {
  energy: number;      // 0-100
  hunger: number;      // 0-100
  happiness: number;   // 0-100
}

export interface Pet {
  id: string;
  name: string;
  emoji: string;       // The emoji representation
  stats: PetStats;
  createdAt: number;
  lastInteraction: number;
}

export type PetAction = 'feed' | 'play' | 'pet';
