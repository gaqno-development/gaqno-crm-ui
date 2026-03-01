import { useCRMStats } from "../../hooks/useCRMStats";
import { useCRMInteractions } from "../../hooks/useCRMContacts";
import { OverviewKpiCards } from "./components/OverviewKpiCards";
import { OverviewDealFunnelCard } from "./components/OverviewDealFunnelCard";
import { OverviewActivityFeedCard } from "./components/OverviewActivityFeedCard";

export default function OverviewPage() {
  const { statCards, isLoading, leadStats, dealStats } = useCRMStats();

  const { interactions, isLoading: isLoadingInteractions } =
    useCRMInteractions();

  return (
    <div className="space-y-6">
      <OverviewKpiCards cards={statCards} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <OverviewDealFunnelCard
          stages={[
            {
              stage: "prospecting",
              label: "Prospecção",
              color: "bg-slate-400 dark:bg-slate-500",
            },
            {
              stage: "qualification",
              label: "Qualificação",
              color: "bg-blue-500",
            },
            { stage: "proposal", label: "Proposta", color: "bg-purple-500" },
            {
              stage: "negotiation",
              label: "Negociação",
              color: "bg-yellow-500",
            },
            { stage: "won", label: "Ganhos", color: "bg-green-500" },
          ]}
          dealsByStage={{}} // Will be populated by actual data
          maxDealsInStage={1}
          isLoading={isLoading}
        />

        <OverviewActivityFeedCard
          interactions={interactions}
          isLoading={isLoadingInteractions}
          maxItems={8}
        />
      </div>
    </div>
  );
}
