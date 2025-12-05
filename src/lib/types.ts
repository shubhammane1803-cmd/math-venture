export type Operation =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  | 'mixed';

export interface World {
  id: number;
  slug: string;
  name: string;
  levelRange: [number, number];
  operation: Operation;
  theme: {
    emoji: string;
    gradient: string; // Tailwind gradient classes
  };
  imageId: string;
}

export interface Level {
  id: number;
  worldId: number;
  operation: Operation;
}

export interface Avatar {
  id: string;
  name: string;
  emoji: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface LevelProgress {
  [levelId: number]: {
    stars: 0 | 1 | 2 | 3;
    score: number;
  };
}

export interface UserProgress {
  selectedAvatar: Avatar;
  unlockedAchievements: Set<string>;
  levelProgress: LevelProgress;
  totalStars: number;
  problemsSolved: number;
  highestStreak: number;
  highestLevel: number;
}
