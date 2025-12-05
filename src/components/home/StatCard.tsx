"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type IconName = keyof typeof LucideIcons;

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconName;
  color?: string;
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  const Icon = LucideIcons[icon] as LucideIcon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {Icon && <Icon className={cn("h-5 w-5 text-muted-foreground", color)} />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
