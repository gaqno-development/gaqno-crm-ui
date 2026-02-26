import { cn } from "@gaqno-development/frontcore/lib/utils";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import type { Deal } from "../../../../types/crm";
import { DealCard } from "./DealCard";

export interface DealsStageColumnProps {
  label: string;
  color: string;
  headerColor: string;
  deals: Deal[];
}

export function DealsStageColumn({
  label,
  color,
  headerColor,
  deals,
}: DealsStageColumnProps) {
  const stageTotal = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div
      className={cn(
        "flex-shrink-0 w-64 flex flex-col rounded-xl border-2 overflow-hidden",
        color
      )}
    >
      <div className={cn("px-3 py-2.5 flex items-center justify-between", headerColor)}>
        <span className="text-xs font-semibold">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">{deals.length}</span>
          {deals.length > 0 && (
            <span className="text-[10px] text-muted-foreground hidden sm:inline">
              · {formatCurrency(stageTotal)}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2 flex-1">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
        {deals.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground/50 italic py-6">
            No deals
          </div>
        )}
      </div>
    </div>
  );
}
