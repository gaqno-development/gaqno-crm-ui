import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Pipeline } from "../types";

export function useCRMPipelines() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "pipelines"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Pipeline[]>("/pipelines");
      return data;
    },
  });
  const pipelines = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((p) => p.name?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { pipelines, isLoading, search, setSearch };
}
