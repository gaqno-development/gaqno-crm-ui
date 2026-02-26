import { Button } from "@gaqno-development/frontcore/components/ui";
import { MessageCircle, Loader2 } from "lucide-react";
import { OverviewDealFunnelList } from "./OverviewDealFunnelList";
import type { FunnelStageRow } from "./OverviewDealFunnelList";

export interface OverviewDealFunnelCardProps {
  stages: FunnelStageRow[];
  dealsByStage: Record<string, Array<{ value: unknown }>>;
  maxDealsInStage: number;
  isLoading?: boolean;
  title?: string;
}

export function OverviewDealFunnelCard({
  stages,
  dealsByStage,
  maxDealsInStage,
  isLoading = false,
  title = "Funil de Vendas",
}: OverviewDealFunnelCardProps) {
  return (
    <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      <h2 className="text-sm font-semibold mb-4">{title}</h2>
      <OverviewDealFunnelList
        stages={stages}
        dealsByStage={dealsByStage}
        maxDealsInStage={maxDealsInStage}
      />

      <div className="flex gap-2 mt-5 pt-4 border-t border-border">
        <Button size="sm" variant="outline" asChild>
          <a href="/crm/sales/leads">+ Novo Lead</a>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href="/crm/sales/deals">+ Nova Oportunidade</a>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href="/omnichannel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" />
            Painel Omnichannel
          </a>
        </Button>
      </div>
    </div>
  );
}
