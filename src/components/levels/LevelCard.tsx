'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Lock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProgress } from '@/context/UserProgressContext';
import type { World } from '@/lib/types';
import { Button } from '../ui/button';

interface LevelCardProps {
  levelId: number;
  world: World;
}

export function LevelCard({ levelId, world }: LevelCardProps) {
  const { progress, isLevelUnlocked } = useUserProgress();
  const levelProgress = progress.levelProgress[levelId];
  const stars = levelProgress?.stars || 0;
  const isUnlocked = isLevelUnlocked(levelId);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={isUnlocked ? { scale: 1.1, y: -10 } : {}}
      transition={{ type: 'spring' }}
      className="relative"
    >
      <Link href={isUnlocked ? `/play/${levelId}` : '#'} passHref>
        <div
          className={cn(
            'group aspect-square w-full transform cursor-pointer overflow-hidden rounded-2xl border-4 transition-all duration-300',
            isUnlocked
              ? 'border-transparent'
              : 'cursor-not-allowed border-muted',
            stars > 0 && `border-yellow-300`
          )}
        >
          <div
            className={cn(
              'relative flex h-full w-full flex-col items-center justify-center p-2 text-white',
              isUnlocked
                ? `bg-gradient-to-br ${world.theme.gradient}`
                : 'bg-muted'
            )}
          >
            {isUnlocked ? (
              <>
                <div className="absolute top-2 right-2 flex">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        stars > i ? 'fill-yellow-300 text-yellow-400' : 'fill-white/30 text-white/50'
                      )}
                    />
                  ))}
                </div>
                <div className="text-4xl font-bold drop-shadow-md sm:text-5xl">
                  {levelId}
                </div>
                <Button
                  size="icon"
                  className={cn(
                    'absolute bottom-2 h-8 w-8 rounded-full bg-white/20 text-white opacity-0 shadow-lg transition-all group-hover:opacity-100 group-hover:scale-110',
                    stars > 0 && 'animate-pulse'
                  )}
                >
                  <Play className="h-4 w-4 fill-white" />
                </Button>
              </>
            ) : (
              <Lock className="h-1/3 w-1/3 text-slate-400" />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
