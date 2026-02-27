import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Shipment } from "@gaqno-development/types/crm";

export function useCRMShipping() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "shipping"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Shipment[]>("/shipping");
      return data;
    },
  });

  const shipments = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (sh) =>
        sh.trackingCode?.toLowerCase().includes(s) ||
        sh.orderNumber?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { shipments, isLoading, search, setSearch };
}
