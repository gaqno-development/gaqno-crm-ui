import { useMemo } from "react";

export interface FunnelStageRow {
  stage: string;
  label: string;
  color: string;
}

export interface DealFunnelRowData extends FunnelStageRow {
  count: number;
  value: number;
  widthPct: number;
}

export function useDealFunnelRows(
  stages: FunnelStageRow[],
  dealsByStage: Record<string, Array<{ value: unknown }>>,
  maxDealsInStage: number
): DealFunnelRowData[] {
  return useMemo(
    () =>
      stages.map(({ stage, label, color }) => {
        const deals = dealsByStage[stage] || [];
        const count = deals.length;
        const value = deals.reduce((sum, d) => sum + Number(d.value), 0);
        const widthPct = Math.max((count / maxDealsInStage) * 100, 8);
        return { stage, label, color, count, value, widthPct };
      }),
    [stages, dealsByStage, maxDealsInStage]
  );
}
