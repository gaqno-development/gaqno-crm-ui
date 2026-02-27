import { Card, CardContent, CardHeader, CardTitle } from "@gaqno-development/frontcore/components";
import { Input, DataTable } from "@gaqno-development/frontcore/components/ui";
import { Search } from "lucide-react";
import { useCRMPermissions } from "./hooks/useCRMPermissions";
import { PERMISSIONS_COLUMNS } from "./components/AdministrationListColumns";

export default function PermissionsPage() {
  const { permissions, isLoading, search, setSearch } = useCRMPermissions();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Permissões</CardTitle>
          <p className="text-sm text-muted-foreground">
            Permissões e recursos do sistema.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <DataTable columns={PERMISSIONS_COLUMNS} data={{ data: permissions, isLoading }} showPagination={permissions.length > 10} emptyMessage="Nenhuma permissão encontrada." />
        </CardContent>
      </Card>
    </div>
  );
}
