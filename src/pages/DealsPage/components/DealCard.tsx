import { formatCurrency } from "@gaqno-development/frontcore/utils";
import type { Deal } from "../../../../types/crm";

export interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
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
