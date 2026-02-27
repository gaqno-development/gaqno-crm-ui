import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Webhook } from "../types";

export function useCRMWebhooks() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "webhooks"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Webhook[]>("/webhooks");
      return data;
    },
  });
  const webhooks = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((w) => w.url?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { webhooks, isLoading, search, setSearch };
}
