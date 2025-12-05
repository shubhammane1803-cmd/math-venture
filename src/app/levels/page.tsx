import { Header } from '@/components/shared/Header';
import { LevelCard } from '@/components/levels/LevelCard';
import { worlds } from '@/lib/data';

export default function AllLevelsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <h1 className="mb-8 font-headline text-4xl font-bold text-primary">
          All Levels
        </h1>
        <div className="space-y-12">
          {worlds.map(world => (
            <section key={world.id}>
              <div className="mb-4 flex items-center gap-4">
                <span className={`text-4xl`}>{world.theme.emoji}</span>
                <h2 className="font-headline text-2xl font-bold text-foreground">
                  {world.name}
                </h2>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-10 lg:gap-4">
                {Array.from(
                  { length: world.levelRange[1] - world.levelRange[0] + 1 },
                  (_, i) => world.levelRange[0] + i
                ).map(levelId => (
                  <LevelCard key={levelId} levelId={levelId} world={world} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
