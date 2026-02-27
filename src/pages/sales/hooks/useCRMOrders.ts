import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Order } from "../types";

export function useCRMOrders() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "orders"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Order[]>("/orders");
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
