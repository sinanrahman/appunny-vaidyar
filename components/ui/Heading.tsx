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

  const sizeStyles = {
    1: "type-hero",
    2: "type-display",
    3: "type-card-title",
    4: "type-subtitle",
    5: "type-body-large",
    6: "type-body",
  };

  return (
    <Component
      className={cn(sizeStyles[level], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
