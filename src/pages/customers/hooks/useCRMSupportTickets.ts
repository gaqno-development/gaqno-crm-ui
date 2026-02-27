import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { SupportTicket } from "../types";

export function useCRMSupportTickets() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "support-tickets"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<SupportTicket[]>("/support-tickets");
      return data;
    },
  });

  const tickets = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (t) =>
        t.subject?.toLowerCase().includes(s) ||
        t.contactName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { tickets, isLoading, search, setSearch };
}
