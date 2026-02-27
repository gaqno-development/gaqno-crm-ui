import { useMemo } from "react";
import { useCRMLeads } from "../../../hooks/useCRMLeads";
import { useCRMDeals } from "../../../hooks/useCRMDeals";
import { formatCurrency } from "@gaqno-development/frontcore/utils";

export interface SalesReportRow {
  label: string;
  value: string | number;
}

export function useSalesReportsPage() {
  const { stats: leadStats } = useCRMLeads();
  const { stats: dealStats, deals, isLoading } = useCRMDeals();

  const reportRows = useMemo<SalesReportRow[]>(
    () => [
      { label: "Pipeline por estágio (valor)", value: formatCurrency(dealStats.pipelineValue) },
      { label: "Ganhas este mês", value: formatCurrency(dealStats.wonThisMonth) },
      { label: "Oportunidades ativas", value: dealStats.activeDeals },
      { label: "Total de deals", value: dealStats.totalDeals },
      { label: "Leads qualificados", value: leadStats.qualified },
      { label: "Total de leads", value: leadStats.total },
    ],
    [
      dealStats.pipelineValue,
      dealStats.wonThisMonth,
      dealStats.activeDeals,
      dealStats.totalDeals,
      leadStats.qualified,
      leadStats.total,
    ]
  );

  const wonCount = useMemo(
    () => deals.filter((d) => d.stage === "won").length,
    [deals]
  );
  const lostCount = useMemo(
    () => deals.filter((d) => d.stage === "lost").length,
    [deals]
  );

  return {
    reportRows,
    wonCount,
    lostCount,
    isLoading,
  };
}
