import { StatCard } from "../../../components/shared";
import type { CRMStatCard } from "../../hooks/useCRMStats";

export interface OverviewKpiCardsProps {
  cards: CRMStatCard[];
  isLoading?: boolean;
}

export function OverviewKpiCards({ cards, isLoading }: OverviewKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map(({ title, value, description, icon: Icon, bg }) => (
        <StatCard
          key={title}
          title={title}
          value={isLoading ? "…" : value}
          icon={Icon || undefined}
          description={description}
          isLoading={isLoading}
          className={bg}
          variant="compact"
        />
      ))}
    </div>
  );
}
