import { useMemo } from "react";
import { Users, Briefcase, TrendingUp, Trophy, UserCircle, MessageCircle } from "lucide-react";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import { useCRMLeads } from "../../../hooks/useCRMLeads";
import { useCRMDeals } from "../../../hooks/useCRMDeals";
import { useCRMContacts } from "../../../hooks/useCRMContacts";
import { useCRMInteractions } from "../../../hooks/useCRMContacts";

export interface KpiCardItem {
  label: string;
  value: number | string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

export function useKpisPage() {
  const { stats: leadStats, isLoading: isLoadingLeads } = useCRMLeads();
  const { stats: dealStats, isLoading: isLoadingDeals } = useCRMDeals();
  const { contacts, isLoading: isLoadingContacts } = useCRMContacts();
  const { interactions, isLoading: isLoadingInteractions } = useCRMInteractions();

  const isLoading =
    isLoadingLeads || isLoadingDeals || isLoadingContacts || isLoadingInteractions;

  const kpiCards = useMemo<KpiCardItem[]>(
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
        sub: "no pipeline",
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
      {
        label: "Contatos",
        value: contacts.length,
        sub: "cadastrados",
        icon: UserCircle,
        color: "text-teal-500",
        bg: "bg-teal-50 dark:bg-teal-900/20",
      },
      {
        label: "Interações",
        value: interactions.length,
        sub: "registradas",
        icon: MessageCircle,
        color: "text-orange-500",
        bg: "bg-orange-50 dark:bg-orange-900/20",
      },
    ],
    [
      leadStats.total,
      leadStats.qualified,
      dealStats.activeDeals,
      dealStats.pipelineValue,
      dealStats.wonThisMonth,
      contacts.length,
      interactions.length,
    ]
  );

  return { kpiCards, isLoading };
}
