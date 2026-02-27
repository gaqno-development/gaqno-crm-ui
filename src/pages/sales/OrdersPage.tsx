import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMOrders } from "./hooks/useCRMOrders";
import { ORDERS_COLUMNS } from "./components/SalesListColumns";

export default function OrdersPage() {
  const { orders, isLoading, search, setSearch } = useCRMOrders();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Pedidos de vendas vinculados a contatos e oportunidades.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número ou contato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={ORDERS_COLUMNS}
            data={{ data: orders, isLoading }}
            showPagination={orders.length > 10}
            emptyMessage="Nenhum pedido encontrado."
          />
        </CardContent>
      </Card>
    </div>
  );
}
