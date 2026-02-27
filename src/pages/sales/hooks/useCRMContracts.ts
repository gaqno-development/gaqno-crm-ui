import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Contract } from "../types";

export function useCRMContracts() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "contracts"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Contract[]>("/contracts");
      return data;
    },
  });

  const contracts = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (c) =>
        c.title?.toLowerCase().includes(s) ||
        c.contactName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { contracts, isLoading, search, setSearch };
}
