import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: React.ElementType;
}

export default function Heading({
  children,
  level = 2,
  as,
  className,
  ...props
}: HeadingProps) {
  const Component = as || (`h${level}` as React.ElementType);

  const baseStyles = "font-primary font-medium tracking-tight";
  
  const sizeStyles = {
    1: "text-[clamp(3.25rem,7.5vw,8.5rem)] leading-[0.9]",
    2: "text-[clamp(2.4rem,5vw,6rem)] leading-[0.95]",
    3: "text-4xl md:text-5xl leading-tight",
    4: "text-2xl md:text-3xl leading-snug",
    5: "text-xl md:text-2xl",
    6: "text-lg md:text-xl",
  };

  return (
    <Component
      className={cn(baseStyles, sizeStyles[level], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
