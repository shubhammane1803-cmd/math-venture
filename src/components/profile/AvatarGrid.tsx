'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { avatars } from '@/lib/data';
import { useUserProgress } from '@/context/UserProgressContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function AvatarGrid() {
  const { progress, selectAvatar } = useUserProgress();

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Choose Your Avatar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {avatars.map(avatar => (
            <motion.div
              key={avatar.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => selectAvatar(avatar)}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-full text-4xl transition-all',
                  progress.selectedAvatar.id === avatar.id
                    ? 'bg-primary ring-4 ring-primary/50'
                    : 'bg-muted hover:bg-muted/80'
                )}
                aria-label={`Select ${avatar.name} avatar`}
              >
                {avatar.emoji}
              </button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
