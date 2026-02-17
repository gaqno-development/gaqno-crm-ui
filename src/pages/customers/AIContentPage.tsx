"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@gaqno-development/frontcore/components/ui";
import { AIContentGenerator } from "@gaqno-development/frontcore/components/ai";
import { useErpProducts } from "@gaqno-development/frontcore/hooks/ai";
import type { GenerateContentProductInput } from "@gaqno-development/frontcore/utils/api";

export default function AIContentPage() {
  const [selectedId, setSelectedId] = useState("");
  const productsQuery = useErpProducts({ limit: 50 });
  const products = productsQuery.data ?? [];
  const productData: GenerateContentProductInput | null = selectedId
    ? (() => {
        const p = products.find((x) => x.id === selectedId);
        return p
          ? {
              id: p.id,
              name: p.name,
              price: p.price,
              tenantId: p.tenantId,
              description: p.description,
              category: p.category,
              imageUrls: p.imageUrls,
            }
          : null;
      })()
    : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select product</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose a product to generate marketing content for customer
            segments.
          </p>
        </CardHeader>
        <CardContent>
          <Label className="text-xs font-medium">Product</Label>
          <Select
            value={selectedId}
            onValueChange={setSelectedId}
            disabled={productsQuery.isLoading}
          >
            <SelectTrigger className="max-w-md mt-2">
              <SelectValue
                placeholder={
                  productsQuery.isLoading ? "Loading…" : "Select a product"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} — {p.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <AIContentGenerator
        productData={productData}
        title="AI text content generation"
      />
    </div>
  );
}
