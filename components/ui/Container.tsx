import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[1600px] mx-auto w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
