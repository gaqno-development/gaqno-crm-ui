import { useDroppable } from "@dnd-kit/core";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import type { Deal, DealStage } from "../../../../types/crm";
import { DealCard } from "./DealCard";
import { DraggableDealCard } from "./DraggableDealCard";

export interface DealsStageColumnProps {
  stage: DealStage;
  label: string;
  color: string;
  headerColor: string;
  deals: Deal[];
  onMarkWon?: (dealId: string) => void;
  onMarkLost?: (dealId: string) => void;
}

export function DealsStageColumn({
  stage,
  label,
  color,
  headerColor,
  deals,
  onMarkWon,
  onMarkLost,
}: DealsStageColumnProps) {
  const stageTotal = deals.reduce((sum, d) => sum + d.value, 0);
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div
      data-testid={`deals-stage-${stage}`}
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
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-col gap-2 p-2 flex-1 min-h-[120px] transition-colors",
          isOver && "bg-muted/50"
        )}
      >
        {deals.map((deal) => (
          <DraggableDealCard
            key={deal.id}
            deal={deal}
            onMarkWon={onMarkWon}
            onMarkLost={onMarkLost}
          />
        ))}
        {deals.length === 0 && (
          <div
            data-testid="deals-stage-empty"
            className="flex-1 flex items-center justify-center text-xs text-muted-foreground/50 italic py-6"
          >
            No deals
          </div>
        )}
      </div>
    </div>
  );
}
