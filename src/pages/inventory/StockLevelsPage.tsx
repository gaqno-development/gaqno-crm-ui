import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMStockLevels } from "./hooks/useCRMStockLevels";
import { STOCK_LEVELS_COLUMNS } from "./components/InventoryListColumns";

export default function StockLevelsPage() {
  const { stockLevels, isLoading, search, setSearch } = useCRMStockLevels();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Níveis de estoque</CardTitle>
          <p className="text-sm text-muted-foreground">
            Quantidades por produto e armazém.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por produto ou armazém..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={STOCK_LEVELS_COLUMNS}
            data={{ data: stockLevels, isLoading }}
            showPagination={stockLevels.length > 10}
            emptyMessage="Nenhum nível de estoque encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
