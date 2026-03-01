import { cn } from "@gaqno-development/frontcore/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  variant?: "card" | "list" | "kpi" | "table" | "avatar";
}

export function LoadingSkeleton({
  className,
  count = 1,
  variant = "card",
}: LoadingSkeletonProps) {
  const getSkeletonClass = () => {
    switch (variant) {
      case "card":
        return "h-32 rounded-xl";
      case "list":
        return "h-12 rounded-md w-full";
      case "kpi":
        return "h-16 rounded-lg w-24";
      case "table":
        return "h-10 rounded w-full";
      case "avatar":
        return "h-10 w-10 rounded-full";
      default:
        return "h-32 rounded-xl";
    }
  };

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "bg-muted animate-pulse",
            getSkeletonClass(),
            className
          )}
        />
      ))}
    </>
  );
}
