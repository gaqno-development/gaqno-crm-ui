import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Integration } from "../types";

export function useCRMIntegrations() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "integrations"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Integration[]>("/integrations");
      return data;
    },
  });
  const integrations = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((i) => i.name?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { integrations, isLoading, search, setSearch };
}
