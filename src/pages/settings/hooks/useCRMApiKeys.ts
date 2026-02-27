import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { ApiKey } from "../types";

export function useCRMApiKeys() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "api-keys"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<ApiKey[]>("/api-keys");
      return data;
    },
  });
  const apiKeys = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((k) => k.name?.toLowerCase().includes(s) || k.prefix?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { apiKeys, isLoading, search, setSearch };
}
