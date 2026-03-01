import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMProducts } from "./hooks/useCRMProducts";
import { PRODUCTS_COLUMNS } from "./components/InventoryListColumns";

export default function ProductsPage() {
  const { products, isLoading, search, setSearch } = useCRMProducts();

  return (
    <ListPageLayout
      title="Produtos"
      description="Catálogo de produtos do inventário."
      searchPlaceholder="Buscar por nome, SKU ou categoria..."
      emptyMessage="Nenhum produto encontrado."
      columns={PRODUCTS_COLUMNS}
      data={products}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
