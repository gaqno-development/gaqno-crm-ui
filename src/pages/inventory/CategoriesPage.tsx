import { ListPageLayout } from "@gaqno-development/frontcore/components/ui";
import { useCRMCategories } from "./hooks/useCRMCategories";
import { CATEGORIES_COLUMNS } from "./components/InventoryListColumns";

export default function CategoriesPage() {
  const { categories, isLoading, search, setSearch } = useCRMCategories();

  return (
    <ListPageLayout
      title="Categorias"
      description="Categorias de produtos do inventário."
      searchPlaceholder="Buscar por nome ou categoria pai..."
      emptyMessage="Nenhuma categoria encontrada."
      columns={CATEGORIES_COLUMNS}
      data={categories}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
    />
  );
}
