import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";

export interface CustomReportItem {
  id: string;
  name: string;
  description?: string;
  updatedAt: string;
}

export function useCustomReportsPage() {
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["crm", "reports", "custom"],
    queryFn: async (): Promise<CustomReportItem[]> => {
      const { data } = await coreAxiosClient.crm.get<CustomReportItem[]>("/reports/custom");
      return data;
    },
  });

  return { reports, isLoading };
}
