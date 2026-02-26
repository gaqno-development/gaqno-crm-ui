import { cn } from "@gaqno-development/frontcore/lib/utils";
import { TrendingUp, DollarSign, Briefcase, Trophy } from "lucide-react";
import { useCRMDeals } from "../../hooks/useCRMDeals";
import type { Deal, DealStage } from "../../types/crm";

const STAGE_CONFIG: Record<DealStage, { label: string; color: string; headerColor: string }> = {
  prospecting: { label: "Prospecting", color: "border-slate-300 dark:border-slate-600", headerColor: "bg-slate-100 dark:bg-slate-800" },
  qualification: { label: "Qualification", color: "border-blue-300 dark:border-blue-700", headerColor: "bg-blue-50 dark:bg-blue-900/30" },
  proposal: { label: "Proposal", color: "border-purple-300 dark:border-purple-700", headerColor: "bg-purple-50 dark:bg-purple-900/30" },
  negotiation: { label: "Negotiation", color: "border-yellow-300 dark:border-yellow-700", headerColor: "bg-yellow-50 dark:bg-yellow-900/30" },
  won: { label: "Won ✓", color: "border-green-300 dark:border-green-700", headerColor: "bg-green-50 dark:bg-green-900/30" },
  lost: { label: "Lost ✗", color: "border-red-300 dark:border-red-700", headerColor: "bg-red-50 dark:bg-red-900/30" },
};

function formatCurrency(val: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">{deal.name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{deal.company}</p>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-sm font-bold text-foreground">{formatCurrency(deal.value)}</span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${deal.probability}%` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{deal.probability}%</span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5">
        {deal.ownerName} · closes {new Date(deal.closingDate).toLocaleDateString("pt-BR", { month: "short", day: "2-digit" })}
      </p>
    </div>
  );
}

export default function DealsPage() {
  const { dealsByStage, stageOrder, stats, isLoading } = useCRMDeals();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Deals", value: stats.activeDeals, icon: Briefcase, color: "text-primary" },
          { label: "Pipeline Value", value: formatCurrency(stats.pipelineValue), icon: TrendingUp, color: "text-blue-500" },
          { label: "Won This Month", value: formatCurrency(stats.wonThisMonth), icon: Trophy, color: "text-green-500" },
          { label: "Total Deals", value: stats.totalDeals, icon: DollarSign, color: "text-purple-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3">
            <div className={cn("p-2 rounded-lg bg-muted", color)}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className={cn("font-bold", typeof value === "number" ? "text-xl" : "text-base")}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4 min-h-[500px]">
        {stageOrder.map((stage) => {
          const config = STAGE_CONFIG[stage];
          const deals = dealsByStage[stage];
          const stageTotal = deals.reduce((sum, d) => sum + d.value, 0);
          return (
            <div
              key={stage}
              className={cn(
                "flex-shrink-0 w-64 flex flex-col rounded-xl border-2 overflow-hidden",
                config.color
              )}
            >
              <div className={cn("px-3 py-2.5 flex items-center justify-between", config.headerColor)}>
                <span className="text-xs font-semibold">{config.label}</span>
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
        })}
      </div>
    </div>
  );
}
