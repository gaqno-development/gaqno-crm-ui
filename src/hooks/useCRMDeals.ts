import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Deal, DealStage } from "../types/crm";

export const STAGE_ORDER: DealStage[] = [
  "prospecting",
  "qualification",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

export function useCRMDeals() {
  const { data: dealsData = [], isLoading, isError } = useQuery({
    queryKey: ["crm", "deals"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Deal[]>("/deals");
      return data;
    },
  });

  const dealsByStage = useMemo(() => {
    return STAGE_ORDER.reduce<Record<DealStage, Deal[]>>(
      (acc, stage) => {
        acc[stage] = dealsData.filter((d: Deal) => d.stage === stage);
        return acc;
      },
      {
        prospecting: [],
        qualification: [],
        proposal: [],
        negotiation: [],
        won: [],
        lost: [],
      }
    );
  }, [dealsData]);

  const stats = useMemo(() => {
    const activePipeline = dealsData.filter(
      (d: Deal) => d.stage !== "won" && d.stage !== "lost"
    );
    return {
      totalDeals: dealsData.length,
      pipelineValue: activePipeline.reduce((sum: number, d: Deal) => sum + Number(d.value), 0),
      wonThisMonth: dealsData.filter((d: Deal) => d.stage === "won").reduce(
        (sum: number, d: Deal) => sum + Number(d.value),
        0
      ),
      activeDeals: activePipeline.length,
    };
  }, [dealsData]);

  return { deals: dealsData, dealsByStage, stageOrder: STAGE_ORDER, stats, isLoading, isError };
}
