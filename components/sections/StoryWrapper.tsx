"use client";

export default function StoryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      {children}
    </div>
  );
}
