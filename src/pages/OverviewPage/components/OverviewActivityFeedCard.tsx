import { Loader2 } from "lucide-react";
import { OverviewActivityFeedList } from "./OverviewActivityFeedList";
import type { OverviewActivityItem } from "./OverviewActivityFeedList";

export interface OverviewActivityFeedCardProps {
  interactions: OverviewActivityItem[];
  isLoading?: boolean;
  title?: string;
  maxItems?: number;
}

export function OverviewActivityFeedCard({
  interactions,
  isLoading = false,
  title = "Atividade Recente",
  maxItems = 8,
}: OverviewActivityFeedCardProps) {
  const displayed = interactions.slice(0, maxItems);

  return (
    <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      <h2 className="text-sm font-semibold mb-4">{title}</h2>
      <OverviewActivityFeedList interactions={displayed} isLoading={isLoading} />
    </div>
  );
}
