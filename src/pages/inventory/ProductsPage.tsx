import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMProducts } from "./hooks/useCRMProducts";
import { PRODUCTS_COLUMNS } from "./components/InventoryListColumns";

export default function ProductsPage() {
  const { products, isLoading, search, setSearch } = useCRMProducts();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Catálogo de produtos do inventário.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, SKU ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={PRODUCTS_COLUMNS}
            data={{ data: products, isLoading }}
            showPagination={products.length > 10}
            emptyMessage="Nenhum produto encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
