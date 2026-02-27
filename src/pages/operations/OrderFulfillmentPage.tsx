import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMOrderFulfillment } from "./hooks/useCRMOrderFulfillment";
import { FULFILLMENT_COLUMNS } from "./components/OperationsListColumns";

export default function OrderFulfillmentPage() {
  const { orders, isLoading, search, setSearch } = useCRMOrderFulfillment();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Atendimento de pedidos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Pedidos em processo de separação e entrega.
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
            columns={FULFILLMENT_COLUMNS}
            data={{ data: orders, isLoading }}
            showPagination={orders.length > 10}
            emptyMessage="Nenhum pedido em atendimento encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
