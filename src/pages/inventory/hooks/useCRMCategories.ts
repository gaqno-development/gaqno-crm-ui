import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Category } from "../types";

export function useCRMCategories() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "categories"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Category[]>("/categories");
      return data;
    },
  });

  const categories = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (c) =>
        c.name?.toLowerCase().includes(s) ||
        c.parentName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { categories, isLoading, search, setSearch };
}
