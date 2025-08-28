import React from "react";
import { cn } from "@/lib/utils";

interface EmptyProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Empty: React.FC<EmptyProps> = ({
  icon,
  title = "No data",
  description,
  action,
  className,
  size = "md",
}) => {
  const sizeStyles = {
    sm: {
      container: "py-8",
      icon: "h-8 w-8",
      title: "text-sm font-medium",
      description: "text-xs",
      spacing: "space-y-2",
    },
    md: {
      container: "py-12",
      icon: "h-12 w-12",
      title: "text-base font-medium",
      description: "text-sm",
      spacing: "space-y-3",
    },
    lg: {
      container: "py-16",
      icon: "h-16 w-16",
      title: "text-lg font-semibold",
      description: "text-base",
      spacing: "space-y-4",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        styles.container,
        styles.spacing,
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            "text-muted-foreground bg-muted/30 flex items-center justify-center rounded-full",
            styles.icon,
          )}
        >
          {icon}
        </div>
      )}

      <div className="space-y-1">
        <h3 className={cn("text-foreground", styles.title)}>{title}</h3>
        {description && (
          <p
            className={cn("text-muted-foreground max-w-sm", styles.description)}
          >
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default Empty;
