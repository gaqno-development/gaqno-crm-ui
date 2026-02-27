import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMShipping } from "./hooks/useCRMShipping";
import { SHIPPING_COLUMNS } from "./components/OperationsListColumns";

export default function ShippingPage() {
  const { shipments, isLoading, search, setSearch } = useCRMShipping();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Envios</CardTitle>
          <p className="text-sm text-muted-foreground">
            Envios e rastreamento de pedidos.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por rastreio ou pedido..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={SHIPPING_COLUMNS}
            data={{ data: shipments, isLoading }}
            showPagination={shipments.length > 10}
            emptyMessage="Nenhum envio encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
