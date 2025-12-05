"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import type { UserProgress, Avatar, LevelProgress } from "@/lib/types";
import { avatars, achievements } from "@/lib/data";
import { getStarRating } from "@/lib/utils";

const defaultUserProgress: UserProgress = {
  selectedAvatar: avatars[0],
  unlockedAchievements: new Set(),
  levelProgress: {},
  totalStars: 0,
  problemsSolved: 0,
  highestStreak: 0,
  highestLevel: 1,
};

interface UserProgressContextType {
  progress: UserProgress;
  selectAvatar: (avatar: Avatar) => void;
  completeLevel: (levelId: number, score: number, newStreak: number) => void;
  isLevelUnlocked: (levelId: number) => boolean;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(
  undefined
);

export function UserProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultUserProgress);

  const selectAvatar = (avatar: Avatar) => {
    setProgress(prev => ({ ...prev, selectedAvatar: avatar }));
  };

  const isLevelUnlocked = useCallback((levelId: number) => {
      if (levelId === 1) return true;
      const prevLevelProgress = progress.levelProgress[levelId - 1];
      return prevLevelProgress && prevLevelProgress.stars > 0;
    }, [progress.levelProgress]);

  const completeLevel = (levelId: number, score: number, newStreak: number) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      const stars = getStarRating(score);

      const existingProgress = newProgress.levelProgress[levelId] || { stars: 0, score: 0 };
      const newStars = Math.max(existingProgress.stars, stars) as 0 | 1 | 2 | 3;
      
      newProgress.levelProgress[levelId] = {
        score: Math.max(existingProgress.score, score),
        stars: newStars,
      };

      // Recalculate total stars
      newProgress.totalStars = Object.values(newProgress.levelProgress).reduce((sum, level) => sum + level.stars, 0);

      newProgress.problemsSolved += 10;
      newProgress.highestStreak = Math.max(newProgress.highestStreak, newStreak);
      
      const nextLevelUnlocked = newStars > 0 && levelId + 1 > newProgress.highestLevel;
      if (nextLevelUnlocked) {
        newProgress.highestLevel = levelId + 1;
      }

      // Check for achievements
      if (!newProgress.unlockedAchievements.has('first_victory')) {
        newProgress.unlockedAchievements.add('first_victory');
      }
      if (newProgress.highestStreak >= 5 && !newProgress.unlockedAchievements.has('streak_5')) {
        newProgress.unlockedAchievements.add('streak_5');
      }
      if (newProgress.highestStreak >= 10 && !newProgress.unlockedAchievements.has('streak_10')) {
        newProgress.unlockedAchievements.add('streak_10');
      }
      if (newProgress.problemsSolved >= 10 && !newProgress.unlockedAchievements.has('solved_10')) {
        newProgress.unlockedAchievements.add('solved_10');
      }
      if (newProgress.problemsSolved >= 50 && !newProgress.unlockedAchievements.has('solved_50')) {
        newProgress.unlockedAchievements.add('solved_50');
      }
       if (newProgress.problemsSolved >= 100 && !newProgress.unlockedAchievements.has('solved_100')) {
        newProgress.unlockedAchievements.add('solved_100');
      }
      if (newProgress.highestLevel > 5 && !newProgress.unlockedAchievements.has('level_5')) {
        newProgress.unlockedAchievements.add('level_5');
      }
      if (newProgress.highestLevel > 10 && !newProgress.unlockedAchievements.has('level_10')) {
        newProgress.unlockedAchievements.add('level_10');
      }
      if (score === 10 && !newProgress.unlockedAchievements.has('perfect_level')) {
        newProgress.unlockedAchievements.add('perfect_level');
      }

      return newProgress;
    });
  };

  return (
    <UserProgressContext.Provider value={{ progress, selectAvatar, completeLevel, isLevelUnlocked }}>
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error(
      "useUserProgress must be used within a UserProgressProvider"
    );
  }
  return context;
}
