import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Tax } from "../types";

export function useCRMTaxes() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "taxes"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Tax[]>("/taxes");
      return data;
    },
  });

  const taxes = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (t) => t.name?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { taxes, isLoading, search, setSearch };
}
