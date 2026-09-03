"use client";

import FloatingAyurvedaStone from "../animations/FloatingAyurvedaStone";

export default function StoryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <FloatingAyurvedaStone />
      {children}
    </div>
  );
}
