import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { CRMUser } from "../types";

export function useCRMUsers() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "users"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<CRMUser[]>("/users");
      return data;
    },
  });
  const users = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((u) => u.name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { users, isLoading, search, setSearch };
}
