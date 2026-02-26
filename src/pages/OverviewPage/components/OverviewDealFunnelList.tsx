import { cn } from "@gaqno-development/frontcore/lib/utils";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import { useDealFunnelRows, type FunnelStageRow } from "../hooks";

export type { FunnelStageRow } from "../hooks";

export interface OverviewDealFunnelListProps {
  stages: FunnelStageRow[];
  dealsByStage: Record<string, Array<{ value: unknown }>>;
  maxDealsInStage: number;
}

export function OverviewDealFunnelList({
  stages,
  dealsByStage,
  maxDealsInStage,
}: OverviewDealFunnelListProps) {
  const rows = useDealFunnelRows(stages, dealsByStage, maxDealsInStage);

  return (
    <div className="space-y-2.5">
      {rows.map(({ stage, label, color, count, value, widthPct }) => (
        <div key={stage} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-24 text-right shrink-0">{label}</span>
          <div className="flex-1 h-7 rounded-lg bg-muted overflow-hidden relative">
            <div
              className={cn("h-full rounded-lg flex items-center px-2.5 transition-all", color)}
              style={{ width: `${widthPct}%` }}
            >
              <span className="text-white text-xs font-medium">{count}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground w-24 shrink-0">
            {count > 0 ? formatCurrency(value) : "—"}
          </span>
        </div>
      ))}
    </div>
  );
}
