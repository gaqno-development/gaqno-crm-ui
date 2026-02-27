import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { CustomerProfile } from "../types";

export function useCRMCustomerProfiles() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "customer-profiles"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<CustomerProfile[]>("/customer-profiles");
      return data;
    },
  });

  const profiles = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.email?.toLowerCase().includes(s) ||
        p.company?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { profiles, isLoading, search, setSearch };
}
