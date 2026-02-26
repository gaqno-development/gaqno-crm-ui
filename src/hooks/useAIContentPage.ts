import { useState, useMemo } from "react";
import { useErpProducts } from "@gaqno-development/frontcore/hooks/erp";
import type { GenerateContentProductInput } from "@gaqno-development/frontcore/utils/api";

export function useAIContentPage() {
  const [selectedId, setSelectedId] = useState("");
  const productsQuery = useErpProducts({ limit: 50 });
  const products = productsQuery.data ?? [];

  const productData = useMemo<GenerateContentProductInput | null>(() => {
    if (!selectedId) return null;
    const p = products.find((x) => x.id === selectedId);
    if (!p) return null;
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      tenantId: p.tenantId,
      description: p.description,
      category: p.category,
      imageUrls: p.imageUrls,
    };
  }, [selectedId, products]);

  return {
    selectedId,
    setSelectedId,
    products,
    productData,
    isLoading: productsQuery.isLoading,
  };
}
