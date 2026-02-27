import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Payment } from "../types";

export function useCRMPayments() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "payments"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Payment[]>("/payments");
      return data;
    },
  });

  const payments = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (p) => p.invoiceNumber?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { payments, isLoading, search, setSearch };
}
