import { cn } from "@gaqno-development/frontcore/lib/utils";
import { Loader2 } from "lucide-react";
import type { OverviewKpiCard } from "../hooks";

export interface OverviewKpiCardsProps {
  cards: OverviewKpiCard[];
  isLoading?: boolean;
}

export function OverviewKpiCards({ cards, isLoading }: OverviewKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="rounded-2xl border border-border bg-card px-5 py-4 flex flex-col gap-3 relative overflow-hidden"
        >
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          )}
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bg)}>
            <Icon className={cn("h-5 w-5", color)} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold mt-0.5">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
