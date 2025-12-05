"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { World } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useUserProgress } from "@/context/UserProgressContext";

interface WorldCardProps {
  world: World;
}

export function WorldCard({ world }: WorldCardProps) {
  const { isLevelUnlocked } = useUserProgress();
  const worldImage = PlaceHolderImages.find(img => img.id === world.imageId);
  const isLocked = !isLevelUnlocked(world.levelRange[0]);

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 70, delay: world.id * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="h-full"
    >
      <Link href={isLocked ? "#" : `/world/${world.slug}`} passHref>
        <Card
          className={cn(
            "group relative flex h-full min-h-[200px] w-full flex-col justify-end overflow-hidden rounded-3xl shadow-lg transition-all",
            isLocked ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          {worldImage && (
            <Image
              src={worldImage.imageUrl}
              alt={worldImage.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={worldImage.imageHint}
            />
          )}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent",
              isLocked && "backdrop-blur-sm backdrop-grayscale"
            )}
          />

          <CardContent className="relative z-10 p-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-xl font-bold">
                {world.name}
              </h3>
              <div className="text-4xl transition-transform group-hover:rotate-12 group-hover:scale-125">
                {world.theme.emoji}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white backdrop-blur-sm"
              >
                Levels {world.levelRange.join("-")}
              </Badge>
              {isLocked ? (
                <Lock className="h-8 w-8 text-white/70" />
              ) : (
                <PlayCircle className="h-8 w-8 text-white/70 transition-colors group-hover:text-white" />
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
