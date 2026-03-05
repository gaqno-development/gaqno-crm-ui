import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Spinner } from "@gaqno-development/frontcore/components/ui";
import { cn } from "@gaqno-development/frontcore/lib/utils";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import { TrendingUp, DollarSign, Briefcase, Trophy } from "lucide-react";
import { useDealsPage } from "./hooks/useDealsPage";
import type { DealStage } from "../../../types/crm";
import { DealsStageColumn } from "./components";

const STAGE_CONFIG: Record<DealStage, { label: string; color: string; headerColor: string }> = {
  prospecting: { label: "Prospecting", color: "border-slate-300 dark:border-slate-600", headerColor: "bg-slate-100 dark:bg-slate-800" },
  qualification: { label: "Qualification", color: "border-blue-300 dark:border-blue-700", headerColor: "bg-blue-50 dark:bg-blue-900/30" },
  proposal: { label: "Proposal", color: "border-purple-300 dark:border-purple-700", headerColor: "bg-purple-50 dark:bg-purple-900/30" },
  negotiation: { label: "Negotiation", color: "border-yellow-300 dark:border-yellow-700", headerColor: "bg-yellow-50 dark:bg-yellow-900/30" },
  won: { label: "Won ✓", color: "border-green-300 dark:border-green-700", headerColor: "bg-green-50 dark:bg-green-900/30" },
  lost: { label: "Lost ✗", color: "border-red-300 dark:border-red-700", headerColor: "bg-red-50 dark:bg-red-900/30" },
};

export default function DealsPage() {
  const { dealsByStage, stageOrder, stats, isLoading, updateDealStage } = useDealsPage();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const deal = active.data.current?.deal as { id: string; stage: DealStage } | undefined;
    if (!deal) return;
    const newStage = over.id as DealStage;
    if (deal.stage === newStage) return;
    updateDealStage(deal.id, newStage);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="h-8 w-8 text-primary" />
          <p className="text-sm text-muted-foreground">Carregando negócios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Deals", value: stats.activeDeals, icon: Briefcase, color: "text-primary" },
          { label: "Pipeline Value", value: formatCurrency(stats.pipelineValue), icon: TrendingUp, color: "text-blue-500" },
          { label: "Won This Month", value: formatCurrency(stats.wonThisMonth), icon: Trophy, color: "text-green-500" },
          { label: "Total Deals", value: stats.totalDeals, icon: DollarSign, color: "text-purple-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
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

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-6 min-h-[480px]">
          {stageOrder.map((stage) => {
            const config = STAGE_CONFIG[stage];
            const deals = dealsByStage[stage];
            return (
              <DealsStageColumn
                key={stage}
                stage={stage}
                label={config.label}
                color={config.color}
                headerColor={config.headerColor}
                deals={deals}
                onMarkWon={(id) => updateDealStage(id, "won")}
                onMarkLost={(id) => updateDealStage(id, "lost")}
              />
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}
