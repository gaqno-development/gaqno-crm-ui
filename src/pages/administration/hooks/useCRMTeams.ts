import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Team } from "../types";

export function useCRMTeams() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "teams"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Team[]>("/teams");
      return data;
    },
  });
  const teams = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((t) => t.name?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { teams, isLoading, search, setSearch };
}
