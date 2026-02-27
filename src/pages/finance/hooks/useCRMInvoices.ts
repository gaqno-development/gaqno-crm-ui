import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Invoice } from "../types";

export function useCRMInvoices() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "invoices"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Invoice[]>("/invoices");
      return data;
    },
  });

  const invoices = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (i) =>
        i.invoiceNumber?.toLowerCase().includes(s) ||
        i.contactName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { invoices, isLoading, search, setSearch };
}
