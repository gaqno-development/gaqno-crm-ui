import { StatCard } from "@gaqno-development/frontcore/components/ui";
import type { CRMStatCard } from "../../hooks/useCRMStats";

export interface OverviewKpiCardsProps {
  cards: CRMStatCard[];
  isLoading?: boolean;
}

export function OverviewKpiCards({ cards, isLoading }: OverviewKpiCardsProps) {
  return (
    <div data-testid="overview-kpi-cards" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map(({ title, value, description, icon: Icon }) => (
        <StatCard
          key={title}
          title={title}
          value={isLoading ? "…" : value}
          icon={Icon ?? undefined}
          description={description}
          isLoading={isLoading}
          variant="compact"
          size="sm"
        />
      ))}
    </div>
  );
}
