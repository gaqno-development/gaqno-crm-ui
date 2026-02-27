import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { AICampaign } from "../types";

export function useCRMAICampaigns() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "ai-campaigns"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<AICampaign[]>("/ai-campaigns");
      return data;
    },
  });
  const campaigns = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((c) => c.name?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { campaigns, isLoading, search, setSearch };
}
