import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMStockLevels } from "./hooks/useCRMStockLevels";
import { STOCK_LEVELS_COLUMNS } from "./components/InventoryListColumns";

export default function StockLevelsPage() {
  const { stockLevels, isLoading, search, setSearch } = useCRMStockLevels();

  return (
    <ListPageLayout
      title="Níveis de estoque"
      description="Quantidades por produto e armazém."
      searchPlaceholder="Buscar por produto ou armazém..."
      emptyMessage="Nenhum nível de estoque encontrado."
      columns={STOCK_LEVELS_COLUMNS}
      data={stockLevels}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
