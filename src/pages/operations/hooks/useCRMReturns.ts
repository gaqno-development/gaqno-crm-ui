import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { ReturnItem } from "@gaqno-development/types/crm";

export function useCRMReturns() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "returns"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<ReturnItem[]>("/returns");
      return data;
    },
  });

  const returns = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (r) =>
        r.orderNumber?.toLowerCase().includes(s) ||
        r.contactName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { returns, isLoading, search, setSearch };
}
