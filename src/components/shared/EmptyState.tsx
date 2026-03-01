import { LucideIcon } from "lucide-react";
import { Button } from "@gaqno-development/frontcore/components/ui";
import { cn } from "@gaqno-development/frontcore/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: "default" | "compact" | "centered";
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className,
  variant = "default",
}: EmptyStateProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "py-6 text-center";
      case "centered":
        return "py-16 text-center";
      default:
        return "py-12 text-center";
    }
  };

  return (
    <div className={cn(
      "border rounded-xl bg-muted/20",
      getVariantClasses(),
      className
    )}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
}
