import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMCategories } from "./hooks/useCRMCategories";
import { CATEGORIES_COLUMNS } from "./components/InventoryListColumns";

export default function CategoriesPage() {
  const { categories, isLoading, search, setSearch } = useCRMCategories();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <p className="text-sm text-muted-foreground">
            Categorias de produtos do inventário.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou categoria pai..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DataTable
            columns={CATEGORIES_COLUMNS}
            data={{ data: categories, isLoading }}
            showPagination={categories.length > 10}
            emptyMessage="Nenhuma categoria encontrada."
          />
        </CardContent>
      </Card>
    </div>
  );
}
