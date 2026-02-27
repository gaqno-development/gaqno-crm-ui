import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { StockLevel } from "../types";

export function useCRMStockLevels() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "stock-levels"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<StockLevel[]>("/stock-levels");
      return data;
    },
  });

  const stockLevels = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (sl) =>
        sl.productName?.toLowerCase().includes(s) ||
        sl.warehouseName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { stockLevels, isLoading, search, setSearch };
}
