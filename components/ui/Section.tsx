import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  dark?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, dark = false, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "px-[var(--page-gutter)] py-20 md:py-32 w-full",
          dark ? "bg-primary text-warm dark-section" : "bg-warm text-black",
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
