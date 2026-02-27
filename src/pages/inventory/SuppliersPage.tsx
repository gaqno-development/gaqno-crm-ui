import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMSuppliers } from "./hooks/useCRMSuppliers";
import { SUPPLIERS_COLUMNS } from "./components/InventoryListColumns";

export default function SuppliersPage() {
  const { suppliers, isLoading, search, setSearch } = useCRMSuppliers();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Fornecedores</CardTitle>
          <p className="text-sm text-muted-foreground">
            Fornecedores do inventário.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={SUPPLIERS_COLUMNS}
            data={{ data: suppliers, isLoading }}
            showPagination={suppliers.length > 10}
            emptyMessage="Nenhum fornecedor encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
