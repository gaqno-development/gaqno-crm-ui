import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMWarehouses } from "./hooks/useCRMWarehouses";
import { WAREHOUSES_COLUMNS } from "./components/InventoryListColumns";

export default function WarehousesPage() {
  const { warehouses, isLoading, search, setSearch } = useCRMWarehouses();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Armazéns</CardTitle>
          <p className="text-sm text-muted-foreground">
            Armazéns e locais de estoque.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, código ou endereço..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={WAREHOUSES_COLUMNS}
            data={{ data: warehouses, isLoading }}
            showPagination={warehouses.length > 10}
            emptyMessage="Nenhum armazém encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
