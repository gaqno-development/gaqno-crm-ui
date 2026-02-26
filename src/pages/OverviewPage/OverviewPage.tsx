import { useOverviewPage } from "./hooks";
import { OverviewKpiCards } from "./components/OverviewKpiCards";
import { OverviewDealFunnelCard } from "./components/OverviewDealFunnelCard";
import { OverviewActivityFeedCard } from "./components/OverviewActivityFeedCard";

export default function OverviewPage() {
  const {
    dealsByStage,
    interactions,
    isLoading,
    isLoadingDeals,
    isLoadingInteractions,
    funnelStages,
    maxDealsInStage,
    kpiCards,
  } = useOverviewPage();

  return (
    <div className="space-y-6">
      <OverviewKpiCards cards={kpiCards} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <OverviewDealFunnelCard
          stages={funnelStages}
          dealsByStage={dealsByStage}
          maxDealsInStage={maxDealsInStage}
          isLoading={isLoadingDeals}
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
