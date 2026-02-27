import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { Product } from "../types";

export function useCRMProducts() {
  const [search, setSearch] = useState("");

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["crm", "products"],
    queryFn: async () => {
      const { data } = await coreAxiosClient.crm.get<Product[]>("/products");
      return data;
    },
  });

  const products = useMemo(() => {
    if (!search.trim()) return rawData;
    const s = search.toLowerCase();
    return rawData.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.sku?.toLowerCase().includes(s) ||
        p.categoryName?.toLowerCase().includes(s)
    );
  }, [rawData, search]);

  return { products, isLoading, search, setSearch };
}
