import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { SystemSetting } from "../types";

export function useCRMSystemSettings() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "system-settings"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<SystemSetting[]>("/system-settings");
      return data;
    },
  });
  const settings = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((st) => st.key?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { settings, isLoading, search, setSearch };
}
