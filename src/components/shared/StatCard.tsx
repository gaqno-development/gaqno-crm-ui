import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gaqno-development/frontcore/components/ui";
import { LucideIcon } from "lucide-react";
import { cn } from "@gaqno-development/frontcore/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  isLoading?: boolean;
  className?: string;
  variant?: "default" | "compact" | "metric";
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  isLoading = false,
  className,
  variant = "default",
}: StatCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "p-4";
      case "metric":
        return "p-6";
      default:
        return "p-6";
    }
  };

  const getValueClasses = () => {
    switch (variant) {
      case "compact":
        return "text-lg font-semibold";
      case "metric":
        return "text-3xl font-bold";
      default:
        return "text-2xl font-bold";
    }
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className={cn("flex flex-row items-center justify-between", getVariantClasses())}>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent className={cn("space-y-1", getVariantClasses())}>
        <div className={cn("flex items-baseline", variant === "metric" ? "gap-2" : "gap-1")}>
          <div className={getValueClasses()}>
            {isLoading ? "…" : value}
          </div>
          {(trend || description) && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-1">
              {trend && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {trend.value}
                </span>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
