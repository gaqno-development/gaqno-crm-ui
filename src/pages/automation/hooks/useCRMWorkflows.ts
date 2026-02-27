import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Workflow } from "../types";

export function useCRMWorkflows() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "workflows"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Workflow[]>("/workflows");
      return data;
    },
  });
  const workflows = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((w) => w.name?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { workflows, isLoading, search, setSearch };
}
