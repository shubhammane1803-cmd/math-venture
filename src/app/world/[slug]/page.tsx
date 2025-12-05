import { notFound } from 'next/navigation';
import Image from 'next/image';
import { worlds } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/shared/Header';
import { LevelCard } from '@/components/levels/LevelCard';
import {
  Plus,
  Minus,
  X,
  Divide,
  BrainCircuit,
  type LucideIcon,
} from 'lucide-react';
import type { Operation } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  params: { slug: string };
};

const operationIcons: Record<Operation, LucideIcon> = {
  addition: Plus,
  subtraction: Minus,
  multiplication: X,
  division: Divide,
  mixed: BrainCircuit,
};

export default function WorldPage({ params }: Props) {
  const world = worlds.find(w => w.slug === params.slug);

  if (!world) {
    notFound();
  }

  const worldImage = PlaceHolderImages.find(img => img.id === world.imageId);
  const Icon = operationIcons[world.operation];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <section className="relative h-64 w-full md:h-80">
          {worldImage && (
            <Image
              src={worldImage.imageUrl}
              alt={worldImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={worldImage.imageHint}
            />
          )}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${world.theme.gradient} opacity-50`}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
            <h1 className="mb-2 font-headline text-5xl font-bold drop-shadow-lg md:text-7xl">
              {world.name}
            </h1>
            <div className="flex items-center gap-4 rounded-full bg-black/30 px-4 py-2 text-lg backdrop-blur-sm">
              <Icon className="h-6 w-6" />
              <span className="font-semibold capitalize">{world.operation}</span>
            </div>
          </div>
        </section>

        <section className="-mt-16">
          <div className="container mx-auto max-w-5xl px-4">
            <Card className="rounded-3xl shadow-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {Array.from(
                    { length: world.levelRange[1] - world.levelRange[0] + 1 },
                    (_, i) => world.levelRange[0] + i
                  ).map(levelId => (
                    <LevelCard key={levelId} levelId={levelId} world={world} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
