import { useMemo, useState } from "react";
import { useCRMDeals } from "../../../hooks/useCRMDeals";
import type { Deal, DealStage } from "../../../types/crm";

export const STAGE_OPTIONS: { value: DealStage | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "prospecting", label: "Prospecção" },
  { value: "qualification", label: "Qualificação" },
  { value: "proposal", label: "Proposta" },
  { value: "negotiation", label: "Negociação" },
  { value: "won", label: "Ganho" },
  { value: "lost", label: "Perdido" },
];

export function useOpportunitiesPage() {
  const { deals, stats, isLoading } = useCRMDeals();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<DealStage | "all">("all");

  const filteredDeals = useMemo(() => {
    return deals.filter((d: Deal) => {
      const matchSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        (d.contactName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (d.company?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchStage = stage === "all" || d.stage === stage;
      return matchSearch && matchStage;
    });
  }, [deals, search, stage]);

  return {
    deals: filteredDeals,
    isLoading,
    search,
    setSearch,
    stage,
    setStage,
    stageOptions: STAGE_OPTIONS,
    stats,
  };
}
