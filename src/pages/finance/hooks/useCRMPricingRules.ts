import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { PricingRule } from "../types";

export function useCRMPricingRules() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "pricing-rules"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<PricingRule[]>("/pricing-rules");
      return data;
    },
  });

  const rules = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (r) => r.name?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { rules, isLoading, search, setSearch };
}
