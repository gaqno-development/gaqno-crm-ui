import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Trigger } from "../types";

export function useCRMTriggers() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "triggers"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Trigger[]>("/triggers");
      return data;
    },
  });
  const triggers = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((t) => t.name?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { triggers, isLoading, search, setSearch };
}
