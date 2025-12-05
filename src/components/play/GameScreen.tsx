'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Star,
  Check,
  TrendingUp,
  ChevronLeft,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CompletionModal } from './CompletionModal';
import { cn } from '@/lib/utils';
import type { World } from '@/lib/types';
import { generateAdaptiveProblem } from '@/ai/flows/adaptive-problem-generation';
import type { AdaptiveProblemOutput } from '@/ai/flows/adaptive-problem-generation';
import { useUserProgress } from '@/context/UserProgressContext';

interface GameScreenProps {
  levelId: number;
  world: World;
}

export function GameScreen({ levelId, world }: GameScreenProps) {
  const { completeLevel } = useUserProgress();
  const [problemNumber, setProblemNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentProblem, setCurrentProblem] =
    useState<AdaptiveProblemOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answerStatus, setAnswerStatus] = useState<
    'correct' | 'incorrect' | 'unanswered'
  >('unanswered');
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProblem = useCallback(
    async (lastCorrect: boolean) => {
      setIsLoading(true);
      setError(null);
      try {
        const problem = await generateAdaptiveProblem({
          level: levelId,
          operation: world.operation,
          streak,
          lastProblemCorrect: lastCorrect,
        });
        setCurrentProblem(problem);
      } catch (e) {
        setError('Could not generate a problem. Please try again.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [levelId, world.operation, streak]
  );

  useEffect(() => {
    fetchProblem(true);
  }, [fetchProblem]);

  const handleAnswer = (choice: number) => {
    if (answerStatus !== 'unanswered') return;

    const isCorrect = choice === currentProblem?.answer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (problemNumber < 10) {
        setProblemNumber(p => p + 1);
        setAnswerStatus('unanswered');
        fetchProblem(isCorrect);
      } else {
        completeLevel(levelId, score + (isCorrect ? 1 : 0), streak + (isCorrect ? 1 : 0));
        setIsFinished(true);
      }
    }, 1500);
  };

  const progressValue = (problemNumber / 10) * 100;

  if (isFinished) {
    return <CompletionModal levelId={levelId} world={world} score={score} />;
  }

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col bg-gradient-to-br',
        world.theme.gradient
      )}
    >
      <header className="flex items-center justify-between p-4 text-white">
        <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
          <Link href={`/world/${world.slug}`}>
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
          <Star className="h-4 w-4 fill-yellow-300 text-yellow-400" />
          <span>{score}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
          <TrendingUp className="h-4 w-4 text-red-400" />
          <span>{streak}</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-between p-4 md:p-8">
        <div className="w-full">
          <p className="text-center text-sm font-semibold text-white/80">
            Problem {problemNumber} of 10
          </p>
          <Progress
            value={progressValue}
            className="mt-2 h-3 [&>*]:bg-white"
          />
        </div>

        <div className="relative flex-1">
          <AnimatePresence>
            {isLoading || error ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Card className="flex flex-col items-center gap-4 rounded-3xl p-8 shadow-2xl">
                  {error ? (
                    <>
                      <p className="text-destructive-foreground">{error}</p>
                      <Button onClick={() => fetchProblem(true)}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                      </Button>
                    </>
                  ) : (
                    <RefreshCw className="h-12 w-12 animate-spin text-primary" />
                  )}
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={problemNumber}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex h-full flex-col items-center justify-center"
              >
                <Card className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-lg">
                  <AnimatePresence>
                    {answerStatus !== 'unanswered' && (
                      <motion.div
                        key="feedback"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 z-10 flex items-center justify-center"
                      >
                        {answerStatus === 'correct' ? (
                          <Check className="h-32 w-32 text-green-500" />
                        ) : (
                          <X className="h-32 w-32 text-red-500" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={{
                      filter:
                        answerStatus !== 'unanswered'
                          ? 'blur(8px)'
                          : 'blur(0px)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-code text-5xl font-bold text-slate-800 md:text-7xl">
                      {currentProblem?.problem}
                    </p>
                  </motion.div>
                </Card>

                <div className="mt-8 grid w-full max-w-lg grid-cols-2 gap-4">
                  {currentProblem?.choices.map((choice, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Button
                        onClick={() => handleAnswer(choice)}
                        disabled={answerStatus !== 'unanswered'}
                        className={cn(
                          'h-20 w-full rounded-2xl text-3xl font-bold shadow-lg transition-all duration-300',
                          'bg-white text-primary hover:bg-white/90',
                          answerStatus === 'correct' &&
                            choice === currentProblem?.answer &&
                            'bg-green-500 text-white scale-110',
                          answerStatus === 'incorrect' &&
                            choice === currentProblem?.answer &&
                            'bg-green-500 text-white',
                          answerStatus === 'incorrect' &&
                            choice !== currentProblem?.answer &&
                            'bg-red-500 text-white'
                        )}
                      >
                        {choice}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-10" />
      </main>
    </div>
  );
}
