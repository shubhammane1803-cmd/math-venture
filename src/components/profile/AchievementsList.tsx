'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { achievements } from '@/lib/data';
import { useUserProgress } from '@/context/UserProgressContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function AchievementsList() {
  const { progress } = useUserProgress();

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {achievements.map((badge, index) => {
            const isUnlocked = progress.unlockedAchievements.has(badge.id);
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'flex items-center space-x-4 rounded-xl border p-4 transition-all',
                  isUnlocked ? 'bg-amber-50 border-amber-200' : 'bg-card'
                )}
              >
                <div
                  className={cn(
                    'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-4xl transition-all',
                    isUnlocked ? 'bg-amber-100 grayscale-0' : 'bg-muted grayscale'
                  )}
                >
                  {badge.emoji}
                </div>
                <div className="flex-grow">
                  <h3
                    className={cn(
                      'font-bold',
                      isUnlocked ? 'text-amber-800' : 'text-foreground'
                    )}
                  >
                    {badge.name}
                  </h3>
                  <p
                    className={cn(
                      'text-sm',
                      isUnlocked ? 'text-amber-600' : 'text-muted-foreground'
                    )}
                  >
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
