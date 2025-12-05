import Image from 'next/image';
import Link from 'next/link';
import {
  worlds,
  achievements,
  avatars,
  leaderboardUsers,
} from '@/lib/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Crown,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { StatCard } from '@/components/home/StatCard';
import { WorldCard } from '@/components/home/WorldCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const user = {
    name: 'Player',
    avatar: avatars[0].emoji,
    stats: {
      stars: 123,
      solved: 456,
      streak: 12,
      level: 25,
    },
  };

  const dailyChallengeImage = PlaceHolderImages.find(
    p => p.id === 'daily-challenge'
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 space-y-12 p-4 md:p-8 lg:p-12">
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          <StatCard
            title="Total Stars"
            value={user.stats.stars}
            icon={Star}
            color="text-yellow-400"
          />
          <StatCard
            title="Problems Solved"
            value={user.stats.solved}
            icon={CheckCircle}
            color="text-green-500"
          />
          <StatCard
            title="Best Streak"
            value={user.stats.streak}
            icon={TrendingUp}
            color="text-red-500"
          />
          <StatCard
            title="Highest Level"
            value={user.stats.level}
            icon={Crown}
            color="text-purple-500"
          />
        </section>

        <section>
          <div className="relative overflow-hidden rounded-2xl bg-primary/10 p-6 md:p-8">
            <div className="relative z-10 flex flex-col items-start gap-4 text-left">
              <h2 className="font-headline text-2xl font-bold text-primary md:text-3xl">
                Daily Challenge
              </h2>
              <p className="max-w-prose text-sm text-foreground/80 md:text-base">
                A new set of mixed problems awaits! Test your skills and earn bonus
                stars.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <Calendar className="h-4 w-4" />
                <span>Resets in: 12h 34m 56s</span>
              </div>
              <Button
                asChild
                className="mt-2 animate-pulse bg-gradient-to-r from-accent to-primary"
              >
                <Link href="/play/daily">Start Challenge</Link>
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-headline text-3xl font-bold text-primary">
            Explore Worlds
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {worlds.map(world => (
              <WorldCard key={world.id} world={world} />
            ))}
          </div>
        </section>

        <div className="grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="mb-6 font-headline text-3xl font-bold text-primary">
              Badges
            </h2>
            <Card className="rounded-3xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
                  {achievements.slice(0, 10).map(badge => (
                    <div
                      key={badge.name}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-3xl">
                        {badge.emoji}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <h2 className="mb-6 font-headline text-3xl font-bold text-primary">
              Leaderboard
            </h2>
            <Card className="rounded-3xl">
              <CardContent className="p-6 space-y-4">
                {leaderboardUsers.map((player, index) => (
                  <div key={player.name} className="flex items-center gap-4">
                    <span className="w-6 text-lg font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                    <Avatar>
                      <AvatarFallback className="bg-primary/20">
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex-1 font-medium">{player.name}</span>
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Star className="h-4 w-4" />
                      <span className="font-bold">{player.stars}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
