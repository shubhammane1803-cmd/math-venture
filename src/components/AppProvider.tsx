"use client";

import { UserProgressProvider } from "@/context/UserProgressContext";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
    >
      <UserProgressProvider>{children}</UserProgressProvider>
    </MotionConfig>
  );
}
