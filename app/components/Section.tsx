import { cn } from "../lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "beige";
  noPadding?: boolean;
}

export function Section({
  children,
  className,
  background = "white",
  noPadding = false,
}: SectionProps) {
  const backgroundStyles = {
    white: "bg-white",
    gray: "bg-gray-50",
    beige: "bg-[#ede7de]",
  };

  const paddingStyle = noPadding ? "" : "py-16 md:py-20";

  return (
    <section
      className={cn(
        paddingStyle,
        backgroundStyles[background],
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
