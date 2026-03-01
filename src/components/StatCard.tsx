import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gaqno-development/frontcore/components/ui";
import { LucideIcon } from "lucide-react";
import { cn } from "@gaqno-development/frontcore/lib/utils";

export interface StatCardProps {
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
  const variantClasses =
    variant === "compact" ? "p-4" : variant === "metric" ? "p-6" : "p-6";
  const valueClasses =
    variant === "compact"
      ? "text-lg font-semibold"
      : variant === "metric"
        ? "text-3xl font-bold"
        : "text-2xl font-bold";

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between space-y-0",
          variantClasses
        )}
      >
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent className={cn("space-y-1", variantClasses)}>
        <div
          className={cn(
            "flex items-baseline",
            variant === "metric" ? "gap-2" : "gap-1"
          )}
        >
          <div className={valueClasses}>{isLoading ? "…" : value}</div>
          {(trend || description) && (
            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
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
