import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";

export interface FinancialReportSummary {
  id: string;
  label: string;
  value: string;
}

export function useFinancialReportsPage() {
  const { data: summaries = [], isLoading } = useQuery({
    queryKey: ["crm", "reports", "financial"],
    queryFn: async (): Promise<FinancialReportSummary[]> => {
      const { data } = await coreAxiosClient.crm.get<FinancialReportSummary[]>("/reports/financial");
      return data;
    },
  });

  return { summaries, isLoading };
}
