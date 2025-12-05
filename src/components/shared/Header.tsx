"use client";

import Link from "next/link";
import { Rocket, User, Star, Trophy, LayoutGrid } from "lucide-react";
import { useUserProgress } from "@/context/UserProgressContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { progress } = useUserProgress();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold">
              Mathventure
            </span>
          </Link>
        </div>
        <nav className="hidden flex-1 items-center space-x-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/levels">
              <LayoutGrid className="mr-2 h-4 w-4" />
              All Levels
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/profile">
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </Link>
          </Button>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-2 rounded-full bg-muted px-3 py-1">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-bold">{progress.totalStars}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/20 text-xl">
                    {progress.selectedAvatar.emoji}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Player</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Level {progress.highestLevel}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/levels">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  <span>All Levels</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>Achievements</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
