import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoMaskProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "solid" | "gradient";
  gradientColors?: string[];
}

export const LogoMask = ({ className, style, variant = "solid", gradientColors = ["#000", "#666"] }: LogoMaskProps) => {
  const baseClasses = "font-serif italic text-xs opacity-50 tracking-tight";
  const text = "AniColors";

  if (variant === "gradient") {
    return (
      <div
        id="logo-mask"
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
    <div id="logo-mask" className={cn(baseClasses, className)} style={style}>
      {text}
    </div>
  );
};

export const Logo = () => {
  return (
    <Link href="/" className="flex font-serif gap-0.5 text-2xl italic items-end">
      <span>Ani</span>
      <span className="font-bold underline">Colors</span>
    </Link>
  );
};
