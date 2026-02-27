import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Warehouse } from "../types";

export function useCRMWarehouses() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "warehouses"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Warehouse[]>("/warehouses");
      return data;
    },
  });

  const warehouses = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (w) =>
        w.name?.toLowerCase().includes(s) ||
        w.code?.toLowerCase().includes(s) ||
        w.address?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { warehouses, isLoading, search, setSearch };
}
