import { useMemo } from "react";
import { useCRMLeads } from "./useCRMLeads";
import { useCRMDeals } from "./useCRMDeals";
import { formatCurrency } from "@gaqno-development/frontcore/utils";

export interface CRMStatCard {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  bg?: string;
}

export function useCRMStats() {
  const { stats: leadStats, isLoading: isLoadingLeads } = useCRMLeads();
  const { stats: dealStats, isLoading: isLoadingDeals } = useCRMDeals();

  const isLoading = isLoadingLeads || isLoadingDeals;

  const statCards = useMemo<CRMStatCard[]>(
    () => [
      {
        title: "Total de Leads",
        value: leadStats.total,
        description: `${leadStats.qualified} qualificados`,
      },
      {
        title: "Oportunidades Ativas",
        value: dealStats.activeDeals,
        description: "pipeline ativo",
      },
      {
        title: "Valor em Pipeline",
        value: formatCurrency(dealStats.pipelineValue),
        description: "receita estimada",
      },
      {
        title: "Vendas (Mês)",
        value: formatCurrency(dealStats.wonThisMonth),
        description: "receita fechada",
        trend:
          dealStats.wonThisMonth > 0
            ? { value: "Positivo", isPositive: true }
            : undefined,
      },
    ],
    [
      leadStats.total,
      leadStats.qualified,
      dealStats.activeDeals,
      dealStats.pipelineValue,
      dealStats.wonThisMonth,
    ],
  );

  return {
    statCards,
    isLoading,
    leadStats,
    dealStats,
  };
}
