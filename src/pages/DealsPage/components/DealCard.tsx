import { formatCurrency } from "@gaqno-development/frontcore/utils";
import type { Deal } from "../../../../types/crm";

export interface DealCardProps {
  deal: Deal;
  onMarkWon?: (dealId: string) => void;
  onMarkLost?: (dealId: string) => void;
}

export function DealCard({ deal, onMarkWon, onMarkLost }: DealCardProps) {
  const showStageActions =
    deal.stage === "negotiation" && (onMarkWon != null || onMarkLost != null);

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
        {deal.name}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">{deal.company}</p>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-sm font-bold text-foreground">
          {formatCurrency(deal.value)}
        </span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${deal.probability}%` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">
            {deal.probability}%
          </span>
        </div>
      </div>
      {showStageActions && (
        <div className="flex gap-1.5 mt-2">
          {onMarkWon && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMarkWon(deal.id);
              }}
              className="text-[10px] font-medium px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
              aria-label="Mark as won"
            >
              Won
            </button>
          )}
          {onMarkLost && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMarkLost(deal.id);
              }}
              className="text-[10px] font-medium px-2 py-1 rounded bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
              aria-label="Mark as lost"
            >
              Lost
            </button>
          )}
        </div>
      )}
      <p className="text-[10px] text-muted-foreground mt-1.5">
        {deal.ownerName} · closes{" "}
        {new Date(deal.closingDate).toLocaleDateString("pt-BR", {
          month: "short",
          day: "2-digit",
        })}
      </p>
    </div>
  );
}
