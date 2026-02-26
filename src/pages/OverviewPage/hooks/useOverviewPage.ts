import { useMemo } from "react";
import { Users, Briefcase, TrendingUp, Trophy } from "lucide-react";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import { useCRMLeads } from "../../../hooks/useCRMLeads";
import { useCRMDeals } from "../../../hooks/useCRMDeals";
import { useCRMInteractions } from "../../../hooks/useCRMContacts";
import type { DealStage } from "../../../types/crm";

export interface OverviewKpiCard {
  label: string;
  value: number | string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

export const FUNNEL_STAGES: { stage: DealStage; label: string; color: string }[] = [
  { stage: "prospecting", label: "Prospecção", color: "bg-slate-400 dark:bg-slate-500" },
  { stage: "qualification", label: "Qualificação", color: "bg-blue-500" },
  { stage: "proposal", label: "Proposta", color: "bg-purple-500" },
  { stage: "negotiation", label: "Negociação", color: "bg-yellow-500" },
  { stage: "won", label: "Ganhos", color: "bg-green-500" },
];

export function useOverviewPage() {
  const { stats: leadStats, isLoading: isLoadingLeads } = useCRMLeads();
  const { dealsByStage, stats: dealStats, isLoading: isLoadingDeals } = useCRMDeals();
  const { interactions, isLoading: isLoadingInteractions } = useCRMInteractions();

  const isLoading = isLoadingLeads || isLoadingDeals;

  const maxDealsInStage = Math.max(
    ...FUNNEL_STAGES.map((s) => dealsByStage[s.stage]?.length || 0),
    1
  );

  const kpiCards = useMemo<OverviewKpiCard[]>(
    () => [
      {
        label: "Total de Leads",
        value: leadStats.total,
        sub: `${leadStats.qualified} qualificados`,
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-900/20",
      },
      {
        label: "Oportunidades Ativas",
        value: dealStats.activeDeals,
        sub: "pipeline ativo",
        icon: Briefcase,
        color: "text-purple-500",
        bg: "bg-purple-50 dark:bg-purple-900/20",
      },
      {
        label: "Valor em Pipeline",
        value: formatCurrency(dealStats.pipelineValue),
        sub: "receita estimada",
        icon: TrendingUp,
        color: "text-primary",
        bg: "bg-primary/10",
      },
      {
        label: "Vendas (Mês)",
        value: formatCurrency(dealStats.wonThisMonth),
        sub: "receita fechada",
        icon: Trophy,
        color: "text-green-500",
        bg: "bg-green-50 dark:bg-green-900/20",
      },
    ],
    [leadStats.total, leadStats.qualified, dealStats.activeDeals, dealStats.pipelineValue, dealStats.wonThisMonth]
  );

  return {
    leadStats,
    dealStats,
    dealsByStage,
    interactions,
    isLoading,
    isLoadingDeals,
    isLoadingInteractions,
    funnelStages: FUNNEL_STAGES,
    maxDealsInStage,
    kpiCards,
  };
}
