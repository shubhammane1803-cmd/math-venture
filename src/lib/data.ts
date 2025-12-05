import type { World, Level, Avatar, Achievement, Operation } from './types';

export const worlds: World[] = [
  {
    id: 1,
    slug: 'forest-friends',
    name: 'Forest Friends',
    levelRange: [1, 5],
    operation: 'addition',
    theme: { emoji: '🌲', gradient: 'from-green-400 to-teal-500' },
    imageId: 'world-forest',
  },
  {
    id: 2,
    slug: 'ocean-adventure',
    name: 'Ocean Adventure',
    levelRange: [6, 10],
    operation: 'subtraction',
    theme: { emoji: '🌊', gradient: 'from-blue-400 to-cyan-500' },
    imageId: 'world-ocean',
  },
  {
    id: 3,
    slug: 'mountain-climb',
    name: 'Mountain Climb',
    levelRange: [11, 15],
    operation: 'multiplication',
    theme: { emoji: '🏔️', gradient: 'from-slate-400 to-gray-600' },
    imageId: 'world-mountain',
  },
  {
    id: 4,
    slug: 'desert-quest',
    name: 'Desert Quest',
    levelRange: [16, 20],
    operation: 'division',
    theme: { emoji: '🏜️', gradient: 'from-orange-400 to-yellow-500' },
    imageId: 'world-desert',
  },
  {
    id: 5,
    slug: 'space-mission',
    name: 'Space Mission',
    levelRange: [21, 25],
    operation: 'mixed',
    theme: { emoji: '🚀', gradient: 'from-purple-500 to-indigo-600' },
    imageId: 'world-space',
  },
  {
    id: 6,
    slug: 'candy-kingdom',
    name: 'Candy Kingdom',
    levelRange: [26, 30],
    operation: 'mixed',
    theme: { emoji: '🍭', gradient: 'from-pink-400 to-rose-500' },
    imageId: 'world-candy',
  },
  {
    id: 7,
    slug: 'dinosaur-land',
    name: 'Dinosaur Land',
    levelRange: [31, 35],
    operation: 'mixed',
    theme: { emoji: '🦖', gradient: 'from-lime-400 to-green-600' },
    imageId: 'world-dinosaur',
  },
  {
    id: 8,
    slug: 'arctic-freeze',
    name: 'Arctic Freeze',
    levelRange: [36, 40],
    operation: 'mixed',
    theme: { emoji: '❄️', gradient: 'from-cyan-300 to-sky-500' },
    imageId: 'world-arctic',
  },
  {
    id: 9,
    slug: 'jungle-safari',
    name: 'Jungle Safari',
    levelRange: [41, 45],
    operation: 'mixed',
    theme: { emoji: '🦁', gradient: 'from-yellow-400 to-amber-600' },
    imageId: 'world-jungle',
  },
  {
    id: 10,
    slug: 'magic-castle',
    name: 'Magic Castle',
    levelRange: [46, 50],
    operation: 'mixed',
    theme: { emoji: '👑', gradient: 'from-violet-500 to-fuchsia-600' },
    imageId: 'world-magic-castle',
  },
];

export const levels: Level[] = Array.from({ length: 50 }, (_, i) => {
  const levelId = i + 1;
  const world = worlds.find(
    w => levelId >= w.levelRange[0] && levelId <= w.levelRange[1]
  )!;
  return {
    id: levelId,
    worldId: world.id,
    operation: world.operation,
  };
});

export const avatars: Avatar[] = [
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'bunny', name: 'Bunny', emoji: '🐰' },
  { id: 'cat', name: 'Cat', emoji: '🐱' },
  { id: 'dog', name: 'Dog', emoji: '🐶' },
  { id: 'panda', name: 'Panda', emoji: '🐼' },
  { id: 'unicorn', name: 'Unicorn', emoji: '🦄' },
  { id: 'dragon', name: 'Dragon', emoji: '🐲' },
];

export const achievements: Achievement[] = [
  { id: 'first_victory', name: 'First Victory', description: 'Complete your first level.', emoji: '🎉' },
  { id: 'streak_5', name: '5 Streak', description: 'Get 5 correct answers in a row.', emoji: '🔥' },
  { id: 'streak_10', name: '10 Streak', description: 'Get 10 correct answers in a row.', emoji: '☄️' },
  { id: 'solved_10', name: 'Solver', description: 'Solve 10 problems.', emoji: '💡' },
  { id: 'solved_50', name: 'Expert', description: 'Solve 50 problems.', emoji: '🧠' },
  { id: 'solved_100', name: 'Master', description: 'Solve 100 problems.', emoji: '🎓' },
  { id: 'level_5', name: 'Explorer', description: 'Reach Level 5.', emoji: '🗺️' },
  { id: 'level_10', name: 'Adventurer', description: 'Reach Level 10.', emoji: '🧭' },
  { id: 'perfect_level', name: 'Perfectionist', description: 'Get a perfect score on a level.', emoji: '🎯' },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a level in under a minute.', emoji: '⚡' },
];


export const leaderboardUsers = [
  { name: 'Alex', avatar: '🦊', stars: 145 },
  { name: 'Ben', avatar: '🦉', stars: 132 },
  { name: 'Chloe', avatar: '🐰', stars: 110 },
  { name: 'David', avatar: '🐱', stars: 98 },
  { name: 'Emily', avatar: '🐶', stars: 85 },
];
