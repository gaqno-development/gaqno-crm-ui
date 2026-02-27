import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Supplier } from "../types";

export function useCRMSuppliers() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "suppliers"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Supplier[]>("/suppliers");
      return data;
    },
  });

  const suppliers = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (sup) =>
        sup.name?.toLowerCase().includes(s) ||
        sup.email?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { suppliers, isLoading, search, setSearch };
}
