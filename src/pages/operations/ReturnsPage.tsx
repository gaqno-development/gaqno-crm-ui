import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMReturns } from "./hooks/useCRMReturns";
import { RETURNS_COLUMNS } from "./components/OperationsListColumns";

export default function ReturnsPage() {
  const { returns, isLoading, search, setSearch } = useCRMReturns();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Devoluções</CardTitle>
          <p className="text-sm text-muted-foreground">
            Devoluções e trocas de pedidos.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por pedido ou contato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={RETURNS_COLUMNS}
            data={{ data: returns, isLoading }}
            showPagination={returns.length > 10}
            emptyMessage="Nenhuma devolução encontrada."
          />
        </CardContent>
      </Card>
    </div>
  );
}
