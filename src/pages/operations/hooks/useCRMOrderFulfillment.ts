import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { FulfillmentOrder } from "@gaqno-development/types/crm";

export function useCRMOrderFulfillment() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "order-fulfillment"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<FulfillmentOrder[]>("/order-fulfillment");
      return data;
    },
  });

  const orders = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (o) =>
        o.orderNumber?.toLowerCase().includes(s) ||
        o.contactName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { orders, isLoading, search, setSearch };
}
