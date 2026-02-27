import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";

export interface InventoryReportSummary {
  id: string;
  label: string;
  value: string;
}

export function useInventoryReportsPage() {
  const { data: summaries = [], isLoading } = useQuery({
    queryKey: ["crm", "reports", "inventory"],
    queryFn: async (): Promise<InventoryReportSummary[]> => {
      const { data } = await coreAxiosClient.crm.get<InventoryReportSummary[]>("/reports/inventory");
      return data;
    },
  });

  return { summaries, isLoading };
}
