import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Permission } from "../types";

export function useCRMPermissions() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "permissions"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Permission[]>("/permissions");
      return data;
    },
  });
  const permissions = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((p) => p.name?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { permissions, isLoading, search, setSearch };
}
