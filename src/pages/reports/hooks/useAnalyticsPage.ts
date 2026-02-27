import { useMemo } from "react";
import { useCRMLeads } from "../../../hooks/useCRMLeads";
import { useCRMDeals } from "../../../hooks/useCRMDeals";
import { useCRMContacts } from "../../../hooks/useCRMContacts";
import { useCRMInteractions } from "../../../hooks/useCRMContacts";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import type { DealStage } from "../../../types/crm";

export interface AnalyticsBlock {
  label: string;
  value: string | number;
  sub?: string;
}

export interface ByStageRow {
  stage: string;
  label: string;
  count: number;
  value: string;
}

export interface BySourceRow {
  source: string;
  label: string;
  count: number;
}

const STAGE_LABELS: Record<DealStage, string> = {
  prospecting: "Prospecção",
  qualification: "Qualificação",
  proposal: "Proposta",
  negotiation: "Negociação",
  won: "Ganho",
  lost: "Perdido",
};

const SOURCE_LABELS: Record<string, string> = {
  website: "Website",
  referral: "Indicação",
  "cold-call": "Cold Call",
  advertisement: "Anúncios",
  event: "Evento",
  other: "Outro",
};

export function useAnalyticsPage() {
  const { leads, stats: leadStats, isLoading: isLoadingLeads } = useCRMLeads();
  const { deals, stats: dealStats, isLoading: isLoadingDeals } = useCRMDeals();
  const { contacts, isLoading: isLoadingContacts } = useCRMContacts();
  const { interactions, isLoading: isLoadingInteractions } = useCRMInteractions();

  const isLoading =
    isLoadingLeads || isLoadingDeals || isLoadingContacts || isLoadingInteractions;

  const blocks = useMemo<AnalyticsBlock[]>(
    () => [
      { label: "Total de leads", value: leadStats.total, sub: `${leadStats.qualified} qualificados` },
      { label: "Valor em pipeline", value: formatCurrency(dealStats.pipelineValue) },
      { label: "Vendas no mês", value: formatCurrency(dealStats.wonThisMonth) },
      { label: "Contatos", value: contacts.length },
      { label: "Interações", value: interactions.length },
    ],
    [
      leadStats.total,
      leadStats.qualified,
      dealStats.pipelineValue,
      dealStats.wonThisMonth,
      contacts.length,
      interactions.length,
    ]
  );

  const byStage = useMemo<ByStageRow[]>(() => {
    const stageCounts = deals.reduce<Record<string, { count: number; value: number }>>(
      (acc, d) => {
        const s = d.stage;
        if (!acc[s]) acc[s] = { count: 0, value: 0 };
        acc[s].count += 1;
        acc[s].value += Number(d.value);
        return acc;
      },
      {}
    );
    return (["prospecting", "qualification", "proposal", "negotiation", "won", "lost"] as const).map(
      (stage) => ({
        stage,
        label: STAGE_LABELS[stage],
        count: stageCounts[stage]?.count ?? 0,
        value: formatCurrency(stageCounts[stage]?.value ?? 0),
      })
    );
  }, [deals]);

  const bySource = useMemo<BySourceRow[]>(() => {
    const counts: Record<string, number> = {};
    for (const l of leads) {
      const s = l.source ?? "other";
      counts[s] = (counts[s] ?? 0) + 1;
    }
    return Object.entries(counts).map(([source, count]) => ({
      source,
      label: SOURCE_LABELS[source] ?? source,
      count,
    }));
  }, [leads]);

  return { blocks, byStage, bySource, isLoading };
}
