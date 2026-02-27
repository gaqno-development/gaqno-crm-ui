import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { CustomField } from "../types";

export function useCRMCustomFields() {
  const [search, setSearch] = useState("");
  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "custom-fields"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<CustomField[]>("/custom-fields");
      return data;
    },
  });
  const fields = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter((f) => f.name?.toLowerCase().includes(s) || f.entityType?.toLowerCase().includes(s));
  }, [rawData, search]);
  return { fields, isLoading, search, setSearch };
}
