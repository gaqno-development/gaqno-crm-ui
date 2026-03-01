import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMWarehouses } from "./hooks/useCRMWarehouses";
import { WAREHOUSES_COLUMNS } from "./components/InventoryListColumns";

export default function WarehousesPage() {
  const { warehouses, isLoading, search, setSearch } = useCRMWarehouses();

  return (
    <ListPageLayout
      title="Armazéns"
      description="Armazéns e locais de estoque."
      searchPlaceholder="Buscar por nome, código ou endereço..."
      emptyMessage="Nenhum armazém encontrado."
      columns={WAREHOUSES_COLUMNS}
      data={warehouses}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
