import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMSuppliers } from "./hooks/useCRMSuppliers";
import { SUPPLIERS_COLUMNS } from "./components/InventoryListColumns";

export default function SuppliersPage() {
  const { suppliers, isLoading, search, setSearch } = useCRMSuppliers();

  return (
    <ListPageLayout
      title="Fornecedores"
      description="Fornecedores do inventário."
      searchPlaceholder="Buscar por nome ou e-mail..."
      emptyMessage="Nenhum fornecedor encontrado."
      columns={SUPPLIERS_COLUMNS}
      data={suppliers}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
