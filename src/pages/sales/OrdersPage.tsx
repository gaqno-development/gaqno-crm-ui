import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMOrders } from "./hooks/useCRMOrders";
import { ORDERS_COLUMNS } from "./components/SalesListColumns";

export default function OrdersPage() {
  const { orders, isLoading, search, setSearch } = useCRMOrders();

  return (
    <ListPageLayout
      title="Pedidos"
      description="Pedidos de vendas vinculados a contatos e oportunidades."
      searchPlaceholder="Buscar por número ou contato..."
      emptyMessage="Nenhum pedido encontrado."
      columns={ORDERS_COLUMNS}
      data={orders}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
