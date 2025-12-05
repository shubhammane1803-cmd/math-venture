'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Confetti from './Confetti';
import { cn, getStarRating } from '@/lib/utils';
import type { World } from '@/lib/types';
import { useUserProgress } from '@/context/UserProgressContext';

interface CompletionModalProps {
  levelId: number;
  world: World;
  score: number;
}

export function CompletionModal({ levelId, world, score }: CompletionModalProps) {
  const { isLevelUnlocked } = useUserProgress();
  const [show, setShow] = useState(false);
  const stars = getStarRating(score);
  const nextLevelId = levelId + 1;
  const hasNextLevel = nextLevelId <= 50;
  const nextLevelUnlocked = hasNextLevel && isLevelUnlocked(nextLevelId);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br p-4',
            world.theme.gradient
          )}
        >
          {stars >= 2 && <Confetti />}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-full max-w-md rounded-3xl bg-white/80 p-8 text-center shadow-2xl backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
            >
              <Award className="mx-auto h-24 w-24 text-yellow-400" />
            </motion.div>

            <h2 className="mt-4 font-headline text-3xl font-bold text-slate-800">
              Level {levelId} Complete!
            </h2>

            <div className="my-6 flex justify-center space-x-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.8 + i * 0.2 }}
                >
                  <Star
                    className={cn(
                      'h-12 w-12 transition-colors',
                      stars > i
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-slate-300 fill-slate-300'
                    )}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center space-x-8 text-slate-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-lg font-semibold">{score} / 10</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <Link href={`/world/${world.slug}`}>Back to World</Link>
              </Button>
              {hasNextLevel && nextLevelUnlocked && (
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-primary animate-pulse"
                >
                  <Link href={`/play/${nextLevelId}`}>
                    Next Level <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
