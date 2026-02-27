import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Quote } from "../types";

export function useCRMQuotes() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "quotes"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Quote[]>("/quotes");
      return data;
    },
  });

  const quotes = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (q) =>
        q.title?.toLowerCase().includes(s) ||
        q.contactName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { quotes, isLoading, search, setSearch };
}
