import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { AuditLogEntry } from "../types";

export function useCRMAuditLogs() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "audit-logs"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<AuditLogEntry[]>("/audit-logs");
      return data;
    },
  });
  const logs = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (l) =>
        l.action?.toLowerCase().includes(s) ||
        l.userName?.toLowerCase().includes(s) ||
        l.entityType?.toLowerCase().includes(s)
    );
  }, [rawData, search]);
  return { logs, isLoading, search, setSearch };
}
