import Link from "next/link";
import { cn } from "../lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = "font-semibold rounded-lg transition-colors inline-block text-center";

  const variantStyles = {
    primary: "bg-[#e07a5f] text-white hover:bg-[#d4694e] disabled:bg-gray-300 disabled:cursor-not-allowed",
    secondary: "border border-gray-300 text-[#2d1f14] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "border-2 border-[#e07a5f] text-[#e07a5f] hover:bg-[#e07a5f] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyle,
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
