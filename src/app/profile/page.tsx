import { Header } from '@/components/shared/Header';
import { AvatarGrid } from '@/components/profile/AvatarGrid';
import { AchievementsList } from '@/components/profile/AchievementsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { worlds, levels, achievements as allAchievements } from '@/lib/data';

export default function ProfilePage() {
  // Mocked progress for display
  const totalLevels = levels.length;
  const completedLevels = 25;
  const completionPercentage = (completedLevels / totalLevels) * 100;
  
  const totalAchievements = allAchievements.length;
  const earnedAchievements = 5;
  const achievementsPercentage = (earnedAchievements / totalAchievements) * 100;


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <h1 className="mb-8 font-headline text-4xl font-bold text-primary">
          Profile & Progress
        </h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AchievementsList />
          </div>
          <div className="space-y-8">
            <AvatarGrid />
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                        <span>Levels Completed</span>
                        <span>{completedLevels} / {totalLevels}</span>
                    </div>
                    <Progress value={completionPercentage} />
                 </div>
                 <div>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                        <span>Achievements Unlocked</span>
                        <span>{earnedAchievements} / {totalAchievements}</span>
                    </div>
                    <Progress value={achievementsPercentage} className="[&>*]:bg-accent" />
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
