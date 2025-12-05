import { notFound } from 'next/navigation';
import { getWorldByLevel } from '@/lib/utils';
import { GameScreen } from '@/components/play/GameScreen';

type Props = {
  params: { level: string };
};

export default function PlayPage({ params }: Props) {
  const levelId = parseInt(params.level, 10);

  if (isNaN(levelId) || levelId < 1 || levelId > 50) {
    notFound();
  }

  const world = getWorldByLevel(levelId);

  if (!world) {
    notFound();
  }

  return <GameScreen levelId={levelId} world={world} />;
}
