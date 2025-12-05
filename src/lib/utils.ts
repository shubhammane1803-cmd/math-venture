import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { worlds } from './data';
import type { World } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStarRating(score: number): 0 | 1 | 2 | 3 {
  if (score >= 9) return 3;
  if (score >= 7) return 2;
  if (score >= 5) return 1;
  return 0;
}

export function getWorldByLevel(level: number): World | undefined {
  return worlds.find(
    world => level >= world.levelRange[0] && level <= world.levelRange[1]
  );
}
