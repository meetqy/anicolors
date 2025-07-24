import { cn } from "@/lib/utils";

interface HiColorsLogoProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "solid" | "gradient";
  gradientColors?: string[];
}

export const HiColorsLogo = ({ className, style, variant = "solid", gradientColors = ["#000", "#666"] }: HiColorsLogoProps) => {
  const baseClasses = "font-serif italic";
  const text = "hicolors.org";

  if (variant === "gradient") {
    return (
      <div
        className={cn(baseClasses, "text-transparent bg-clip-text", className)}
        style={{
          backgroundImage: `linear-gradient(135deg, ${gradientColors.join(", ")})`,
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, className)} style={style}>
      {text}
    </div>
  );
};
